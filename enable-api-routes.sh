#!/bin/bash
# Re-enable API routes after build
if [ -d "src/app/api.disabled" ]; then
  echo "🔄 Re-enabling API routes..."
  mv src/app/api.disabled src/app/api
  echo "✅ API routes enabled"
else
  echo "⚠️ No disabled API routes found"
fi
