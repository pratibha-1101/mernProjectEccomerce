import React from "react";
import Helmet from "react-helmet";


//the title we want get reflected on my website's name , whereever i import this file
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
