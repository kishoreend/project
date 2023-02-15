import React from "react";
import PropTypes from "prop-types";
import loading from "../../assets/icons/loading.gif";
import loading1 from "../../assets/icons/loading1.gif";
const Loading = (props) => {
  return (
    <>
      <div>
        <img src={loading1} height={props.size === undefined ? "17" : props.size} />
      </div>
    </>
  );
};

export default Loading;
