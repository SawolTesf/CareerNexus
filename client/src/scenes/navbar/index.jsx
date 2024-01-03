import { useState } from 'react';
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material'; // From Material UI library (https://mui.com/)
import { themeSettings } from 'theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // ThemeProvider: Material UI component that is used to create a theme. createTheme: Material UI function that is used to create a theme

// Icons we will be using from https://mui.com/components/material-icons/
import{
    Search as SearchIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Help as HelpIcon,
    Menu as MenuIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux'; // useDispatch: Redux hook that is used to dispatch actions. useSelector: Redux hook that is used to access redux state
import { setMode, setLogout } from "state"; // Actions we will be dispatching
import { useNavigate } from 'react-router-dom'; // Form: Material UI component that is used to create a form element. useNavigate: React router hook that is used to navigate between pages
import FlexBetween from 'components/FlexBetween'; // FlexBetween component we created in the components folder

/**
 * Navbar component that displays the navigation bar at the top of the page.
 * It includes various elements such as the logo, search bar, user profile, and navigation icons.
 */
const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // State for toggling mobile menu on mobile screens
    const dispatch = useDispatch(); // Redux dispatch hook which is used to dispatch actions. Dispatching actions is how we update the redux state. 
    const navigate = useNavigate(); // React router hook which is used to navigate between pages
    const user = useSelector((state) => state.user); // Redux state hook which is used to access user state
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Media query hook which is used to check if screen is non-mobile
    
    // Different themes we will be using
    const theme = themeSettings(); // Theme from theme.js
    const neutralLightColor = theme.palette.neutral.light; // Neutral light color from theme.js
    const darkColor = theme.palette.neutral.dark; // Dark color from theme.js
    const backgroundColor = theme.palette.background.default; // Background color from theme.js
    const primaryLightColor = theme.palette.primary.light; // Primary light color from theme.js
    const altColor = theme.palette.background.alt; // Alt color from theme.js

    const fullName = user ? `${user.firstName} ${user.lastName}` : ''; // Full name of user. This is used in the navbar
    
    // Using the FlexBetween component we created in the components folder and passing in some props to style it
    return (
        <FlexBetween padding="1rem 6%" backgroundColor={altColor}>
            <Typography
                fontWeigth="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)" // This is a css function that allows us to set a min and max font size. Useful for responsive design
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLightColor,
                        cursor: "pointer",
                    },
                }}
            >
                CareerNexus
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween backgroundColor={neutralLightColor} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                    <InputBase placeholder='Search' />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </FlexBetween>
            )}

            {/* [Desktop Navigation] */}

            {/* If screen is non-mobile, show the desktop navbar, else show the mobile navbar */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {/* Terinary operator that checks if theme is dark or light and renders the appropriate icon */}
                        {theme.palette.mode === "dark" ? (
                            <DarkModeIcon sx={{ fontSize: "25px" }} /> // Using the DarkMode component from Material UI if theme is dark mode and passing in some props to style it
                        ) : (
                            <LightModeIcon sx={{ color: darkColor, fontSize: "25px" }} /> // Using the LightMode component from Material UI if theme is light mode and passing in some props to style it
                        )}
                    </IconButton>

                    {/* Material UI component that is used to create a select dropdown */}
                    <MessageIcon sx={{ fontSize: "25px" }} />
                    <HelpIcon sx={{ fontSize: "25px" }} />
                    <NotificationsIcon sx={{ fontSize: "25px" }} />
                    {/* Form component from Material UI that is used to create a form element */}
                    <FormControl variant="standard" value={fullName}>
                        {/* Select component from Material UI that is used to create a select dropdown. We are passing in some props to style the select dropdown such as the background color, width, border radius, padding, and focus color */}
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLightColor,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                                "& .MuiSelect-select:focus": { backgroundColor: neutralLightColor },
                            }}
                            input={<InputBase />}
                        >
                            {/* For adding the user's full name to the select dropdown */}
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            {/* Dispatching the setLogout action when the user clicks on the logout button */}
                            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    {/* Toggling the mobile menu when the user clicks on the menu icon */}
                    <MenuIcon />
                </IconButton>
            )}

            {/* [Mobile Navigation] */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                // If screen is mobile and mobile menu is toggled, show the mobile menu
                <Box
                    /* Styling for the box */
                    backgroundColor={backgroundColor}
                    position="fixed" // Since this is a mobile menu, we want it to be fixed to the top of the screen
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    minWidth="300px"
                    maxWidth="500px"
                >
                    {/* Closing icon for the mobile menu */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Mobile menu items */}
                    {/* Similar to the desktop navigation, we are using the FlexBetween component we created in the components folder and passing in some props to style it */}
                    <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
                            {/* Terinary operator that checks if theme is dark or light and renders the appropriate icon */}
                            {theme.palette.mode === "dark" ? (
                                <DarkModeIcon sx={{ fontSize: "25px" }} /> // Using the DarkMode component from Material UI if theme is dark mode and passing in some props to style it
                            ) : (
                                <LightModeIcon sx={{ color: darkColor, fontSize: "25px" }} /> // Using the LightMode component from Material UI if theme is light mode and passing in some props to style it
                            )}
                        </IconButton>

                        {/* Material UI component that is used to create a select dropdown */}
                        <MessageIcon sx={{ fontSize: "25px" }} />
                        <HelpIcon sx={{ fontSize: "25px" }} />
                        <NotificationsIcon sx={{ fontSize: "25px" }} />
                        {/* Form component from Material UI that is used to create a form element */}
                        <FormControl variant="standard" value={fullName}>
                            {/* Select component from Material UI that is used to create a select dropdown. We are passing in some props to style the select dropdown such as the background color, width, border radius, padding, and focus color */}
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLightColor,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                                    "& .MuiSelect-select:focus": { backgroundColor: neutralLightColor },
                                }}
                                input={<InputBase />}
                            >
                                {/* For adding the user's full name to the select dropdown */}
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                {/* Dispatching the setLogout action when the user clicks on the logout button */}
                                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;