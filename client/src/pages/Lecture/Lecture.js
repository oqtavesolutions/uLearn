import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Lecture.scss";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Vimeo from "@u-wave/react-vimeo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";

function Lecture({ lecture, success, handleGetSingleLecture, match }) {
  const [contentLoadVideo, setContentLoadVideo] = useState(true);
  const [contentLoadIframe, setContentLoadIframe] = useState(true);

  const handleContentLoadVideo = () => {
    setContentLoadVideo(false);
  };

  const handleContentLoadIframe = () => {
    setContentLoadIframe(false);
  };
  useEffect(() => {
    handleGetSingleLecture(match.params.lectureSlug);
  }, [handleGetSingleLecture, match]);
  return (
    <div className='enrolled-lecture'>
      {success && (
        <div className='enrolled-lecture-container'>
          <div className='enrolled-lecture-container__main'>
            <Tabs className='enrolled-lecture-container-tabs'>
              <h1 className='enrolled-lecture-container__title'>
                {lecture.lecture.lecture_title}
              </h1>
              <TabList>
                <Tab>Content</Tab>
                <Tab onClick={() => setContentLoadIframe(true)}>Video</Tab>
                <Tab onClick={() => setContentLoadVideo(true)}>Slide</Tab>
              </TabList>

              <TabPanel>
                <p>{lecture.lecture.lecture_content}</p>
              </TabPanel>
              <TabPanel>
                <div className='enrolled-lecture-container__video-content'>
                  {contentLoadVideo && <CustomContentLoader />}
                  <Vimeo
                    video={lecture.lecture.lecture_video_embed}
                    autoplay
                    responsive={true}
                    onReady={handleContentLoadVideo}
                    onLoaded={handleContentLoadVideo}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <div className='enrolled-lecture-container__google-slides-container'>
                  {contentLoadIframe && <CustomContentLoader />}
                  <iframe
                    title='google-slider'
                    src={lecture.lecture.lecture_google_slide}
                    frameBorder='0'
                    width='960'
                    height='569'
                    allowFullScreen={true}
                    onLoad={handleContentLoadIframe}></iframe>
                </div>
              </TabPanel>
            </Tabs>
            <div className='enrolled-lecture-container-lectures'>
              <h1 className='enrolled-lecture-container-lectures__title'>
                Course Lectures
              </h1>
              <ul className='enrolled-lecture-container-lectures__items'>
                {lecture.course.lectures.map((item) => (
                  <li
                    className='enrolled-lecture-container-lectures__item'
                    key={item.lecture_id}>
                    <NavLink
                      to={`/course/${lecture.course.course_slug}/lecture/${item.lecture_slug}`}
                      className='enrolled-lecture-container-lectures__item-link'
                      activeClassName='enrolled-lecture-container-lectures__item-link--selected'>
                      <FontAwesomeIcon
                        icon={faChevronCircleRight}
                        className='enrolled-lecture-container-lectures__item-icon'
                      />
                      {item.lecture_title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Lecture.propTypes = {
  handleGetSingleLecture: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  lecture: PropTypes.object.isRequired,
};

export default withRouter(Lecture);
