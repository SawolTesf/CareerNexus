import { useState } from 'react';
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery, Input } from '@mui/material'; // From Material UI library (https://mui.com/)

// Icons we will be using from https://mui.com/components/material-icons/
import{
    Search,
    Message,
    Notifications,
    Help,
    Menu,
    lightMode,
    DarkMode,
    Close
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from "state";
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // State for toggling mobile menu on mobile screens
    const dispatch = useDispatch(); // Redux dispatch hook which is used to dispatch actions
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
        <Typography>
            fontWeigth="bold"
            fontSize = "clamp(1rem, 2rem, 2.25rem)" // This is a css function that allows us to set a min and max font size. Useful for responsive design
            color="primary"
            onClick={() => navigate("/home")}
            sx={{ // This is a Material UI prop that allows us to style components using css in js
                "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                },
            }}
        </Typography>
        {isNonMobileScreens && (
            <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                <InputBase placeholder='Search' />
                <IconButton>
                    <Search />
                </IconButton>
            </FlexBetween>
        )}
        CareerNexus
    </FlexBetween>; 
};

export default Navbar;