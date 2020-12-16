import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Explore.scss";
import PropTypes from "prop-types";
import { categories } from "../../utils/categories";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Explore({
  success,
  handleGetExplorePageCourses,
  handleGetExplorePageCoursesByCategory,
  courses,
}) {
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    handleGetExplorePageCourses();
  }, [handleGetExplorePageCourses]);

  const handleCategoryClick = (e) => {
    setCurrentCategory(e.target.innerText);
    handleGetExplorePageCoursesByCategory(e.target.innerText);
  };

  return (
    <div className='course-explore-page'>
      <div className='course-explore-page-description'>
        <div className='course-explore-page-description__left'>
          <h1 className='course-explore-page-description__title'>
            Explore. Learn something new.
          </h1>
          <p className='course-explore-page-description__text'>
            Explore available courses
          </p>
          {/* <form className='course-explore-page-search-form'>
            <input
              type='text'
              name='search'
              placeholder='Search...'
              className='course-explore-page-search-form__input'
            />
            <button className='course-explore-page-search-form__button'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
  </form> */}
        </div>
      </div>

      <div className='course-explore-page-categories'>
        <h1 className='course-explore-page-categories__title'>Categories</h1>
        <div className='course-explore-page-categories-cloud'>
          {categories.map((category) => (
            <button
              className='course-explore-page-categories-cloud__button'
              key={category.id}
              onClick={handleCategoryClick}>
              {category.value}
            </button>
          ))}
        </div>
      </div>
      {currentCategory && (
        <h1 className='course-explore-page-categories__title'>
          Browsing category: {currentCategory}
        </h1>
      )}
      <div className='course-explore-page-categories-highlights'>
        {success && courses.length === 0 && <p>No course found</p>}
        {success &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <Link to={`/course/${course.course_slug}`} key={course.course_id}>
                <article className='course-explore-page-categories-highlights-card'>
                  <p className='course-explore-page-categories-highlights-card__title'>
                    {course.course_title}
                  </p>
                  <p className='course-explore-page-categories-highlights-card__description'>
                    {course.course_description}
                  </p>
                </article>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

Explore.propTypes = {
  courses: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired,
  handleGetExplorePageCourses: PropTypes.func.isRequired,
  handleGetExplorePageCoursesByCategory: PropTypes.func.isRequired,
};

export default withRouter(Explore);
