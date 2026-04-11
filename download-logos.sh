#!/bin/bash
# ──────────────────────────────────────────────
# download-logos.sh
# Descarga todos los logos de plataformas de suscripción
# usando Google Favicons API (128x128 PNG, sin API key).
#
# USO:
#   chmod +x download-logos.sh
#   ./download-logos.sh
#
# Los logos se guardan en ./public/logos/subscriptions/
# ──────────────────────────────────────────────

OUTPUT_DIR="./public/logos/subscriptions"
mkdir -p "$OUTPUT_DIR"

echo "🎨 Descargando logos de plataformas de suscripción..."
echo "   Destino: $OUTPUT_DIR"
echo ""

download_logo() {
  local id="$1"
  local domain="$2"
  local output="$OUTPUT_DIR/${id}.png"
  
  if [ -f "$output" ]; then
    echo "  ⏭  $id (ya existe)"
    return
  fi
  
  curl -sL "https://www.google.com/s2/favicons?domain=${domain}&sz=128" -o "$output"
  
  if [ -f "$output" ] && [ -s "$output" ]; then
    echo "  ✅ $id"
  else
    echo "  ❌ $id (falló)"
    rm -f "$output"
  fi
}

# ── Streaming & Video ──────────────────────
echo "📺 Streaming & Video"
download_logo "netflix" "netflix.com"
download_logo "disney-plus" "disneyplus.com"
download_logo "hbo-max" "max.com"
download_logo "prime-video" "primevideo.com"
download_logo "apple-tv" "tv.apple.com"
download_logo "crunchyroll" "crunchyroll.com"
download_logo "paramount" "paramountplus.com"
download_logo "youtube-premium" "youtube.com"
download_logo "twitch" "twitch.tv"
download_logo "vix" "vix.com"
download_logo "star-plus" "starplus.com"
download_logo "mubi" "mubi.com"
download_logo "plex" "plex.tv"
download_logo "curiosity-stream" "curiositystream.com"

# ── Música & Audio ─────────────────────────
echo ""
echo "🎵 Música & Audio"
download_logo "spotify" "spotify.com"
download_logo "apple-music" "music.apple.com"
download_logo "youtube-music" "music.youtube.com"
download_logo "tidal" "tidal.com"
download_logo "deezer" "deezer.com"
download_logo "amazon-music" "music.amazon.com"
download_logo "audible" "audible.com"
download_logo "soundcloud-go" "soundcloud.com"

# ── Gaming ─────────────────────────────────
echo ""
echo "🎮 Gaming"
download_logo "xbox-gamepass" "xbox.com"
download_logo "ps-plus" "playstation.com"
download_logo "nintendo-online" "nintendo.com"
download_logo "ea-play" "ea.com"
download_logo "steam" "store.steampowered.com"
download_logo "geforce-now" "nvidia.com"
download_logo "epic-games" "epicgames.com"

# ── Productividad ──────────────────────────
echo ""
echo "💼 Productividad"
download_logo "microsoft-365" "microsoft.com"
download_logo "google-one" "one.google.com"
download_logo "notion" "notion.so"
download_logo "canva-pro" "canva.com"
download_logo "figma" "figma.com"
download_logo "adobe-cc" "adobe.com"
download_logo "github" "github.com"
download_logo "chatgpt-plus" "openai.com"
download_logo "claude-pro" "claude.ai"
download_logo "grammarly" "grammarly.com"
download_logo "1password" "1password.com"
download_logo "lastpass" "lastpass.com"
download_logo "todoist" "todoist.com"
download_logo "linear" "linear.app"
download_logo "vercel" "vercel.com"
download_logo "railway" "railway.app"
download_logo "netlify" "netlify.com"
download_logo "supabase" "supabase.com"
download_logo "planetscale" "planetscale.com"
download_logo "miro" "miro.com"
download_logo "trello" "trello.com"
download_logo "asana" "asana.com"

