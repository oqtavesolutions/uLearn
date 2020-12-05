import React from "react";
import "./Explore.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Explore() {
  return (
    <div className='course-explore-page'>
      <div className='course-explore-page-description'>
        <div className='course-explore-page-description__left'>
          <h1 className='course-explore-page-description__title'>Explore</h1>
          <p className='course-explore-page-description__text'>
            Explore available courses
          </p>
          <form className='course-explore-page-search-form'>
            <input
              type='text'
              name='search'
              placeholder='Search...'
              className='course-explore-page-search-form__input'
            />
            <button className='course-explore-page-search-form__button'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </div>

      <div className='course-explore-page-categories'>
        <h1 className='course-explore-page-categories__title'>Categories</h1>
        <div className='course-explore-page-categories-cloud'>
          <button className='course-explore-page-categories-cloud__button'>
            Category 1
          </button>
          <button className='course-explore-page-categories-cloud__button'>
            Category 2
          </button>
          <button className='course-explore-page-categories-cloud__button'>
            Category 2
          </button>
        </div>
      </div>
      <div className='course-explore-page-categories-highlights'>
        <article className='course-explore-page-categories-highlights-card'>
          <p className='course-explore-page-categories-highlights-card__title'>
            Course Title
          </p>
          <p className='course-explore-page-categories-highlights-card__description'>
            Course Description
          </p>
        </article>
        <article className='course-explore-page-categories-highlights-card'>
          <p className='course-explore-page-categories-highlights-card__title'>
            Course Title 2
          </p>
          <p className='course-explore-page-categories-highlights-card__description'>
            Course Description 2
          </p>
        </article>
      </div>
    </div>
  );
}

export default Explore;
