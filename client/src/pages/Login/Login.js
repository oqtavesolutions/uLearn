import React from "react";
import "./Login.scss";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});

function Login({ handleLogin, isLoggedIn }) {
  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            type='text'
            name='email'
            placeholder='Email'
            className='create-course-form__input'
          />
          <ErrorMessage name='email' component='div' />
          <Field
            type='password'
            name='password'
            placeholder='password'
            className='create-course-form__input'
          />
          <ErrorMessage name='password' component='div' />
          <button type='submit' className='' disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userStatus.isLoggedIn,
  };
};

export default connect(mapStateToProps)(withRouter(Login));
