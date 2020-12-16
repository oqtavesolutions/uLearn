import React from "react";
import { withRouter } from "react-router-dom";
import "./CreateCourse.scss";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthenticatedRequest } from "../../utils/axios";

const validationSchema = Yup.object().shape({
  course_title: Yup.string().required("Required"),
  course_description: Yup.string().required("Required"),
  course_slug: Yup.string()
    .matches(/^[a-zA-Z0-9-_]+$/, {
      excludeEmptyString: true,
      message: "Cannot contain space or characters except for _ and -",
    })
    .test("checkDuplSlug", "Slug already exists", function (value) {
      return new Promise(async (resolve, reject) => {
        try {
          await AuthenticatedRequest.get("/course/content/validation/" + value);
          return resolve(false);
        } catch (error) {
          resolve(true);
        }
      });
    })
    .required("Required"),
  course_categories: Yup.string()
    .oneOf(
      [
        "IT & Software",
        "Business",
        "Finance & Accounting",
        "Productivity",
        "Design",
        "Marketing",
        "Health",
        "Music",
        "Others",
      ],
      "Please choose category"
    )
    .required("Please choose category"),
});

function CreateCourse({ handleSubmit }) {
  return (
    <div className='create-course'>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        newestOnTop
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <h1 className='create-course__title'>Create Course</h1>
      <Formik
        initialValues={{
          course_title: "",
          course_description: "",
          course_slug: "",
          course_categories: "",
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className='create-course-form'>
            <div className='create-course-form__input-container'>
              <Field
                type='text'
                name='course_title'
                placeholder='Course Title'
                className='create-course-form__input'
              />
              <ErrorMessage
                name='course_title'
                component='div'
                className='create-course-form__input-error'
              />
            </div>
            <div className='create-course-form__input-container'>
              <Field
                as='textarea'
                name='course_description'
                placeholder='Course Description'
                className='create-course-form__text-area'
              />
              <ErrorMessage
                name='course_description'
                component='div'
                className='create-course-form__input-error'
              />
            </div>
            <div className='create-course-form__input-container'>
              <Field
                type='text'
                name='course_slug'
                placeholder='Course Slug'
                className='create-course-form__input'
              />
              <ErrorMessage
                name='course_slug'
                component='div'
                className='create-course-form__input-error'
              />
            </div>
            <div className='create-course-form__input-container'>
              <Field
                as='select'
                name='course_categories'
                className='create-course-form__category'>
                <option>Please Select a Category</option>
                <option value='IT & Software'>IT & Software</option>
                <option value='Business'>Business</option>
                <option value='Finance & Accounting'>
                  Finance & Accounting
                </option>
                <option value='Productivity'>Productivity</option>
                <option value='Design'>Design</option>
                <option value='Marketing'>Marketing</option>
                <option value='Health'>Health</option>
                <option value='Music'>Music</option>
                <option value='Others'>Others</option>
              </Field>
              <ErrorMessage
                name='course_categories'
                component='div'
                className='create-course-form__input-error'
              />
            </div>

            <button
              type='submit'
              className='create-course-form__button'
              disabled={isSubmitting}>
              SUBMIT
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

CreateCourse.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withRouter(CreateCourse);
