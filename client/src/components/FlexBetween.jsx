// This file will be useful because it is reusable. I will be using this css style in multiple components.

import { Box } from "@mui/material"; // "Box" is a component from Material UI. It is a div with some extra features such as flexbox
import { styled } from "@mui/system"; // "styled" is a function from Material UI. It allows us to style components using css in js

const FlexBetween = styled(Box)({ 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween;