
## Setup And Deployment 🔧

### Development
1. After editing run the following bash commands:

   ```bash
   npm install
   npm start
   ```

### Deployment

#### Automatic Deployment (Recommended)
The site automatically deploys when you push changes to the `master` branch using GitHub Actions.

#### Manual Deployment
If you need to deploy manually, run:

   ```bash
   npm run build
   npm run deploy
   ```

### GitHub Pages Configuration
Make sure GitHub Pages is configured to deploy from the `gh-pages` branch:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / (root)

