import React from 'react';
import { Heart, Info } from 'lucide-react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onShowDetails, toggleFavorite, isFavorite }) => {
  return (
    <div className="glass-card recipe-card animate-fade-in">
      <div className="recipe-image-container">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-img" loading="lazy" />
        <button 
          className={`glass-btn icon-only favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(recipe)}
          aria-label="Toggle Favorite"
        >
          <Heart size={20} className={isFavorite ? 'filled-heart' : ''} />
        </button>
      </div>
      
      <div className="recipe-info">
        <h3 className="recipe-title" title={recipe.strMeal}>{recipe.strMeal}</h3>
        <button 
          className="glass-btn w-full show-details-btn" 
          onClick={() => onShowDetails(recipe.idMeal)}
        >
          <Info size={16} /> Show Details
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
