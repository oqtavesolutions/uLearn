import React from "react";
import "./Signup.scss";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(8).required("Required"),
});

function Signup({ handleSignup, isLoggedIn }) {
  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='signup-page'>
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
      <h1 className='signup-page__title'>Sign up</h1>
      <p className='signup-page__sub'>
        Enter your name, email and password below to signup, it's free!
      </p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        {({ isSubmitting }) => (
          <Form className='signup-page-form'>
            <div className='signup-page-form__input-container'>
              <Field
                type='text'
                name='name'
                placeholder='Name'
                className='signup-page-form__input'
              />
              <ErrorMessage
                name='name'
                component='div'
                className='signup-page-form__input-error'
              />
            </div>
            <div className='signup-page-form__input-container'>
              <Field
                type='text'
                name='email'
                placeholder='Email'
                className='signup-page-form__input'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='signup-page-form__input-error'
              />
            </div>
            <div className='signup-page-form__input-container'>
              <Field
                type='password'
                name='password'
                placeholder='password'
                className='signup-page-form__input'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='signup-page-form__input-error'
              />
            </div>
            <button
              type='submit'
              className='signup-page-form__button'
              disabled={isSubmitting}>
              Signup
            </button>
          </Form>
        )}
      </Formik>
      <p className='signup-page__sub'>
        Already signed up?{" "}
        <Link to='/login' className='signup-page__sub-link'>
          Login here
        </Link>
      </p>
    </div>
  );
}

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Signup));
