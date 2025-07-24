import { memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/material/styles";

const CustomizedAccordion = styled(Accordion)`
  backgroundcolor: #fecd27;
`;
const SimpleAccordion = memo(function SimpleAccordion({
  children,
  title,
  expanded,
}) {
  return (
    <div>
      <CustomizedAccordion
        defaultExpanded={expanded}
        sx={{
          width: "auto",
          backgroundColor: "transparent",
          border: "0px solid rgba(0, 0, 0, 0.12)", // Default MUI border color
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            padding: "0px",
          },
          "& .MuiAccordionSummary-content": {
            margin: "0px",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </CustomizedAccordion>
    </div>
  );
});

export default SimpleAccordion;
