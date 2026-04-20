import React, { useState, useEffect } from 'react';
import { ChefHat, Heart } from 'lucide-react';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import FavoritesPanel from './components/FavoritesPanel';
import { LoadingSpinner, EmptyState } from './components/States';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rasoiFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    localStorage.setItem('rasoiFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = async () => {
    if (!query.trim())
      return;

    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_MEALDB_API_KEY || '1';
      const response = await fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${query}`);
      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (err) {
      setError('Failed to fetch recipes. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const apiKey = import.meta.env.VITE_MEALDB_API_KEY || '1';
      const response = await fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/lookup.php?i=${id}`);
      const data = await response.json();

      if (data.meals && data.meals[0]) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (err) {
      console.error("Failed to load details:", err);
      alert("Could not load recipe details.");
    }
  };

  const toggleFavorite = (recipe) => {
    const exists = favorites.find(fav => fav.idMeal === recipe.idMeal);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some(fav => fav.idMeal === id);
  };

  const handleGoHome = () => {
    setQuery('');
    setRecipes([]);
    setError(null);
    setSelectedRecipe(null);
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="logo cursor-pointer" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
          <ChefHat size={28} />
          <span className="logo-text">Rasoi</span>
        </div>

        <button
          className="glass-btn"
          onClick={() => setIsFavoritesOpen(true)}
        >
          Favorites <span style={{ background: "rgba(0,0,0,0.06)", padding: "2px 8px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700" }}>{favorites.length}</span>
        </button>
      </header>

      <main>
        {/* Dribbble-style Hero Banner */}
        <div style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 0 3.5rem' }}>
          <h1 style={{ fontSize: '3.6rem', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Discover the <br />World's Top Recipes
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '560px', lineHeight: '1.6' }}>
            Explore recipes from the most talented chefs and culinary experts, ready to be cooked in your kitchen.
          </p>
          <SearchBar query={query} setQuery={setQuery} onSearch={fetchRecipes} />
        </div>

        {error && <div className="glass-panel" style={{ padding: '1rem', background: '#fee2e2', color: 'var(--error-color)', textAlign: 'center', fontWeight: '500' }}>{error}</div>}

        {loading ? (
          <LoadingSpinner />
        ) : recipes.length > 0 ? (
          <div>
            <h3 style={{ fontSize: '1.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
              Results for "<span style={{ fontWeight: 700 }}>{query}</span>" <span style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>({recipes.length} found)</span>
            </h3>
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onShowDetails={fetchRecipeDetails}
                  toggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(recipe.idMeal)}
                />
              ))}
            </div>
          </div>
        ) : (
          !loading && query && <EmptyState />
        )}

      </main>

      <RecipeDetails
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <FavoritesPanel
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onShowDetails={fetchRecipeDetails}
      />
    </div>
  );
}

export default App;
