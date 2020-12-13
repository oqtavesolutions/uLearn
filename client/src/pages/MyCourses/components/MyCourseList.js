import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./MyCourseList.scss";
import PropTypes from "prop-types";

function MyCourseList({ course }) {
  const [showNav, setShowNav] = useState(false);
  const kebabWrapper = useRef(null);

  const handleClick = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (
        kebabWrapper.current !== null &&
        !kebabWrapper.current.contains(e.target)
      ) {
        setShowNav(false);
      }
    });
    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", () => {
        setShowNav(false);
      });
    };
  }, [kebabWrapper]);

  return (
    <article className='my-courses-page-card'>
      <p className='my-courses-page-card__description'>
        <span className='my-courses-page-card__title'>
          {course.course_title}
        </span>
        <span className='my-courses-page-card__date'>
          Date Created: {course.created_at}
        </span>
      </p>
      <nav className='my-courses-page-card__nav'>
        <span
          onClick={handleClick}
          className='my-courses-page-card__collapsible'>
          ...
        </span>
        {showNav && (
          <ul className='my-courses-page-card__items' ref={kebabWrapper}>
            <li className='my-courses-page-card__item'>
              <Link to={"/edit/course/" + course.course_id}>Edit</Link>
            </li>
            <li className='my-courses-page-card__item'>View</li>
            <li className='my-courses-page-card__item'>Subscribers</li>
            <li className='my-courses-page-card__item'>Delete</li>
          </ul>
        )}
      </nav>
    </article>
  );
}

MyCourseList.propTypes = {
  course: PropTypes.object.isRequired,
};

export default withRouter(MyCourseList);
