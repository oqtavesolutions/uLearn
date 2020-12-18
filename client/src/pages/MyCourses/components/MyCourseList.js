import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "./MyCourseList.scss";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

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
          Created on: {format(new Date(course.created_at), "MM/dd/yyyy")}
        </span>
      </p>
      <FontAwesomeIcon
        icon={faEllipsisH}
        className='my-courses-page-card__collapsible'
        onClick={handleClick}
      />
      <nav className='my-courses-page-card__nav'>
        {showNav && (
          <ul className='my-courses-page-card__items' ref={kebabWrapper}>
            <li className='my-courses-page-card__item'>
              <Link to={"/edit/course/" + course.course_id}>Edit</Link>
            </li>
            <li className='my-courses-page-card__item'>
              <Link to={"/course/" + course.course_slug}>View</Link>
            </li>
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
