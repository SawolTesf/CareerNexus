// This file will be useful because it is reusable. I will be using this css style in multiple components.

import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
})

export default FlexBetween;