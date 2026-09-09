#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "$0")/.." && pwd)"
output_dir="$project_dir/build"
archive="$output_dir/idu-upgrade-elastic-beanstalk.zip"
staging_dir="$(mktemp -d)"

cleanup() {
  rm -rf "$staging_dir"
}
trap cleanup EXIT

cd "$project_dir"
npm run release

mkdir -p "$output_dir"
rm -f "$archive"

cp package.json package-lock.json Procfile dev-server.js "$staging_dir/"
cp -R .ebextensions "$staging_dir/"
mkdir -p "$staging_dir/src" "$staging_dir/css/content/generated"
cp src/worker.js src/mockDashboardData.js "$staging_dir/src/"
cp css/styles.css "$staging_dir/css/"
cp \
  css/content/00-globals.js \
  css/content/10-theme.js \
  css/content/15-visualloader.js \
  css/content/20-mobile.js \
  css/content/25-login.js \
  css/content/28-extracter.js \
  css/content/29-image-replace.js \
  css/content/30-bootstrap.js \
  "$staging_dir/css/content/"
cp css/content/generated/18-app.js "$staging_dir/css/content/generated/"

cd "$staging_dir"
zip -qr "$archive" .

echo "Built $archive"
