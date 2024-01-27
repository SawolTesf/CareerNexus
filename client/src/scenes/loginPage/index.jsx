import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
const LoginPage = () => {
    const mode = useSelector((state) => state.mode);
    const theme = themeSettings(mode);
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
        <Box width={isNonMobileScreens ? "50%" : "95%"} p="2ren" m = "2rem auto" borderRadius="1.5rem" backgroundColor={theme.palette.background.alt}>
            <Typography fontWeight="500" variant="h5" sx={{mb: "1.5rem"}} textAlign="center">
                Welcome to CareerNexus, a platform that helps you find your dream job!
            </Typography>
        </Box>
    </Box>;
};

export default LoginPage;