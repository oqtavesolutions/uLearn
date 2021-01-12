import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./MyPage.scss";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";
import ReactQuill from "react-quill";
import EditorFooter from "../../components/EditorFooter/EditorFooter";

const validationSchema = Yup.object().shape({
  author_name: Yup.string().required("Required"),
  author_bio: Yup.string().required("Required"),
  author_slug: Yup.string()
    .matches(/^[a-zA-Z0-9-_]+$/, {
      excludeEmptyString: true,
      message: "Cannot contain space or characters except for _ and -",
    })
    .required("Required"),
});

function MyPage({
  success,
  handleUpdateAuthor,
  handleGetAuthorEdit,
  author,
  loading,
  updateLoading,
}) {
  useEffect(() => {
    handleGetAuthorEdit();
  }, [handleGetAuthorEdit]);

  const handleSubmit = ({ author_name, author_bio, author_slug }) => {
    handleUpdateAuthor({
      author_name,
      author_bio,
      author_slug,
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
        <Fragment>
          <Formik
            initialValues={{
              author_name: author.author_name || "",
              author_bio: author.author_bio || "",
              author_slug: author.author_slug || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className='mypage-page-form'>
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
                    className='mypage-page-form__input mypage-page-form__input--disabled'
                    disabled={
                      author.author_slug !== "" ||
                      author.author_slug !== undefined ||
                      author.author_slug !== null
                        ? true
                        : false
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
        </Fragment>
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
};

const mapStateToProps = (state) => {
  return {
    updateLoading: state.getAuthorEdit.updatedAuthor.loading,
  };
};
export default connect(mapStateToProps)(withRouter(MyPage));
