import React from "react";
import "./MyLearning.scss";

function MyLearning() {
  return (
    <div className='my-learning-page'>
      <h1 className='my-learning-page__headline'>My Learning</h1>
      <article className='my-learning-page-card'>
        <p className='my-learning-page-card__description'>
          <span className='my-learning-page-card__title'>
            Learn javascript to make games
          </span>
          <span className='my-learning-page-card__date'>
            Date Created: 12/03/2020
          </span>
        </p>
      </article>
    </div>
  );
}

export default MyLearning;