# ── Cloud & Almacenamiento ─────────────────
echo ""
echo "☁️  Cloud & Almacenamiento"
download_logo "icloud" "icloud.com"
download_logo "dropbox" "dropbox.com"
download_logo "onedrive" "onedrive.com"
download_logo "mega" "mega.nz"
download_logo "google-drive" "drive.google.com"

# ── Comunicación ───────────────────────────
echo ""
echo "💬 Comunicación"
download_logo "zoom" "zoom.us"
download_logo "slack" "slack.com"
download_logo "discord-nitro" "discord.com"
download_logo "whatsapp-biz" "whatsapp.com"
download_logo "telegram-premium" "telegram.org"
download_logo "teams" "teams.microsoft.com"

# ── Educación ──────────────────────────────
echo ""
echo "🎓 Educación"
download_logo "coursera" "coursera.org"
download_logo "platzi" "platzi.com"
download_logo "udemy" "udemy.com"
download_logo "domestika" "domestika.org"
download_logo "skillshare" "skillshare.com"
download_logo "duolingo" "duolingo.com"
download_logo "masterclass" "masterclass.com"
download_logo "linkedin-learning" "linkedin.com"
download_logo "codecademy" "codecademy.com"
download_logo "edx" "edx.org"

# ── Fitness & Salud ────────────────────────
echo ""
echo "💪 Fitness & Salud"
download_logo "apple-fitness" "fitness.apple.com"
download_logo "peloton" "onepeloton.com"
download_logo "strava" "strava.com"
download_logo "headspace" "headspace.com"
download_logo "calm" "calm.com"
download_logo "fitbit" "fitbit.com"
download_logo "nike-training" "nike.com"

# ── Noticias & Lectura ─────────────────────
echo ""
echo "📰 Noticias & Lectura"
download_logo "kindle-unlimited" "amazon.com"
download_logo "medium" "medium.com"
download_logo "nyt" "nytimes.com"
download_logo "scribd" "scribd.com"
download_logo "substack" "substack.com"
download_logo "economist" "economist.com"
download_logo "wsj" "wsj.com"

# ── Finanzas ───────────────────────────────
echo ""
echo "💰 Finanzas"
download_logo "nu" "nu.com.mx"
download_logo "rappi-prime" "rappi.com"
download_logo "mercado-pago" "mercadopago.com.mx"
download_logo "revolut" "revolut.com"
download_logo "wise" "wise.com"
download_logo "paypal" "paypal.com"

# ── Comida & Delivery ─────────────────────
echo ""
echo "🍔 Comida & Delivery"
download_logo "uber-eats-pass" "ubereats.com"
download_logo "didi-food" "didifood.com"
download_logo "rappi" "rappi.com"
download_logo "hellofresh" "hellofresh.com"
download_logo "doordash" "doordash.com"

# ── Compras & Membresías ──────────────────
echo ""
echo "🛍️  Compras & Membresías"
download_logo "amazon-prime" "amazon.com"
download_logo "costco" "costco.com"
download_logo "sams-club" "samsclub.com"
download_logo "ml-nivel-6" "mercadolibre.com.mx"
download_logo "walmart-plus" "walmart.com"

# ── Transporte ─────────────────────────────
echo ""
echo "🚗 Transporte"
download_logo "uber-pass" "uber.com"
download_logo "didi" "didiglobal.com"
download_logo "lyft" "lyft.com"

# ── Otros ──────────────────────────────────
echo ""
echo "🔧 Otros"
download_logo "vpn-nord" "nordvpn.com"
download_logo "vpn-express" "expressvpn.com"
download_logo "vpn-surfshark" "surfshark.com"
download_logo "bitwarden" "bitwarden.com"
download_logo "antivirus-norton" "norton.com"
download_logo "antivirus-kaspersky" "kaspersky.com"

