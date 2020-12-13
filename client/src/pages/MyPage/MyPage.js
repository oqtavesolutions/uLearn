import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./MyPage.scss";
import PropTypes from "prop-types";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

function MyPage({ success, handleUpdateAuthor, handleGetAuthorEdit, author }) {
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
                <Field
                  type='text'
                  name='author_name'
                  placeholder='Author name'
                  className='mypage-page-form__input'
                />
                <ErrorMessage name='author_name' component='div' />
                <Field
                  as='textarea'
                  name='author_bio'
                  placeholder='Author Bio'
                  className='mypage-page-form__text-area'
                />
                <ErrorMessage name='author_bio' component='div' />
                <Field
                  type='text'
                  name='author_slug'
                  placeholder='Author Slug'
                  className='mypage-page-form__input'
                />
                <ErrorMessage name='author_slug' component='div' />

                <button
                  type='submit'
                  className='mypage-page-form__button'
                  disabled={isSubmitting}>
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
};

export default withRouter(MyPage);
