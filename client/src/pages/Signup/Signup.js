import React from "react";
import "./Signup.scss";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(8).required("Required"),
});

function Signup({ handleSignup }) {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignup}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            type='text'
            name='name'
            placeholder='Name'
            className='create-course-form__input'
          />
          <ErrorMessage name='name' component='div' />
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

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
};

export default Signup;
