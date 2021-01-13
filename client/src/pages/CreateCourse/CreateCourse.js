import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import "./CreateCourse.scss";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthenticatedRequest } from "../../utils/axios";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import EditorFooter from "../../components/EditorFooter/EditorFooter";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

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

function CreateCourse({ handleSubmit, handleUpload, file_url }) {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length === 0) handleUpload(acceptedFiles);
      if (rejectedFiles.length > 0) toast.error("File too large or is invalid");
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 1000000,
    accept: "image/jpeg, image/jpg, image/png",
    onDrop,
  });

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
      <div
        {...getRootProps({ className: "dropzone" })}
        className='create-course__dropzone'>
        <input {...getInputProps()} />
        <Typography variant='body2'>
          Drag 'n' drop some files here, or click to select files
        </Typography>
        <Typography variant='body2'>
          <em>
            (Only .jpg and .png images will be accepted. Max file size is 1 Mb)
          </em>
        </Typography>
      </div>
      {file_url && (
        <div className='create-course__image-area'>
          <img src={file_url} alt='course' className='create-course__image' />
        </div>
      )}
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
              <label
                htmlFor='Title'
                className='create-course-form__input-label'>
                Title
              </label>
              <Field
                type='text'
                name='course_title'
                className='create-course-form__input'
                placeholder='Title'
              />
              <ErrorMessage
                name='course_title'
                component='div'
                className='create-course-form__input-error'
              />
            </div>
            <div className='create-course-form__input-container'>
              <label
                htmlFor='Course Description'
                className='create-course-form__input-label'>
                Description
              </label>
              <Field name='course_description'>
                {({ field }) => (
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange(field.name)}
                  />
                )}
              </Field>
              <ErrorMessage
                name='course_description'
                component='div'
                className='create-course-form__input-error'
              />
            </div>
            <div className='create-course-form__input-container'>
              <label
                htmlFor='Course Slug'
                className='create-course-form__input-label'>
                Slug
              </label>
              <Field
                type='text'
                name='course_slug'
                className='create-course-form__input'
                placeholder='Slug'
              />
              <ErrorMessage
                name='course_slug'
                component='div'
                className='create-course-form__input-error'
              />
            </div>
            <div className='create-course-form__input-container'>
              <label
                htmlFor='Category'
                className='create-course-form__input-label'>
                Category
              </label>
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

            <EditorFooter />
          </Form>
        )}
      </Formik>
    </div>
  );
}

CreateCourse.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    file_url: state.createCourse.uploadImage.file_url,
  };
};

export default connect(mapStateToProps)(withRouter(CreateCourse));
