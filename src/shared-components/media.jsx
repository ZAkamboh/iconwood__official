import React from "react";

const Media = (val) => {
  switch (val) {
    case "mobile":
      return "@media only screen and (max-width: 480px)";
    case "tablet":
      return "@media only screen and (max-width: 999px)";
    case "xlscreens":
      return "@media only screen and (min-width: 1000px)";
    default:
      return "";
  }
};

export default Media;
