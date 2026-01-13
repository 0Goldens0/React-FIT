#!/bin/bash
# Temporary disable API routes for GitHub Pages build
if [ -d "src/app/api" ] && [ ! -d "src/app/api.disabled" ]; then
  echo "📦 Disabling API routes for static export..."
  mv src/app/api src/app/api.disabled
  echo "✅ API routes disabled"
else
  echo "⚠️ API routes already disabled or not found"
fi
