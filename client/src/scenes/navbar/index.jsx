import { useState } from 'react';
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery, Input } from '@mui/material'; // From Material UI library (https://mui.com/)

// Icons we will be using from https://mui.com/components/material-icons/
import{
    Search,
    Message,
    Notifications,
    Help,
    Menu,
    LightMode,
    DarkMode,
    Close
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux'; // useDispatch: Redux hook that is used to dispatch actions. useSelector: Redux hook that is used to access redux state
import { setMode, setLogout } from "state"; // Actions we will be dispatching
import { Form, useNavigate } from 'react-router-dom'; // Form: Material UI component that is used to create a form element. useNavigate: React router hook that is used to navigate between pages
import FlexBetween from 'components/FlexBetween'; // FlexBetween component we created in the components folder

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // State for toggling mobile menu on mobile screens
    const dispatch = useDispatch(); // Redux dispatch hook which is used to dispatch actions. Dispatching actions is how we update the redux state. 
    const navigate = useNavigate(); // React router hook which is used to navigate between pages
    const user = useSelector((state) => state.user); // Redux state hook which is used to access user state
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Media query hook which is used to check if screen is non-mobile
    
    // Different themes we will be using
    const theme = useTheme(); // Material UI hook which is used to access theme object. This lets us use the palettes from theme.js
    const neutralLight = theme.palette.neutral.light; // Neutral light color from theme.js
    const dark = theme.palette.neutral.dark; // Dark color from theme.js
    const background = theme.palette.background.default; // Background color from theme.js
    const primaryLight = theme.palette.primary.light; // Primary light color from theme.js
    const alt = theme.palette.background.alt; // Alt color from theme.js

    const fullName = `${user.firstName} ${user.lastName}`; // Full name of user. This is used in the navbar

    // Using the FlexBetween component we created in the components folder and passing in some props to style it
    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <Typography> // Material UI component that is used to create a text element. This is used to create the CareerNexus logo
            fontWeigth="bold"
            fontSize = "clamp(1rem, 2rem, 2.25rem)" // This is a css function that allows us to set a min and max font size. Useful for responsive design
            color="primary"
            onClick={() => navigate("/home")}
            sx={ { // This is a Material UI prop that allows us to style components using css in js
                "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                },
            } }
            CareerNexus
        </Typography>
        {isNonMobileScreens && ( 
            <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                <InputBase placeholder='Search' />
                <IconButton>
                    <Search />
                </IconButton>
            </FlexBetween>
        )}

        // If screen is non-mobile, show the desktop navbar, else show the mobile navbar
        {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
                // Terinary operator that checks if theme is dark or light and renders the appropriate icon
                {theme.palette.mode === "dark" ? (
                    <DarkMode sx={ {fontSize: "25px"} }/> // Using the DarkMode component from Material UI if theme is dark mode and passing in some props to style it
                ): (
                    <LightMode sx={ { color: dark, fontSize: "25px"} }/> // Using the LightMode component from Material UI if theme is light mode and passing in some props to style it
                )}
            </IconButton>

            // Material UI component that is used to create a select dropdown
            <Message sx={ {fontSize: "25px"} }/>
            <Help sx={ {fontSize: "25px"} }/>
            <Notifications sx={ {fontSize: "25px"} }/>
            // Form component from Material UI that is used to create a form element
            <FormControl variant="standard" value={fullName}> // Passing in some props to style the form. Standard variant is used to create a standard form element
                // Select component from Material UI that is used to create a select dropdown. We are passing in some props to style the select dropdown such as the background color, width, border radius, padding, and focus color
                <Select value={ fullName } sx={ { backgroundColor: neutralLight, width: "150px", borderRadius: "0.25rem", p: "0.25rem 1rem", "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" }, "& .MuiSelect-select:focus": { backgroundColor: neutralLight } } } input={<InputBase/>}>
                    
                </Select>

            </FormControl>
        </FlexBetween>
        ) : (
            <IconButton></IconButton>
        )}
    </FlexBetween>;
};

export default Navbar;