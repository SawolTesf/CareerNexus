// Got these from https://material-ui.com/customization/default-theme/#default-theme

export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
  };

  export const themeSettings = (mode) => {
    return{
        // These palettes could be subject to change as I continue to develop the app.
        palette: {
            mode: mode,
            // The "..." is called the spread operator. It is used to spread the contents of an object or array. In this case, it is used to spread the contents of the colorTokens object.
            ...(mode === "dark") ? { // If the mode is dark, then use the dark colors. 
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[300]
                },
                neutral: {
                    dark: colorTokens.grey[800],
                    main: colorTokens.grey[700],
                    mediumMain: colorTokens.grey[600],
                    medium: colorTokens.grey[500],
                    light: colorTokens.grey[300]
                },
                background: {
                    default: colorTokens.grey[900],
                    alt: colorTokens.grey[800]
                },
            } : { // If the mode is not dark, then use the light colors.
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[300]
                },
                neutral: {
                    dark: colorTokens.grey[800],
                    main: colorTokens.grey[700],
                    mediumMain: colorTokens.grey[600],
                    medium: colorTokens.grey[500],
                    light: colorTokens.grey[300]
                },
                background: {
                    default: colorTokens.grey[0],
                    alt: colorTokens.grey[50]
                },
            }
        },
        typography: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    }
}