# MusicStreamCC

## Features ✨

- 🎧 Music player with playlist functionality
- 🖼️ Artist/Album pages with rich media displays
- 🔐 User authentication (Work In Progress)
- 📱 Responsive design with Bootstrap
- 🚀 AWS S3 + CloudFront deployment
- 🔄 GitHub Actions CI/CD pipeline
- 🎨 CSS processing with PostCSS
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

Edit `.env` file:

```env
WEBSITE_URL=
API_ENDPOINT=
```

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
2. Push to master branch to trigger automatic deployment:

```bash
git push origin master
````

## Project Structure 📂

```
MusicStreamCC/
├── dist/                 # Production build (auto-generated)
├── src/
│   ├── html/             # HTML templates
│   ├── js/               # JavaScript modules
│   │   ├── home.js       # Main landing page
│   │   ├── artist.js     # Artist details
│   │   └── album.js      # Album tracks
│   ├── css/              # Stylesheets
│   └── media/            # Local media assets
├── webpack.config.js     # Build configuration
└── .github/workflows/    # CI/CD pipelines
```

## Technologies Used 🔧

- Frontend: Webpack, Bootstrap 5
- Build Tools: Babel, PostCSS
- Cloud: AWS S3, CloudFront
- CI/CD: GitHub Actions
- Utilities: dotenv-webpack, html-webpack-plugin
