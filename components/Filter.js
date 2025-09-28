import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ label, isExpanded, onChange, children }) => {
  return (
    <Accordion
      sx={{ border: "none" }}
      expanded={isExpanded}
      onChange={onChange}
    >
      <AccordionSummary
        expandIcon={<FaChevronDown />}
        aria-controls={label + " content"}
        id={label + " header"}
      >
        <Typography component="span">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Filter;
