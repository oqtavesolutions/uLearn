import React from "react";
import { withRouter } from "react-router-dom";
import "./Dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Dashboard({ displayName }) {
  return (
    <div className='dashboard-page'>
      <h1 className='dashboard-page__title'>
        Welcome, {displayName.split(" ")[0]}!
      </h1>
      <p className='dashboard-page__description'>
        This is your dashboard. We are working on making more useful tools for
        you, but in the meantime, we just wanted to congratulate you on your
        journey with ULearn!
      </p>

      <p className='dashboard-page__description'>
        Just so you know, we use google slides for slides and vimeo for video
        contents. So if you want to add videos or slides to your lectures, you
        will need an active google and vimeo account, both of them are free.
      </p>

      <h1 className='dashboard-page__useful-links-title'>Useful Links:</h1>
      <p className='dashboard-page__description'>
        <a
          href='https://support.google.com/docs/answer/183965#embed_files'
          className='dashboard-page__description dashboard-page__description--link'
          target='_blank'
          rel='noreferrer'>
          How to get google slide link
        </a>{" "}
        <FontAwesomeIcon icon={faArrowRight} />
      </p>
      <p className='dashboard-page__description'>
        <a
          href='https://support.wix.com/en/article/wix-editor-retrieving-a-vimeo-url'
          className='dashboard-page__description dashboard-page__description--link'
          rel='noreferrer'>
          Retreive a Vimeo URL
        </a>{" "}
        <FontAwesomeIcon icon={faArrowRight} />
      </p>
    </div>
  );
}

export default withRouter(Dashboard);
