# Manic Miners Launcher - Development Guide

## Prerequisites

- Node.js 18+
- pnpm 10.12.4+
- Two terminal windows/tabs

## Setup

1. **Clone both repositories:**

   ```bash
   git clone https://github.com/Wal33D/manic-miners-launcher.git
   git clone https://github.com/Wal33D/manic-miners-vercel-api.git
   ```

2. **Install dependencies:**

   ```bash
   # In manic-miners-launcher directory
   pnpm install

   # In manic-miners-vercel-api directory
   pnpm install
   ```

3. **Configure environment (launcher):**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

## Running in Development

### Terminal 1 - API Server

```bash
cd manic-miners-vercel-api
npm run dev
# API will run on http://localhost:3000
```

### Terminal 2 - Launcher

```bash
cd manic-miners-launcher
pnpm start:dev
# Launcher will run on http://localhost:3001
```

## Architecture

### Ports

- **3000**: Next.js API server (manic-miners-vercel-api)
- **3001**: Electron webpack dev server (launcher renderer)
- **8080**: Vite dev server (launcher-gui, used during asset generation)
- **9000**: Electron main process debug port

### API Endpoints

The launcher connects to these API endpoints:

- `/api/urls` - External URLs and links
- `/api/news` - Game news and updates
- `/api/versions/archived` - Available game versions
- `/api/comments` - Community comments
- `/api/levels` - Game levels data
- `/api/videos` - Game videos
- `/api/images` - Game images
- `/api/sounds` - Game sounds

### Development Flow

1. The launcher GUI is built with Vite (`launcher-gui/`)
2. Assets are generated and copied to `src/renderer/assets/`
3. Webpack bundles the Electron app with these assets
4. In dev mode, API requests are proxied to avoid CORS issues

## Production Build

```bash
# Build for production
pnpm run package

# Create distributable
pnpm run make
```

## Environment Variables

### Launcher (.env)

```env
# API Configuration
VITE_API_BASE_URL=    # Empty for dev (uses proxy)
SERVER_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### API (.env)

Check `manic-miners-vercel-api/env.example` for required variables.

## Troubleshooting

### Port conflicts

If you get "address already in use" errors:

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### CORS errors

- Make sure the API server is running on port 3000
- Check that `start:dev` script is used (not `start`)
- Verify CSP settings in `forge.config.ts`

### Build issues

```bash
# Clean build artifacts
rm -rf .webpack out/ src/renderer/assets/*.js src/renderer/assets/*.css
pnpm start:dev
```
