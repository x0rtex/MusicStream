# MusicStream

[![Build Status](https://github.com/x0rtex/MusicStream/actions/workflows/deploy.yml/badge.svg?event=push&label=Build)](https://github.com/x0rtex/MusicStream/actions)
[![npm](https://img.shields.io/npm/v/webpack)](https://www.npmjs.com/package/webpack)

## Features ✨

- 🎧 Music player with playlist functionality
- 🖼️ Artist/Album pages with rich media displays
- 🔐 User authentication (Work In Progress)
- 📱 Responsive design with Bootstrap
- 🚀 AWS S3 + CloudFront deployment
- 🔄 GitHub Actions CI/CD pipeline
- 📦 Webpack optimization (code splitting, cache busting)

## Installation 💻

### Prerequisites

- Node.js v16+
- npm v8+
- AWS account (for deployment)

```bash
# Clone repository
git clone https://github.com/x0rtex/MusicStream.git
cd MusicStream

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## Configuration ⚙️

- Edit `.env` file (see .env.example)

## Production Build 📦

```bash
# Build
npm run build
```

## Deployment 🚀

1. Configure AWS credentials in GitHub Secrets:
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_S3_BUCKET
    - AWS_REGION
    - CLOUDFRONT_DISTRIBUTION_ID
    - WEBSITE_URL
    - API_ENDPOINT
    - LOGIN_URL
    - REGISTER_URL
    - LOGOUT_URL
    - VITE_COGNITO_USER_POOL_ID
    - VITE_COGNITO_APP_CLIENT_ID
2. Push to master branch to trigger automatic deployment:

```bash
git push origin master
````

## Project Structure 📂

```
MusicStreamCC/
├── .github/
│   └── workflows/       # CI/CD pipelines
├── dist/                # Production build (auto-generated)
├── src/
│   ├── html/            # HTML templates
│   ├── js/              # JavaScript modules
│   │   ├── home.js      # Main landing page
│   │   ├── artist.js    # Artist details
│   │   └── album.js     # Album tracks
│   ├── css/             # Stylesheets
│   │   └── styles.css
│   ├── media/           # Local media assets
│   │   ├── audio/
│   │   │   └── songs/   # Songs in .mp3
│   │   └── images/
│   │       ├── artists/ # Artist images as .webp
│   │       ├── albums/  # Album covers as .webp
│   │       └── songs/   # Song covers as .webp
├── webpack.config.js    # Build configuration
└── babel.config.js      # Babel configuration
```

## Technologies Used 🔧

- Frontend: Webpack, Bootstrap 5
- Build Tools: Babel
- Cloud: AWS S3, CloudFront
- CI/CD: GitHub Actions
- Utilities: dotenv-webpack, html-webpack-plugin

## Helper Scripts 🛠️

- [Image Converter](https://github.com/x0rtex/ImageConvert)
- [CSV to JSON Converter](https://github.com/x0rtex/DynamoDB-CSV-To-JSON)
