#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin https://github.com/dominik01/dominik01.github.io.git
git add -A
git commit -m 'deploy'
git branch -M main
git push -u origin main


cd -
