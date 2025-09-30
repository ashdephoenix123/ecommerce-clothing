import React from "react";
import BasicBreadcrumbs from "./Breadcrumb";
import { Typography } from "@mui/material";

const PageInfo = () => {
  return (
    <section>
      <BasicBreadcrumbs />
      <Typography display="flex" alignItems="center">
        <Typography fontWeight={600}>Mens Topwear</Typography>: 1001010010 Items
      </Typography>
    </section>
  );
};

export default PageInfo;
