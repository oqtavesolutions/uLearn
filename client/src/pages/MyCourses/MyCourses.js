import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyCourses.scss";

function MyCourses({ match }) {
  const [showNav, setShowNav] = useState(false);
  const handleClick = () => {
    showNav ? setShowNav(false) : setShowNav(true);
  };

  return (
    <div className='my-courses-page'>
      <h1 className='my-courses-page__headline'>My Courses</h1>
      <Link to='/create/course' className='my-courses-page__create-course'>
        Create a course
      </Link>
      <article className='my-courses-page-card'>
        <p className='my-courses-page-card__description'>
          <span className='my-courses-page-card__title'>
            Learn javascript to make games
          </span>
          <span className='my-courses-page-card__date'>
            Date Created: 12/03/2020
          </span>
        </p>
        <nav className='my-courses-page-card__nav'>
          <span
            onClick={handleClick}
            className='my-courses-page-card__collapsible'>
            ...
          </span>
          {showNav && (
            <ul className='my-courses-page-card__items'>
              <li className='my-courses-page-card__item'>
                <Link to={"/edit/course/" + match.params.courseId}>Edit</Link>
              </li>
              <li className='my-courses-page-card__item'>View</li>
              <li className='my-courses-page-card__item'>Subscribers</li>
              <li className='my-courses-page-card__item'>Delete</li>
            </ul>
          )}
        </nav>
      </article>
    </div>
  );
}

export default MyCourses;
