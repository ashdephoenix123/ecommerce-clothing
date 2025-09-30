export const formURL = (id, optionID, router) => {
  // Copy query without slug
  const { slug, ...restQuery } = router.query;
  const params = new URLSearchParams(restQuery || {});

  // Determine if this filter should be treated as an array
  const isArrayFilter = id !== "discount"; // discount is string, everything else is array

  if (isArrayFilter) {
    // Get current selected values for this filter (array)
    let current = params.get(id)?.split(",") || [];

    if (current.includes(optionID)) {
      // remove if already selected
      current = current.filter((item) => item !== optionID);
    } else {
      // add if not selected
      current.push(optionID);
    }

    if (current.length > 0) {
      params.set(id, current.join(","));
    } else {
      params.delete(id);
    }
  } else {
    // Single-value filter (overwrite previous)
    if (optionID) {
      params.set(id, optionID);
    } else {
      params.delete(id);
    }
  }

  // Use object form for dynamic route
  return {
    pathname: `/products/${slug || ""}`,
    query: Object.fromEntries(params.entries()),
  };
};
