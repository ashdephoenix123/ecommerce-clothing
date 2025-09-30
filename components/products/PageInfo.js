import React from "react";
import BasicBreadcrumbs from "./Breadcrumb";
import { Typography } from "@mui/material";

const PageInfo = () => {
  return (
    <section className="mb-4">
      <BasicBreadcrumbs />
      <Typography display="flex" alignItems="center" component="div">
        <Typography fontWeight={600}>Mens Topwear</Typography>: 234183 Items
      </Typography>
    </section>
  );
};

export default PageInfo;
