import React from 'react';
import "./FeatureItem.css"

const FeatureItem = ( {state} ) => {
    return (
        
        <div className="feature-item">
          <img src={state.logo} alt={state.title} className="feature-icon" />
          <h3 className="feature-item-title">{state.title}</h3>
          <p>
            {state.description}
          </p>
        </div>

        
    );
};

export default FeatureItem;