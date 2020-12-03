import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Courses.scss";

function Courses() {
  const [showNav, setShowNav] = useState(false);
  const handleClick = () => {
    showNav ? setShowNav(false) : setShowNav(true);
  };

  return (
    <div className='my-courses'>
      <h1 className='my-courses__headline'>My Courses</h1>
      <Link to='/create-course' className='my-courses__create-course'>
        Create a course
      </Link>
      <article className='my-courses-card'>
        <p className='my-courses-card__description'>
          <span className='my-courses-card__title'>
            Learn javascript to make games
          </span>
          <span className='my-courses-card__date'>
            Date Created: 12/03/2020
          </span>
        </p>
        <nav className='my-courses-card__nav'>
          <span onClick={handleClick} className='my-courses-card__collapsible'>
            ...
          </span>
          {showNav && (
            <ul className='my-courses-card__items'>
              <li className='my-courses-card__item'>Edit</li>
              <li className='my-courses-card__item'>View</li>
              <li className='my-courses-card__item'>Subscribers</li>
              <li className='my-courses-card__item'>Delete</li>
            </ul>
          )}
        </nav>
      </article>
    </div>
  );
}

export default Courses;
