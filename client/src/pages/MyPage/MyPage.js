import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./MyPage.scss";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import CustomContentLoader from "../../components/CustomContentLoader/CustomContentLoader";

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
                  <Field
                    type='text'
                    name='author_name'
                    placeholder='Author name'
                    className='mypage-page-form__input'
                  />
                  <ErrorMessage
                    name='author_name'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>
                <div className='mypage-page-form__input-container'>
                  {" "}
                  <Field
                    as='textarea'
                    name='author_bio'
                    placeholder='Author Bio'
                    className='mypage-page-form__text-area'
                  />
                  <ErrorMessage
                    name='author_bio'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>
                <div className='mypage-page-form__input-container'>
                  {" "}
                  <Field
                    type='text'
                    name='author_slug'
                    placeholder='Author Slug'
                    className='mypage-page-form__input'
                  />
                  <ErrorMessage
                    name='author_slug'
                    component='div'
                    className='mypage-page-form__input-error'
                  />
                </div>

                <button
                  type='submit'
                  className='mypage-page-form__button'
                  disabled={updateLoading}>
                  SUBMIT
                </button>
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
