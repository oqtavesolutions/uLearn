import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./CreateLecture.scss";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthenticatedRequest } from "../../utils/axios";
import ReactQuill from "react-quill";
import EditorFooter from "../../components/EditorFooter/EditorFooter";

import CourseEditorIconContainer from "../../components/CourseEditorIconContainer/CourseEditorIconContainer";
import { connect } from "react-redux";

function CreateLecture({
  handleCreateLecture,
  match,
  loading,
  handleGetCourseEdit,
  course,
}) {
  const validationSchema = Yup.object().shape({
    lecture_title: Yup.string().required("Required"),
    lecture_type: Yup.string()
      .oneOf(["Text", "Slide", "Video"], "Please choose a type")
      .required("Please choose a type"),
    lecture_length: Yup.string()
      .matches(/^[0-9:]+$/, {
        excludeEmptyString: true,
        message:
          "Please enter number followed by : e.g. 1:56 for 1 minute 56 seconds",
      })
      .required("Required"),
    lecture_slug: Yup.string()
      .matches(/^[a-zA-Z0-9-_]+$/, {
        excludeEmptyString: true,
        message: "Cannot contain space or characters except for _ and -",
      })
      .test("checkDuplSlug", "Slug already exists", function (value) {
        return new Promise(async (resolve, reject) => {
          try {
            await AuthenticatedRequest.get(
              "/lecture/content/validation/" +
                match.params.courseId +
                "/" +
                value
            );
            return resolve(false);
          } catch (error) {
            resolve(true);
          }
        });
      })
      .required("Required"),
  });

  useEffect(() => {
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetCourseEdit, match]);

  const handleSubmit = ({
    lecture_title,
    lecture_slug,
    lecture_content,
    lecture_google_slide,
    lecture_video_embed,
    lecture_length,
    lecture_type,
  }) => {
    handleCreateLecture({
      lecture_title,
      lecture_slug,
      lecture_content,
      lecture_google_slide,
      lecture_video_embed,
      lecture_length,
      lecture_type,
      course_id: match.params.courseId,
    });
  };

  return (
    <div className='create-lecture-page'>
      <ToastContainer />
      <CourseEditorIconContainer
        courseId={match.params.courseId}
        course={course}
      />
      <Formik
        initialValues={{
          lecture_title: "",
          lecture_slug: "",
          lecture_content: "",
          lecture_google_slide: "",
          lecture_video_embed: "",
          lecture_length: "",
          lecture_type: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}>
        {({ isSubmitting, values }) => (
          <Form className='create-lecture-form'>
            <div className='create-lecture-form__input-container'>
              <label
                htmlFor='Lecture Title'
                className='create-lecture-form__input-label'>
                Lecture Title
              </label>
              <Field
                type='text'
                name='lecture_title'
                placeholder='Title'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_title'
                component='div'
                className='create-lecture-form__input-error'
              />
            </div>

            <div className='create-lecture-form__input-container'>
              <label
                htmlFor='Lecture Type'
                className='create-lecture-form__input-label'>
                Please choose a type
              </label>

              <label className='create-lecture-form__input-label-radio'>
                <Field name='lecture_type' type='radio' value='Text' /> Text
              </label>
              <label className='create-lecture-form__input-label-radio'>
                <Field name='lecture_type' type='radio' value='Video' /> Video
              </label>
              <label className='create-lecture-form__input-label-radio'>
                <Field name='lecture_type' type='radio' value='Slide' /> Slide
              </label>
              <ErrorMessage
                name='lecture_type'
                component='div'
                className='create-lecture-form__input-error'
              />
            </div>

            {values.lecture_type === "Text" && (
              <div className='create-lecture-form__input-container'>
                <label
                  htmlFor='Lecture Content'
                  className='create-lecture-form__input-label'>
                  Content
                </label>
                <Field name='lecture_content'>
                  {({ field }) => (
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange(field.name)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name='lecture_content'
                  component='div'
                  className='create-lecture-form__input-error'
                />
              </div>
            )}
            {values.lecture_type === "Slide" && (
              <div className='create-lecture-form__input-container'>
                <label
                  htmlFor='Lecture Google Slide'
                  className='create-lecture-form__input-label'>
                  Google Slide
                </label>
                <Field
                  type='text'
                  name='lecture_google_slide'
                  placeholder='Google Slide Embed Url'
                  className='create-lecture-form__input'
                />
                <ErrorMessage
                  name='lecture_google_slide'
                  component='div'
                  className='create-lecture-form__input-error'
                />
              </div>
            )}

            {values.lecture_type === "Video" && (
              <div className='create-lecture-form__input-container'>
                <label
                  htmlFor='Lecture Vimeo Url'
                  className='create-lecture-form__input-label'>
                  Vimeo Url
                </label>
                <Field
                  type='text'
                  name='lecture_video_embed'
                  placeholder='Video Embed Url'
                  className='create-lecture-form__input'
                />
                <ErrorMessage
                  name='lecture_video_embed'
                  component='div'
                  className='create-lecture-form__input-error'
                />
              </div>
            )}

            <div className='create-lecture-form__input-container'>
              <label
                htmlFor='Lecture Slug'
                className='create-lecture-form__input-label'>
                Slug
              </label>
              <Field
                type='text'
                name='lecture_slug'
                placeholder='Slug'
                className='create-lecture-form__input'
              />
              <ErrorMessage
                name='lecture_slug'
                component='div'
                className='create-lecture-form__input-error'
              />
            </div>

            {
              <div className='create-lecture-form__input-container'>
                <label
                  htmlFor='Lecture Length'
                  className='create-lecture-form__input-label'>
                  Lecture Length
                </label>
                <Field
                  type='text'
                  name='lecture_length'
                  placeholder='Length'
                  className='create-lecture-form__input'
                />
                <ErrorMessage
                  name='lecture_length'
                  component='div'
                  className='create-lecture-form__input-error'
                />
              </div>
            }

            <EditorFooter message='Create new lecture' />
          </Form>
        )}
      </Formik>
    </div>
  );
}

CreateLecture.propTypes = {
  handleCreateLecture: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
  return { course: state.getCourseEdit.course };
};
export default connect(mapStateToProps)(withRouter(CreateLecture));
