const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "src");
const pagesDir = path.join(projectRoot, "pages");
const appDir = path.join(projectRoot, "app");
const componentsDir = path.join(projectRoot, "components/layout");

// Ensure the `src/app` directory exists
function createAppDirectory() {
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
    console.log("Created: src/app");
  }
}

// Move `index.tsx` to `src/app/page.tsx`
function migrateIndexPage() {
  const indexFile = path.join(pagesDir, "index.tsx");
  const appPageFile = path.join(appDir, "page.tsx");

  if (fs.existsSync(indexFile)) {
    const content = fs.readFileSync(indexFile, "utf-8");
    fs.writeFileSync(appPageFile, content);
    console.log("Migrated: src/pages/index.tsx -> src/app/page.tsx");
  } else {
    console.log("No index.tsx found in src/pages.");
  }
}

// Create `layout.tsx` in `src/app`
function createLayoutFile() {
  const layoutFile = path.join(appDir, "layout.tsx");

  const layoutContent = `import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
`;

  fs.writeFileSync(layoutFile, layoutContent);
  console.log("Created: src/app/layout.tsx");
}

// Remove the `src/pages` directory
function removePagesDirectory() {
  if (fs.existsSync(pagesDir)) {
    fs.rmSync(pagesDir, { recursive: true, force: true });
    console.log("Removed: src/pages");
  } else {
    console.log("No src/pages directory found.");
  }
}

// Ensure the `components/layout` directory exists
function ensureComponentsDirectory() {
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
    console.log("Created: src/components/layout");
  }
}

// Main migration function
function migrateToAppRouter() {
  console.log("Starting migration to App Router...");

  // Step 1: Create `src/app` directory
  createAppDirectory();

  // Step 2: Migrate `index.tsx` to `src/app/page.tsx`
  migrateIndexPage();

  // Step 3: Create `layout.tsx` in `src/app`
  createLayoutFile();

  // Step 4: Remove `src/pages` directory
  removePagesDirectory();

  // Step 5: Ensure `components/layout` directory exists
  ensureComponentsDirectory();

  console.log("Migration to App Router completed successfully!");
}

// Run the migration
migrateToAppRouter();