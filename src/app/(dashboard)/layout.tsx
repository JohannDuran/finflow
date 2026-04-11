import { getDashboardDataAction } from "@/app/actions/dashboard.actions";
import { StoreHydrator } from "@/components/shared/store-hydrator";
import { DashboardLayoutContent } from "@/components/layout/dashboard-layout-content";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getDashboardDataAction();

  if (!result.success || !result.data) {
    redirect("/login");
  }

  return (
    <>
      <StoreHydrator data={result.data} />
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </>
  );
}
