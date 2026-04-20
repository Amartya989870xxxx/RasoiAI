import React from 'react';
import { ChefHat } from 'lucide-react';
import './States.css';

export const LoadingSpinner = () => {
  return (
    <div className="state-container">
      <div className="spinner"></div>
      <p className="state-text">Cooking up recipes...</p>
    </div>
  );
};

export const EmptyState = ({ message = "Search for an ingredient to find delicious recipes!" }) => {
  return (
    <div className="state-container empty-state">
      <ChefHat size={64} className="empty-icon" />
      <h2 className="empty-title">No Recipes Found</h2>
      <p className="state-text">{message}</p>
    </div>
  );
};
