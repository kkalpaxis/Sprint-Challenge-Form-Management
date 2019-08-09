import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik, yupToFormErrors, setNestedObjectValues } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const FormComponent = (props) => {
    console.log(props);
    const { values, touched, errors, status } = props;
    useEffect(() => {
        if (status) {
            props.addUser(status);
        }
    }, [status]);

    return ( 
    <Form>
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="text" name="name" placeholder="name" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}
        <Field type="email" name="email" placeholder="email" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}
        <Field type="password" name="password" placeholder="password" />
        {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
        <label>
            <Field type="checkbox" name="tos" />
            Agree to TOS
        </label>
        <button type="submit">Submit</button>
    </Form>
    );
};

const FormikForm = withFormik({
    mapPropsToValues: ({ name, email, password, tos }) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false, 
        };
    },
    validationSchema: yup.object().shape({
        name: yup.string()
            .required("Name required"),
        email: yup.string()
            .email("Email required")
            .required("An email is required"),
        password: yup.string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
        tos: yup.boolean()
            .oneOf([true], "You must accept the terms of service")
            .required()   
    }),
    handleSubmit: (values, { resetForm, setStatus }) => {
        console.log("request")
        axios.post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res);
                setStatus(res)
                resetForm();
            })
            .catch(error => {
                console.log(error)
            })
    }
})(FormComponent);

export default FormikForm;