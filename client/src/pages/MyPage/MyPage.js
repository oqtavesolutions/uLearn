import React, { useEffect, useCallback, useRef } from "react";
import { withRouter } from "react-router-dom";
import "./MyPage.scss";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";
import EditorFooter from "../../components/EditorFooter/EditorFooter";
import { Typography } from "@material-ui/core";
import { useDropzone } from "react-dropzone";

const validationSchema = Yup.object().shape({
  author_name: Yup.string().required("Required"),
  author_bio: Yup.string().required("Required"),
  author_slug: Yup.string()
    .matches(/^[a-zA-Z0-9-_]+$/, {
      excludeEmptyString: true,
      message: "Cannot contain space or characters except for _ and -",
    })
    .required("Required"),
  profile_image_url: Yup.string().url().required(),
});

function MyPage({
  success,
  handleUpdateAuthor,
  handleGetAuthorEdit,
  author,
  loading,
  updateLoading,
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

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 1000000,
    accept: "image/jpeg, image/jpg, image/png",
    onDrop,
  });

  const formik = useRef();

  useEffect(() => {
    handleGetAuthorEdit();
  }, [handleGetAuthorEdit]);

  useEffect(() => {
    file_url && formik.current.setFieldValue("profile_image_url", file_url);
  }, [file_url, formik]);

  const handleSubmit = ({
    author_name,
    author_bio,
    author_slug,
    profile_image_url,
  }) => {
    handleUpdateAuthor({
      author_name,
      author_bio,
      author_slug,
      profile_image_url,
    });
  };
  return (
    <div className='mypage-page-page'>
      <ToastContainer />
      <h1 className='mypage-page__title'>Update your author page</h1>
      <p className='mypage-page__sub'>
        This is what appears for the courses you create.
      </p>
      {!success && loading && <CustomContentLoader />}
      {success && (
        <div className='mypage-page-form-container'>
          <div
            {...getRootProps({ className: "dropzone" })}
            className='mypage-page-form-container__dropzone'>
            <input {...getInputProps()} />
            <Typography
              variant='caption'
              className='mypage-page-form-container__dropzone-text'>
              Drag 'n' drop some files here, or click to select files
            </Typography>
            <Typography
              variant='caption'
              className='mypage-page-form-container__dropzone-text'>
              <em>
                (Only .jpg and .png images will be accepted. Max file size is 1
                Mb)
              </em>
            </Typography>
          </div>
          {(file_url || author.profile_image_url) && (
            <div className='mypage-page-form-container__image-area'>
              <img
                src={file_url || author.profile_image_url}
                alt='course'
                className='mypage-page-form-container__image'
              />
            </div>
          )}
          <Formik
            innerRef={formik}
            initialValues={{
              author_name: author.author_name || "",
              author_bio: author.author_bio || "",
              author_slug: author.author_slug || "",
              profile_image_url: author.profile_image_url || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className='mypage-page-form'>
                <div className='mypage-page-form__input-container mypage-page-form--no-display'>
                  <Field
                    type='text'
                    name='profile_image_url'
                    className='mypage-page-form__input'
                  />
                  <ErrorMessage
                    name='profile_image_url'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>

                <div className='mypage-page-form__input-container'>
                  <label
                    htmlFor='Author Name'
                    className='mypage-page-form__input-label'>
                    Name
                  </label>
                  <Field
                    type='text'
                    name='author_name'
                    placeholder='Name'
                    className='mypage-page-form__input'
                  />
                  <ErrorMessage
                    name='author_name'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>
                <div className='mypage-page-form__input-container'>
                  <label
                    htmlFor='Author Bio'
                    className='mypage-page-form__input-label'>
                    Bio
                  </label>
                  <Field name='author_bio'>
                    {({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange(field.name)}
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name='author_bio'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>
                <div className='mypage-page-form__input-container'>
                  <label
                    htmlFor='Author Slug'
                    className='mypage-page-form__input-label'>
                    Slug
                  </label>
                  <Field
                    type='text'
                    name='author_slug'
                    placeholder='Author Slug'
                    className={
                      author.author_slug === ""
                        ? "mypage-page-form__input"
                        : author.author_slug === undefined ||
                          author.author_slug === null
                        ? "mypage-page-form__input"
                        : "mypage-page-form__input mypage-page-form__input--disabled"
                    }
                    disabled={
                      author.author_slug === ""
                        ? false
                        : author.author_slug === undefined ||
                          author.author_slug === null
                        ? false
                        : true
                    }
                  />
                  <ErrorMessage
                    name='author_slug'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>

                <EditorFooter />
              </Form>
            )}
          </Formik>
          {/*author.author_slug.length && (
            <Link to='/author/author_slug'>View</Link>
          )*/}
        </div>
      )}
    </div>
  );
}

MyPage.propTypes = {
  success: PropTypes.bool.isRequired,
  handleUpdateAuthor: PropTypes.func.isRequired,
  handleGetAuthorEdit: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired,
  updateLoading: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    updateLoading: state.getAuthorEdit.updatedAuthor.loading,
    file_url: state.getAuthorEdit.uploadImage.file_url,
  };
};
export default connect(mapStateToProps)(withRouter(MyPage));
