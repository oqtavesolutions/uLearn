import React from "react";
import "./MyAccount.scss";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(8, "Password must be over 8 characters")
    .required("Required"),
  new_password: Yup.string()
    .min(8, "Password must be over 8 characters")
    .notOneOf([Yup.ref("old_password"), null], "Old password cannot match new")
    .required("Required"),
  new_password_again: Yup.string().oneOf(
    [Yup.ref("new_password"), null],
    "Passwords must match"
  ),
});

function MyAccount({ handleChangePassword }) {
  return (
    <Formik
      initialValues={{
        old_password: "",
        new_password: "",
        new_password_again: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleChangePassword}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            type='password'
            name='old_password'
            placeholder='Old Password'
            className='create-course-form__input'
          />
          <ErrorMessage name='old_password' component='div' />
          <Field
            type='password'
            name='new_password'
            placeholder='New Password'
            className='create-course-form__input'
          />
          <ErrorMessage name='new_password' component='div' />

          <Field
            type='password'
            name='new_password_again'
            placeholder='New Password Again'
            className='create-course-form__input'
          />
          <ErrorMessage name='new_password_again' component='div' />
          <button type='submit' className='' disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

MyAccount.propTypes = {
  handleChangePassword: PropTypes.func.isRequired,
};

export default withRouter(MyAccount);
