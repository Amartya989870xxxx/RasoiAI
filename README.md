# RasoiAI — Your Digital Culinary Assistant

## 1. Product Title
RasoiAI — Discover the World's Top Recipes

## 2. Problem Statement
Culinary enthusiasts and home cooks often struggle to find clear, accessible, and diverse recipes. Exploring global cuisines can be overwhelming with scattered information, inconsistent formatting, and cluttered personal bookmarks. Cookbooks are static, while many recipe websites are buried in ads or complex interfaces. 

RasoiAI solves this by providing a unified, sleek, and intuitive application to discover, save, and manage recipes in one premium glassmorphic interface. It behaves like your personal digital sous-chef, offering immediate access to ingredients and instructions for thousands of global meals.

## 3. Product Goals
**Primary Goals**
- **Discover:** Seamlessly search and explore a vast database of global recipes.
- **Save:** Easily curate a personalized list of favorite recipes for quick access.
- **Visualize:** Provide a clean, distraction-free reading experience for recipe instructions and ingredients.
- **Perform:** Ensure lightning-fast search results and interactions with local caching.

## 4. Core Functional Modules

### Feature 1: Recipe Discovery Search
- **Dribbble-style Interface:** A visually stunning search experience using a premium glassmorphism aesthetic.
- **Instant Search:** Connects to TheMealDB API to fetch matching global recipes in real-time.
- **State Management:** Handles loading spinners, empty states, and error handling gracefully.

### Feature 2: Recipe Management & Favorites
- **Local Persistence:** Favorites are automatically synced to the browser's `localStorage` so users never lose their saved recipes.
- **Intuitive Toggles:** One-click favoriting directly from the recipe cards.
- **Favorites Panel:** A dedicated, accessible panel showing a count of curated recipes and allowing easy management.

### Feature 3: Detailed Recipe View
- **Comprehensive Details:** View high-quality meal thumbnails along with precise ingredient measurements and step-by-step instructions.
- **Modal Navigation:** A smooth overlay allowing users to read full recipes without losing their place in the search results.

## 5. Technical Architecture
**Tech Stack**
- **Frontend:** React 19, Vite.
- **Styling:** Vanilla CSS with Glassmorphism (Frosted Glass) and CSS Variables.
- **Icons:** Lucide React.
- **Persistence:** Browser `localStorage`.

**React Concepts Implemented**
- `useState`: For managing search queries, recipe lists, loading states, error handling, and UI toggles.
- `useEffect`: For seamless background synchronization of the favorites list with `localStorage`.

**API Integration**
- **TheMealDB API:** Used as the primary data source for fetching recipe catalogs and detailed lookup information.
- **Environment Security:** API keys are injected via `.env` and `import.meta.env` to keep the configuration secure.

## 6. Project Structure
```text
src/
 ├── components/           # Reusable UI features
 │    ├── FavoritesPanel   # Slide-out saved recipe manager
 │    ├── RecipeCard       # Display card for individual meals
 │    ├── RecipeDetails    # Full-screen or modal recipe reader
 │    ├── SearchBar        # Primary search input interface
 │    └── States           # Loading and Empty state visualizations
 ├── index.css             # Global styling and CSS variables (Glassmorphism design system)
 ├── main.jsx              # React mounting point
 └── App.jsx               # Application routing, state, and primary layout
```

## 7. Logic Evaluation
- **Data Persistence Planning:** Favorites list uses lazy initialization in `useState` to pull from `localStorage` only on the first render, optimizing performance.
- **Fluid UI Mastery:** Custom glassmorphism design system utilizing responsive CSS properties, hover states, and smooth transitions for a high-end feel.
- **API Optimization:** Modularized fetch logic separating broad searches from detailed lookups to minimize payload sizes and reduce network requests.

## 8. Development Commands
- **`npm install`**: Install dependencies.
- **`npm run dev`**: Launch the local development server (Vite).
- **`npm run build`**: Generate the production-ready bundle.
- **`npm run lint`**: Analyze the code for best practices and standard compliance.
