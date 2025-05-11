import React, { useState } from 'react';

const StarRating = ({ totalStars = 5,setCurrentStarRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(0);

  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (rating) => {
    setCurrentRating(rating);
    setCurrentStarRating(rating)
  };

  return (
    <div style={{ display: 'flex', cursor: 'pointer' }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            starValue={starValue}
            hoverRating={hoverRating}
            currentRating={currentRating}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

const Star = ({ starValue, hoverRating, currentRating, onMouseEnter, onMouseLeave, onClick }) => {
  const isFilled = starValue <= (hoverRating || currentRating);
  return (
    <span
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        color: isFilled ? '#ffa500' : 'gray',
        fontSize: '2rem',
        marginRight: '5px',
      }}
    >
      ★
    </span>
  );
};

export default StarRating;