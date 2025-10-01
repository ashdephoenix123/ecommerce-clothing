export const formURL = (id, optionIDs, router) => {
  const { slug, ...restQuery } = router.query;
  const params = new URLSearchParams(restQuery || {});

  const isArrayFilter = id !== "discount"; // discount = single, everything else = array

  if (isArrayFilter) {
    // Handle both single string and array
    let current = params.get(id)?.split(",") || [];

    if (Array.isArray(optionIDs)) {
      current = optionIDs; // overwrite with full array selection
    } else {
      // fallback: handle single selection toggle
      const optionID = optionIDs;
      if (current.includes(optionID)) {
        current = current.filter((item) => item !== optionID);
      } else {
        current.push(optionID);
      }
    }

    if (current.length > 0) {
      params.set(id, current.join(","));
    } else {
      params.delete(id);
    }
  } else {
    // Single-value filter
    if (optionIDs) {
      params.set(id, optionIDs);
    } else {
      params.delete(id);
    }
  }

  return {
    pathname: `/products/${slug || ""}`,
    query: Object.fromEntries(params.entries()),
  };
};

export const groupedBrands = (options, searchTerm = "") => {
  const grouped = options.reduce((acc, brand) => {
    const firstLetter = brand.label[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push([brand.id, brand.label]);
    return acc;
  }, {});

  Object.keys(grouped).forEach((key) => {
    grouped[key].sort();
  });

  const sortedgroup = Object.keys(grouped)
    .sort()
    .reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});

  // Apply search filter if searchTerm is provided
  if (searchTerm.trim()) {
    const filtered = Object.keys(sortedgroup).reduce((acc, letter) => {
      const matches = sortedgroup[letter].filter((brand) =>
        brand[1].toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matches.length > 0) {
        acc[letter] = matches;
      }
      return acc;
    }, {});
    return filtered;
  }

  return sortedgroup;
};

export const debounce = (callback, delay) => {
  let timeoutID;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
