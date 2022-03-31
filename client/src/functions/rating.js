import React from 'react';
import StarRatings from 'react-star-ratings';

export const showAverage = (p) => {
    if(p && p.ratings) {
        let ratingsArray = p && p.ratings;
        let total = [];
        let length =ratingsArray.length
        ratingsArray.map((r) => total.push(r.star));
        let totalreduced = total.reduce((p,n) => p+n, 0);
        let highest = length * 5;
        let result = ((totalreduced*5) / highest);

        return (
            <div className='text-center pt-3 pb-3'>
                <span>
                    <StarRatings starDimension='20px' starSpacing='2px' starRatedColor='red' rating={result} editing={false}/>({p.ratings.length})
                </span>
            </div>
        )
    }
}