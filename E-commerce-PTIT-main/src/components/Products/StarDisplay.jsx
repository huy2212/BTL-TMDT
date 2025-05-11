// src/components/StarRating.js
import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
const starStyles = {
    star: {
        fill: 'gray',
        stroke: 'black',
        strokeWidth: '1px',
    },
    full: {
        fill: 'gold',
    },
    half: {
        fill: 'url(#halfGradient)',
    },
    container: {
        display: 'flex',
    }
};

const StarDisplay = ({ rating }) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(roundedRating)) {
            stars.push(<FullStar key={i} />);
        } else if (i < roundedRating) {
            stars.push(<HalfStar key={i} />);
        } else {
            stars.push(<EmptyStar key={i} />);
        }
    }

    return <div style={starStyles.container} className='gap-x-1 text-[24px]'>{stars}</div>;
};

const FullStar = () => (
    <FaStar color='orange' />
);

const HalfStar = () => (
    <FaStarHalfAlt color='orange' />
);

const EmptyStar = () => (
    <FaStar color='rgb(209,209,211)' />
);

export default StarDisplay;
