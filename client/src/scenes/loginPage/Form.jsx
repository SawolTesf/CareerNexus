import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import EditOutLineIcon from "@mui/icons-material/EditOutlined"; // This is an icon from the Material UI library
import { Formik } from "formik"; // Formik help simplify form creation and validation. More info here: https://formik.org/docs/overview
import * as yup from "yup"; // * as yup means import everything from yup and name it yup.
import { useNavigate } from "react-router-dom"; // useNavigate is a hook that allows us to navigate to different pages
import { useDispatch } from "react-redux"; // useDispatch is a hook that allows us to dispatch actions to the redux store
import { setLogin } from "state"; // setLogin is an action that sets the login state to true
import { DropZone } from "react-dropzone"; // DropZone is a component that allows us to drag and drop files
import { FlexBetween } from "components/FlexBetween";

/* This is a component that renders a form for users to login */
const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm password is required"),
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    education: yup.string().required("Education is required"),
    picture: yup.string().required("Picture is required"),
})