# ── Resumen ────────────────────────────────
echo ""
TOTAL=$(ls -1 "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l)
echo "══════════════════════════════════════"
echo "✅ Descargados: $TOTAL logos"
echo "📁 Ubicación: $OUTPUT_DIR"
echo "══════════════════════════════════════"
echo ""
echo "Los logos genéricos (dominio, hosting, gimnasio, etc.)"
echo "no tienen logo de marca — usarán el icono Lucide como fallback."#!/bin/bash
# ──────────────────────────────────────────────
# download-logos.sh
# Descarga todos los logos de plataformas de suscripción
# usando Google Favicons API (128x128 PNG, sin API key).
#
# USO:
#   chmod +x download-logos.sh
#   ./download-logos.sh
#
# Los logos se guardan en ./public/logos/subscriptions/
# ──────────────────────────────────────────────

OUTPUT_DIR="./public/logos/subscriptions"
mkdir -p "$OUTPUT_DIR"

echo "🎨 Descargando logos de plataformas de suscripción..."
echo "   Destino: $OUTPUT_DIR"
echo ""

download_logo() {
  local id="$1"
  local domain="$2"
  local output="$OUTPUT_DIR/${id}.png"
  
  if [ -f "$output" ]; then
    echo "  ⏭  $id (ya existe)"
    return
  fi
  
  curl -sL "https://www.google.com/s2/favicons?domain=${domain}&sz=128" -o "$output"
  
  if [ -f "$output" ] && [ -s "$output" ]; then
    echo "  ✅ $id"
  else
    echo "  ❌ $id (falló)"
    rm -f "$output"
  fi
}

# ── Streaming & Video ──────────────────────
echo "📺 Streaming & Video"
download_logo "netflix" "netflix.com"
download_logo "disney-plus" "disneyplus.com"
download_logo "hbo-max" "max.com"
download_logo "prime-video" "primevideo.com"
download_logo "apple-tv" "tv.apple.com"
download_logo "crunchyroll" "crunchyroll.com"
download_logo "paramount" "paramountplus.com"
download_logo "youtube-premium" "youtube.com"
download_logo "twitch" "twitch.tv"
download_logo "vix" "vix.com"
download_logo "star-plus" "starplus.com"
download_logo "mubi" "mubi.com"
download_logo "plex" "plex.tv"
download_logo "curiosity-stream" "curiositystream.com"

# ── Música & Audio ─────────────────────────
echo ""
echo "🎵 Música & Audio"
download_logo "spotify" "spotify.com"
download_logo "apple-music" "music.apple.com"
download_logo "youtube-music" "music.youtube.com"
download_logo "tidal" "tidal.com"
download_logo "deezer" "deezer.com"
download_logo "amazon-music" "music.amazon.com"
download_logo "audible" "audible.com"
download_logo "soundcloud-go" "soundcloud.com"

# ── Gaming ─────────────────────────────────
echo ""
echo "🎮 Gaming"
download_logo "xbox-gamepass" "xbox.com"
download_logo "ps-plus" "playstation.com"
download_logo "nintendo-online" "nintendo.com"
download_logo "ea-play" "ea.com"
download_logo "steam" "store.steampowered.com"
download_logo "geforce-now" "nvidia.com"
download_logo "epic-games" "epicgames.com"

# ── Productividad ──────────────────────────
echo ""
echo "💼 Productividad"
download_logo "microsoft-365" "microsoft.com"
download_logo "google-one" "one.google.com"
download_logo "notion" "notion.so"
download_logo "canva-pro" "canva.com"
download_logo "figma" "figma.com"
download_logo "adobe-cc" "adobe.com"
download_logo "github" "github.com"
download_logo "chatgpt-plus" "openai.com"
download_logo "claude-pro" "claude.ai"
download_logo "grammarly" "grammarly.com"
download_logo "1password" "1password.com"
download_logo "lastpass" "lastpass.com"
download_logo "todoist" "todoist.com"
download_logo "linear" "linear.app"
download_logo "vercel" "vercel.com"
download_logo "railway" "railway.app"
download_logo "netlify" "netlify.com"
download_logo "supabase" "supabase.com"
download_logo "planetscale" "planetscale.com"
download_logo "miro" "miro.com"
download_logo "trello" "trello.com"
download_logo "asana" "asana.com"

# ── Cloud & Almacenamiento ─────────────────
echo ""
echo "☁️  Cloud & Almacenamiento"
download_logo "icloud" "icloud.com"
download_logo "dropbox" "dropbox.com"
download_logo "onedrive" "onedrive.com"
download_logo "mega" "mega.nz"
download_logo "google-drive" "drive.google.com"

# ── Comunicación ───────────────────────────
echo ""
echo "💬 Comunicación"
download_logo "zoom" "zoom.us"
download_logo "slack" "slack.com"
download_logo "discord-nitro" "discord.com"
download_logo "whatsapp-biz" "whatsapp.com"
download_logo "telegram-premium" "telegram.org"
download_logo "teams" "teams.microsoft.com"

# ── Educación ──────────────────────────────
echo ""
echo "🎓 Educación"
download_logo "coursera" "coursera.org"
download_logo "platzi" "platzi.com"
download_logo "udemy" "udemy.com"
download_logo "domestika" "domestika.org"
download_logo "skillshare" "skillshare.com"
download_logo "duolingo" "duolingo.com"
download_logo "masterclass" "masterclass.com"
download_logo "linkedin-learning" "linkedin.com"
download_logo "codecademy" "codecademy.com"
download_logo "edx" "edx.org"

# ── Fitness & Salud ────────────────────────
echo ""
echo "💪 Fitness & Salud"
download_logo "apple-fitness" "fitness.apple.com"
download_logo "peloton" "onepeloton.com"
download_logo "strava" "strava.com"
download_logo "headspace" "headspace.com"
download_logo "calm" "calm.com"
download_logo "fitbit" "fitbit.com"
download_logo "nike-training" "nike.com"

# ── Noticias & Lectura ─────────────────────
echo ""
echo "📰 Noticias & Lectura"
download_logo "kindle-unlimited" "amazon.com"
download_logo "medium" "medium.com"
download_logo "nyt" "nytimes.com"
download_logo "scribd" "scribd.com"
download_logo "substack" "substack.com"
download_logo "economist" "economist.com"
download_logo "wsj" "wsj.com"

# ── Finanzas ───────────────────────────────
echo ""
echo "💰 Finanzas"
download_logo "nu" "nu.com.mx"
download_logo "rappi-prime" "rappi.com"
download_logo "mercado-pago" "mercadopago.com.mx"
download_logo "revolut" "revolut.com"
download_logo "wise" "wise.com"
download_logo "paypal" "paypal.com"

# ── Comida & Delivery ─────────────────────
echo ""
echo "🍔 Comida & Delivery"
download_logo "uber-eats-pass" "ubereats.com"
download_logo "didi-food" "didifood.com"
download_logo "rappi" "rappi.com"
download_logo "hellofresh" "hellofresh.com"
download_logo "doordash" "doordash.com"

# ── Compras & Membresías ──────────────────
echo ""
echo "🛍️  Compras & Membresías"
download_logo "amazon-prime" "amazon.com"
download_logo "costco" "costco.com"
download_logo "sams-club" "samsclub.com"
download_logo "ml-nivel-6" "mercadolibre.com.mx"
download_logo "walmart-plus" "walmart.com"

# ── Transporte ─────────────────────────────
echo ""
echo "🚗 Transporte"
download_logo "uber-pass" "uber.com"
download_logo "didi" "didiglobal.com"
download_logo "lyft" "lyft.com"

# ── Otros ──────────────────────────────────
echo ""
echo "🔧 Otros"
download_logo "vpn-nord" "nordvpn.com"
download_logo "vpn-express" "expressvpn.com"
download_logo "vpn-surfshark" "surfshark.com"
download_logo "bitwarden" "bitwarden.com"
download_logo "antivirus-norton" "norton.com"
download_logo "antivirus-kaspersky" "kaspersky.com"

# ── Resumen ────────────────────────────────
echo ""
TOTAL=$(ls -1 "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l)
echo "══════════════════════════════════════"
echo "✅ Descargados: $TOTAL logos"
echo "📁 Ubicación: $OUTPUT_DIR"
echo "══════════════════════════════════════"
echo ""
echo "Los logos genéricos (dominio, hosting, gimnasio, etc.)"
echo "no tienen logo de marca — usarán el icono Lucide como fallback."
