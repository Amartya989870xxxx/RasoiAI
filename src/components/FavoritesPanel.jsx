import React, { useState, useMemo } from 'react';
import { X, Trash2, ChevronRight, Search, Filter } from 'lucide-react';
import './FavoritesPanel.css';

const FavoritesPanel = ({ isOpen, onClose, favorites, toggleFavorite, onShowDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Veg', 'Non-Veg', 'Egg'

  // Determine categorization simply based on name since list API might not have strCategory
  const isVeg = (name) => {
    const lower = name.toLowerCase();
    const nonVegKeywords = ['chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'tuna', 'prawn', 'shrimp', 'meat'];
    return !nonVegKeywords.some(kw => lower.includes(kw));
  };
  
  const isEgg = (name) => {
    return name.toLowerCase().includes('egg');
  };

  const isNonVeg = (name) => {
    return !isVeg(name);
  };

  const filteredFavorites = useMemo(() => {
    return favorites.filter(recipe => {
      // 1. Keyword search match
      const matchesSearch = recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Filter pill match
      if (activeFilter === 'Veg') return isVeg(recipe.strMeal) && !isEgg(recipe.strMeal);
      if (activeFilter === 'Non-Veg') return isNonVeg(recipe.strMeal);
      if (activeFilter === 'Egg') return isEgg(recipe.strMeal);
      
      return true; // 'All'
    });
  }, [favorites, searchQuery, activeFilter]);

  return (
    <>
      <div className={`favorites-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      
      <div className={`glass-panel favorites-panel ${isOpen ? 'open' : ''}`}>
        <div className="favorites-header">
          <h2>Your Favorites</h2>
          <button className="close-panel-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* --- NEW: Sidebar Controls --- */}
        <div className="favorites-controls">
          <div className="sidebar-search">
            <Search size={16} className="sidebar-search-icon" />
            <input 
              type="text" 
              placeholder="Search favorites..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input sidebar-search-input"
            />
          </div>
          
          <div className="sidebar-filters">
            <Filter size={14} style={{ color: "var(--text-secondary)" }}/>
            {['All', 'Veg', 'Non-Veg', 'Egg'].map(filter => (
              <button 
                key={filter}
                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        {/* ----------------------------- */}

        <div className="favorites-content">
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <p>No favorite recipes yet.</p>
              <p>Click the heart icon on any recipe to save it here!</p>
            </div>
          ) : filteredFavorites.length === 0 ? (
             <div className="empty-favorites">
              <p>No matches found for that filter/search.</p>
            </div>
          ) : (
            <div className="favorites-list">
              {filteredFavorites.map((recipe) => (
                <div key={recipe.idMeal} className="favorite-item glass-card">
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} className="fav-img" />
                  <div className="fav-info">
                    <h4 className="fav-title" title={recipe.strMeal}>{recipe.strMeal}</h4>
                    <div className="fav-actions">
                      <button 
                        className="glass-btn primary fav-view-btn"
                        onClick={() => {
                          onShowDetails(recipe.idMeal);
                          onClose();
                        }}
                      >
                        View <ChevronRight size={14} />
                      </button>
                      <button 
                        className="glass-btn remove-btn"
                        onClick={() => toggleFavorite(recipe)}
                        title="Remove from favorites"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPanel;
