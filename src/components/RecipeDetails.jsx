import React from 'react';
import { X, Youtube, List, ChefHat } from 'lucide-react';
import './RecipeDetails.css';

const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null;

  // MealDB returns instructions as a long string, let's split by periods for betters formatting
  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split('\r\n').filter(step => step.trim() !== '')
    : [];

  // Extract ingredients (MealDB uses strIngredient1 -> 20 and strMeasure1 -> 20 keys)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">{recipe.strMeal}</h2>
          <div className="modal-tags">
            {recipe.strCategory && <span className="tag">{recipe.strCategory}</span>}
            {recipe.strArea && <span className="tag">{recipe.strArea}</span>}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-image-wrapper">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="modal-img" />
            {recipe.strYoutube && (
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-btn primary youtube-link"
              >
                <Youtube size={20} /> Watch on YouTube
              </a>
            )}
          </div>
          
          <div className="modal-info-grid">
            <div className="ingredients-section">
              <h3 className="section-title"><List size={20} /> Ingredients</h3>
              <ul className="ingredients-list">
                {ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="instructions-section">
              <h3 className="section-title"><ChefHat size={20} /> Instructions</h3>
              <div className="instructions-steps">
                {instructions.map((step, index) => (
                  <p key={index} className="step-text">{step}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
