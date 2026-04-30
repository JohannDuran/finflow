import { NextRequest, NextResponse } from "next/server";
import { currencies } from "@/lib/constants";
import type { Currency } from "@/types";

const FRANKFURTER_API = "https://api.frankfurter.dev/v2";
const CACHE_SECONDS = 60 * 60 * 12;
const supportedCurrencies = new Set<Currency>(currencies.map((currency) => currency.code));

type FrankfurterRateResponse = {
  date: string;
  base: Currency;
  quote: Currency;
  rate: number;
};

type RateResult = {
  rate: number;
  date?: string;
};

function isSupportedCurrency(value: string): value is Currency {
  return supportedCurrencies.has(value as Currency);
}

function normalizeCurrency(value: string): string {
  return value.trim().toUpperCase();
}

async function fetchFrankfurterRate(from: Currency, to: Currency): Promise<RateResult> {
  if (from === to) {
    return { rate: 1 };
  }

  const response = await fetch(`${FRANKFURTER_API}/rate/${from}/${to}`, {
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Frankfurter returned ${response.status} for ${from}/${to}`);
  }

  const data = (await response.json()) as FrankfurterRateResponse;

  if (typeof data.rate !== "number") {
    throw new Error(`Frankfurter returned an invalid rate for ${from}/${to}`);
  }

  return { rate: data.rate, date: data.date };
}

export async function GET(request: NextRequest) {
  const targetParam = normalizeCurrency(request.nextUrl.searchParams.get("to") || "MXN");

  if (!isSupportedCurrency(targetParam)) {
    return NextResponse.json(
      { error: `Unsupported target currency: ${targetParam}` },
      { status: 400 }
    );
  }

  const fromParam = request.nextUrl.searchParams.get("from");
  const requestedSources = fromParam
    ? fromParam.split(",").map(normalizeCurrency).filter(Boolean)
    : currencies.map((currency) => currency.code);

  const unsupportedSource = requestedSources.find((code) => !isSupportedCurrency(code));
  if (unsupportedSource) {
    return NextResponse.json(
      { error: `Unsupported source currency: ${unsupportedSource}` },
      { status: 400 }
    );
  }

  const sourceCurrencies = Array.from(
    new Set<Currency>([targetParam, ...(requestedSources as Currency[])])
  );

  try {
    const results = await Promise.all(
      sourceCurrencies.map(async (source) => {
        const result = await fetchFrankfurterRate(source, targetParam);
        return [source, result] as const;
      })
    );

    const rates: Partial<Record<Currency, number>> = {};
    const dates: Partial<Record<Currency, string>> = {};

    for (const [source, result] of results) {
      rates[source] = result.rate;
      if (result.date) {
        dates[source] = result.date;
      }
    }

    return NextResponse.json(
      {
        provider: "frankfurter",
        target: targetParam,
        rates,
        dates,
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to fetch exchange rates",
      },
      { status: 502 }
    );
  }
}
