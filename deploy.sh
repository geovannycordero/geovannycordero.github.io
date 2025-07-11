#!/bin/bash

# Build the static site
echo "Building static site..."
yarn build:static

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files generated in 'out' directory"
    echo ""
    echo "🚀 To deploy to GitHub Pages:"
    echo "1. Push your code to GitHub"
    echo "2. Go to your repository Settings > Pages"
    echo "3. Set source to 'GitHub Actions'"
    echo "4. The GitHub Actions workflow will automatically deploy"
    echo ""
    echo "📂 Or manually deploy by copying 'out' directory contents to your web server"
else
    echo "❌ Build failed!"
    exit 1
fi 