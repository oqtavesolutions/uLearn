import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPenSquare,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";
import { categories } from "../../utils/categories";

function LandingPage() {
  return (
    <div className='landing-page'>
      <section className='landing-page-hero'>
        <h1 className='landing-page-hero__title'>
          Simple & Serene
          <br />
          <span className='landing-page-hero__highlighted'>
            An LMS just for you.
          </span>
        </h1>
        <p className='landing-page-hero__sub'>
          ULearn is a learning management system that excels at simplicity and
          does things right by the students and instructors equally. Learning
          and teaching should be easy, don't you agree?
        </p>
        <div className='landing-page-hero__button-section'>
          <Link to='/signup' className='landing-page-hero__button'>
            Signup Now
          </Link>
        </div>
      </section>

      <section className='landing-page-features'>
        <article className='landing-page-features__card'>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size='2x'
            className='landing-page-features__card-icon'
          />
          <h1 className='landing-page-features__card-title'>Create</h1>
          <p className='landing-page-features__card-description'>
            Create as many courses as you want. Worry free.
          </p>
        </article>

        <article className='landing-page-features__card'>
          <FontAwesomeIcon
            icon={faPenSquare}
            size='2x'
            className='landing-page-features__card-icon'
          />
          <h1 className='landing-page-features__card-title'>Edit</h1>
          <p className='landing-page-features__card-description'>
            Edit courses, lectures, your custom author page.
          </p>
        </article>

        <article className='landing-page-features__card'>
          <FontAwesomeIcon
            icon={faBookReader}
            size='2x'
            className='landing-page-features__card-icon'
          />
          <h1 className='landing-page-features__card-title'>Learn</h1>
          <p className='landing-page-features__card-description'>
            Or learn something new today! Learning is always fun.
          </p>
        </article>
      </section>
      <section className='landing-page-explore'>
        <h1 className='landing-page-explore__title'>Explore Courses</h1>
        <div className='landing-page-explore-cards'>
          {categories.map((category) => (
            <article
              key={category.id}
              className='landing-page-explore-cards__card'>
              <img
                src={category.image}
                alt={category.value}
                className='landing-page-explore-cards__image'
              />
              <p className='landing-page-explore-cards__title'>
                {category.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='landing-page-footer'>
        <h1 className='landing-page-footer__title'>Start learning today!</h1>
        <p className='landing-page-footer__sub'>There is no reason not to.</p>
        <div className='landing-page-footer__button-section'>
          <Link to='/signup' className='landing-page-footer__button'>
            Signup Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
