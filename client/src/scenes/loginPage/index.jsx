import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { themeSettings } from "theme";
const LoginPage = () => {
    const theme = themeSettings();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return <Box>
        <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
            <Typography
                fontWeigth="bold"
                fontSize="30px" // This is a css function that allows us to set a min and max font size. Useful for responsive design
                color="primary"
            >
                CareerNexus
            </Typography>
        </Box>
    </Box>;
};

export default LoginPage;