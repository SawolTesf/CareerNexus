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
import { themeSettings } from "theme";

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

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
})

// This is a component that renders a form for users to login
const initialRegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    occupation: "",
    education: "",
    picture: "",
}
 // This is a component that renders a form for users to login
const initialLoginValues = {
    email: "",
    password: "",
}

const Form = () => {
    const { pageType, setPageType } = useState("login");
    const mode = useSelector((state) => state.mode);
    const theme = themeSettings(mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login"; // This is a boolean that is true if pageType is "login" and false otherwise

    const handleFormSubmit = async (values, onSubmitProps) => {
        return(
            <Formik 
            onSubmit={handleFormSubmit} 
            initialValues={isLogin ? initialLoginValues : initialRegisterValues} // If isLogin is true, then use the login initial values. Otherwise, use the register initial values
            validationSchema={isLogin ? loginSchema : registerSchema} // If isLogin is true, then use the login schema. Otherwise, use the register schema
            >
                // Weird syntax, but it's a function that takes in a formik object and returns a form
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    resetForm,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                            display="grid" // Using grid here because it's easier to align items in for a form
                            gridTemplateColumns="repeat(4, minxmax(0, 1fr))" // This is a shorthand for gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)"
                            sx = {{
                                "& > div": {
                                    gridColumn: isNonMobileScreens ? undefined : "span 4", // If isNonMobileScreens is true, then use undefined. Otherwise, use "span 4"
                                },
                            }}
                        >
                            {isRegister && (
                                <>
                                    /* First Name */
                                    <TextField
                                        label="First Name"
                                        // This is a function that is called when the input loses focus which is when the user clicks outside of the input
                                        onBlur={handleBlur}
                                        // This is a function that is called when the input changes
                                        onChange={handleChange}
                                        value={values.firstName} // This is the value of the input
                                        name="firstName"
                                        error = {Boolean(touched.firstName && Boolean(errors.firstName))} // This is a boolean that is true if the input has been touched and there is an error
                                        helperText={touched.firstName && errors.firstName} // This is the error message that is displayed if the input has been touched and there is an error
                                        sx = { {gridColumn: "span 2"} } // This is a shorthand for gridColumn: "span 2"
                                    />
                                    /* Last Name */
                                    <TextField
                                        label="Last Name"
                                        onBlur={handleBlur}     onChange={handleChange}
                                        value={values.lastName}
                                        name="lastName"
                                        error = {Boolean(touched.lastName && Boolean(errors.lastName))}
                                        helperText={touched.lastName && errors.lastName}
                                        sx = { {gridColumn: "span 2"} }
                                    />
                                    /* Location */
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        name="location"
                                        error = {Boolean(touched.location && Boolean(errors.location))}
                                        helperText={touched.location && errors.location}
                                        sx = { {gridColumn: "span 4"} } // Span of 4 becuse this will take up a whole row/line
                                    />
                                    /* Occupation */
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        name="occupation"
                                        error = {Boolean(touched.occupation && Boolean(errors.occupation))}
                                        helperText={touched.occupation && errors.occupation}
                                        sx = { {gridColumn: "span 4"} } // Span of 4 becuse this will take up a whole row/line
                                    />
                                    <Box gridColumn="span 4" border={'1px solid ${theme.palette.neutral.medium}'} borderRadius="5px" p="1rem">
                                        <DropZone
                                            acceptedFiles=".png, .jpg, .jpeg"
                                            multiple={false} // This is a boolean that is true if the user can upload multiple files

                                            // This is a function that is called when the user drops a file
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue("picture", acceptedFiles[0]);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={'2px dashed ${theme.palette.primary.main}'}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer"}}}
                                                >

                                                </Box>
                                            )}
                                        </DropZone>

                                    </Box>
                                </>
                            )}
                        </Box>
                    </form>
                )}
            </Formik>
        )
    }
}