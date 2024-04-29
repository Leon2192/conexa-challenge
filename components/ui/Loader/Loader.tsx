import React from "react";
import './Loader.css';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="spinner">
        <div className="spinnerin"></div>
      </div>
    </div>
  );
};

export default Loader;
