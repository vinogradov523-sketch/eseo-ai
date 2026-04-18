#!/bin/bash
set -euo pipefail
ROOT="/Users/vinogradov_vinogradov/eseo-ai"
cd "$ROOT"

mkdir -p components/shared
mkdir -p lib

if [[ -f "app/components/shared/Navbar.tsx" ]]; then
  mv -v "app/components/shared/Navbar.tsx" "components/shared/Navbar.tsx"
fi

if [[ -f "app/components/shared/Footer.tsx" ]]; then
  mv -v "app/components/shared/Footer.tsx" "components/shared/Footer.tsx"
fi

if [[ -f "app/lib/types.ts" ]]; then
  mv -v "app/lib/types.ts" "lib/types.ts"
fi

echo "Done."
