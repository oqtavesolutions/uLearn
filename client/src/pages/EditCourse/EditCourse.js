import React, { Fragment, useCallback, useEffect, useRef } from "react";
import "./EditCourse.scss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import CourseEditorIconContainer from "../../components/CourseEditorIconContainer/CourseEditorIconContainer";
import EditorFooter from "../../components/EditorFooter/EditorFooter";
import { Typography } from "@material-ui/core";

const validationSchema = Yup.object().shape({
  course_title: Yup.string().required("Required"),
  course_description: Yup.string().required("Required"),
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
  course_image: Yup.string().url(),
});

function EditCourse({
  handleGetCourseEdit,
  match,
  success,
  course,
  loading,
  handleUpdateCourse,
  updateSuccess,
  location,
  handleUpload,
  file_url,
}) {
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length === 0) handleUpload(acceptedFiles);
      if (rejectedFiles.length > 0) toast.error("File too large or is invalid");
    },
    [handleUpload]
  );

  const formik = useRef();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 1000000,
    accept: "image/jpeg, image/jpg, image/png",
    onDrop,
  });

  useEffect(() => {
    handleGetCourseEdit(match.params.courseId);
  }, [handleGetCourseEdit, match]);

  useEffect(() => {
    location.search && toast.dark("Course has been created successfully");
  }, [location]);

  useEffect(() => {
    file_url && formik.current.setFieldValue("course_image", file_url);
  }, [file_url, formik]);

  const handleFormSubmit = (values) => {
    handleUpdateCourse({
      ...values,
      course_id: match.params.courseId,
    });
  };

  return (
    <Fragment>
      {loading && <CustomContentLoader />}
      {success && (
        <div className='edit-course-page'>
          <ToastContainer />

          <CourseEditorIconContainer
            courseId={match.params.courseId}
            course={course}
          />
          <div className='edit-course-container'>
            <div className='edit-course-details-form-container'>
              <div
                {...getRootProps({ className: "dropzone" })}
                className='edit-course-details-form-container__dropzone'>
                <input {...getInputProps()} />
                <Typography
                  variant='caption'
                  className='edit-course-details-form-container__dropzone-text'>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
                <Typography
                  variant='caption'
                  className='edit-course-details-form-container__dropzone-text'>
                  <em>
                    (Only .jpg and .png images will be accepted. Max file size
                    is 1 Mb)
                  </em>
                </Typography>
              </div>
              {(file_url || course.course_image) && (
                <div className='edit-course-details-form-container__image-area'>
                  <img
                    src={file_url || course.course_image}
                    alt='course'
                    className='edit-course-details-form-container__image'
                  />
                </div>
              )}
              <Formik
                innerRef={formik}
                initialValues={{
                  course_title: course.course_title,
                  course_description: course.course_description,
                  course_slug: course.course_slug,
                  course_categories: course.course_categories,
                  course_image: course.course_image,
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({ isSubmitting }) => (
                  <Form className='edit-course-details-form'>
                    <div className='edit-course-details-form__input-container edit-course-details-form--no-display'>
                      <Field
                        type='text'
                        name='course_image'
                        className='edit-course-details-form__input'
                      />
                      <ErrorMessage
                        name='course_image'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>

                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Course Title'
                        className='edit-course-details-form__input-label'>
                        Title
                      </label>
                      <Field
                        type='text'
                        name='course_title'
                        className='edit-course-details-form__input'
                        placeholder='Title'
                      />
                      <ErrorMessage
                        name='course_title'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Description'
                        className='edit-course-details-form__input-label'>
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
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Course Slug'
                        className='edit-course-details-form__input-label'>
                        Slug
                      </label>
                      <Field
                        type='text'
                        name='course_slug'
                        placeholder='Slug'
                        className='edit-course-details-form__input edit-course-details-form__input--disabled'
                        disabled={true}
                      />
                      <ErrorMessage
                        name='course_slug'
                        component='div'
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__input-container'>
                      <label
                        htmlFor='Course Category'
                        className='edit-course-details-form__input-label'>
                        Category
                      </label>
                      <Field
                        as='select'
                        name='course_categories'
                        className='edit-course-details-form__category'>
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
                        className='edit-course-details-form__input-error'
                      />
                    </div>
                    <div className='edit-course-details-form__buttons'>
                      <EditorFooter />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

EditCourse.propTypes = {
  handleGetCourseEdit: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  success: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
  handleUpdateCourse: PropTypes.func.isRequired,
  //  updateSuccess: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    file_url: state.getCourseEdit.uploadImage.file_url,
    course: state.getCourseEdit.course,
    updateSuccess: state.getCourseEdit.updatedCourse.success,
  };
};

export default connect(mapStateToProps)(withRouter(EditCourse));
