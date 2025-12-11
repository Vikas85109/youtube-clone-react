# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)
- A code editor (VS Code recommended)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/youtube-clone-react.git
cd youtube-clone-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

---

## Detailed Setup

### Step 1: Environment Setup

Create a `.env` file in the root directory (optional for development):

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_ADS=false
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

**Dependencies installed:**
- React 19.0.0
- React Router DOM 7.1.1
- Redux Toolkit 2.3.0
- TanStack Query 5.62.0
- Axios 1.7.9
- react-player 2.16.0
- react-icons 5.4.0

**Dev Dependencies:**
- Tailwind CSS 3.4.17
- PostCSS 8.4.49
- Autoprefixer 10.4.20

### Step 3: Configure Tailwind CSS

Tailwind is pre-configured. The configuration file is at `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        youtube: {
          red: '#FF0000',
          dark: '#0F0F0F',
          // ...
        }
      }
    }
  },
  plugins: []
};
```

### Step 4: Start Development Server

```bash
npm start
```

This will:
- Start the development server
- Open browser at `http://localhost:3000`
- Enable hot reloading
- Show ESLint warnings in terminal

---

## Available Scripts

### `npm start`
Runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000)
- Page reloads on changes
- Lint errors shown in console

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
- Bundles React in production mode
- Optimizes for best performance
- Minifies and hashes filenames

### `npm run eject`
**Note: This is a one-way operation!**
Ejects from Create React App to customize configuration.

---

## Project Configuration Files

### package.json

```json
{
  "name": "youtube-clone-react",
  "version": "0.1.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### .eslintrc.js

```javascript
module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true
  },
  extends: ["react-app"],
  rules: {
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off"
  }
};
```

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## Folder Structure Setup

The project follows this structure:

```
youtube-clone-react/
├── public/                 # Static files
├── src/
│   ├── api/               # API layer
│   ├── components/        # Reusable components
│   ├── data/              # Mock data
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── store/             # Redux store
│   ├── utils/             # Utility functions
│   ├── App.js             # Root component
│   ├── index.css          # Global styles
│   └── index.js           # Entry point
├── docs/                   # Documentation
├── .eslintrc.js
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## IDE Setup

### VS Code Extensions (Recommended)

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **ESLint**
4. **Prettier**
5. **Auto Rename Tag**
6. **Bracket Pair Colorizer**

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "javascriptreact": "javascript"
  }
}
```

---

## Troubleshooting

### Common Issues

#### 1. Node version mismatch

```bash
# Check node version
node --version

# Should be >= 18.0.0
# Use nvm to switch versions
nvm install 18
nvm use 18
```

#### 2. Port already in use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm start
```

#### 3. Dependencies installation failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

#### 4. Tailwind styles not applying

```bash
# Ensure postcss.config.js exists
# Ensure tailwind.config.js has correct content paths
# Restart development server
npm start
```

#### 5. ESLint errors

```bash
# Fix auto-fixable issues
npm run lint -- --fix

# Or ignore specific rules in .eslintrc.js
```

---

## Production Build

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Serve Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build
```

### Deploy to Services

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
```bash
npm install gh-pages --save-dev

# Add to package.json
"homepage": "https://yourusername.github.io/youtube-clone-react",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | Mock data |
| `REACT_APP_ENABLE_ANALYTICS` | Enable analytics | false |
| `PORT` | Development server port | 3000 |

---

## Next Steps

After setup, you can:

1. **Explore the codebase** - Start with `src/App.js`
2. **Modify components** - Edit files in `src/components/`
3. **Add new pages** - Create in `src/pages/`, add routes in `App.js`
4. **Connect real API** - Update `src/api/videoApi.js`
5. **Customize styles** - Modify `tailwind.config.js`

---

## Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing GitHub issues
3. Create a new issue with:
   - Node.js version
   - npm version
   - Error message
   - Steps to reproduce
