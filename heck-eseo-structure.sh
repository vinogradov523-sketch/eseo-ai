#!/bin/bash
set -euo pipefail

ROOT="/Users/vinogradov_vinogradov/eseo-ai"

cd "$ROOT"

echo "== ROOT =="
pwd

echo
echo "== TOP LEVEL =="
find . -maxdepth 2 \( -type d -o -type f \) | sort

echo
echo "== CHECK REQUIRED FILES =="
required=(
  "app/page.tsx"
  "app/layout.tsx"
  "app/globals.css"
  "app/robots.ts"
  "app/sitemap.ts"
  "components/shared/Navbar.tsx"
  "components/shared/Footer.tsx"
  "components/shared/Breadcrumbs.tsx"
  "lib/utils.ts"
  "lib/types.ts"
  "lib/constants.ts"
)

missing=0
for file in "${required[@]}"; do
  if [[ -f "$file" ]]; then
    echo "OK   $file"
  else
    echo "MISS $file"
    missing=1
  fi
done

echo
echo "== CHECK APP ROUTES =="
if [[ -d app ]]; then
  find app -type f | sort
else
  echo "app/ not found"
fi

echo
echo "== CHECK NAMES =="
issues=0
while IFS= read -r f; do
  base="$(basename "$f")"
  if [[ "$base" =~ [[:space:]] ]]; then
    echo "SPACE   $f"
    issues=1
  fi
  if [[ "$base" =~ [A-Z] ]]; then
    echo "CAPS    $f"
  fi
  if [[ "$base" =~ [^a-zA-Z0-9._/-] ]]; then
    echo "SPECIAL $f"
    issues=1
  fi
done < <(find . -type f)

echo
echo "== CHECK BREADCRUMBS FILE =="
if [[ -f "components/shared/Breadcrumbs.tsx" ]]; then
  echo "FOUND components/shared/Breadcrumbs.tsx"
else
  echo "MISSING components/shared/Breadcrumbs.tsx"
  missing=1
fi

echo
echo "== RESULT =="
if [[ $missing -eq 0 && $issues -eq 0 ]]; then
  echo "STRUCTURE OK"
else
  echo "STRUCTURE HAS ISSUES"
fi