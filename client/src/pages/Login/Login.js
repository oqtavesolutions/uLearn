import React from "react";
import "./Login.scss";
import PropTypes from "prop-types";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});

function Login({ handleLogin, isLoggedIn, error, loading }) {
  if (isLoggedIn) {
    return <Redirect to='/my-courses' />;
  }

  return (
    <div className='login-page'>
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
      <h1 className='login-page__title'>Login</h1>
      <p className='login-page__sub'>
        Enter your email and password below to login
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        {({ isSubmitting }) => (
          <Form className='login-page-form'>
            <div className='login-page-form__input-container'>
              <Field
                type='text'
                name='email'
                placeholder='Email'
                className='login-page-form__input'
              />
              <ErrorMessage
                name='email'
                component='span'
                className='login-page-form__input-error'
              />
            </div>
            <div className='login-page-form__input-container'>
              <Field
                type='password'
                name='password'
                placeholder='password'
                className='login-page-form__input'
              />
              <ErrorMessage
                name='password'
                component='span'
                className='login-page-form__input-error'
              />
            </div>
            <button
              type='submit'
              className='login-page-form__button'
              disabled={loading}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      <p className='login-page__sub'>
        Need a new account?{" "}
        <Link to='/signup' className='login-page__sub-link'>
          Sign up here
        </Link>
      </p>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
