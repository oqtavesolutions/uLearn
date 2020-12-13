import React from "react";
import { withRouter } from "react-router-dom";
import "./CreateLecture.scss";
import PropTypes from "prop-types";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  lecture_title: Yup.string().required("Required"),
  lecture_description: Yup.string().required("Required"),
  lecture_slug: Yup.string()
    .matches(/^[a-zA-Z0-9-_]+$/, {
      excludeEmptyString: true,
      message: "Cannot contain space or characters except for _ and -",
    })
    .required("Required"),
});

function CreateLecture({ handleCreateLecture, match }) {
  const handleSubmit = ({
    lecture_title,
    lecture_description,
    lecture_slug,
  }) => {
    handleCreateLecture({
      lecture_title,
      lecture_description,
      lecture_slug,
      course_id: match.params.courseId,
    });
  };
  return (
    <div className='create-lecture-page'>
      <h1 className='create-lecture__title'>Create Lecture</h1>
      <Formik
        initialValues={{
          lecture_title: "",
          lecture_description: "",
          lecture_slug: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className='create-lecture-form'>
            <Field
              type='text'
              name='lecture_title'
              placeholder='Lecture Title'
              className='create-lecture-form__input'
            />
            <ErrorMessage name='lecture_title' component='div' />
            <Field
              as='textarea'
              name='lecture_description'
              placeholder='Lecture Description'
              className='create-lecture-form__text-area'
            />
            <ErrorMessage name='lecture_description' component='div' />
            <Field
              type='text'
              name='lecture_slug'
              placeholder='Lecture Slug'
              className='create-lecture-form__input'
            />
            <ErrorMessage name='lecture_slug' component='div' />

            <button
              type='submit'
              className='create-lecture-form__button'
              disabled={isSubmitting}>
              SUBMIT
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

CreateLecture.propTypes = {
  handleCreateLecture: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(CreateLecture);
