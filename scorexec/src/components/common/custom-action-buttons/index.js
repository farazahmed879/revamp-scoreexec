//import CustomButton from "../custom-button";
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "antd"


const CustomActionButton = ({ value, onClick }) => {
  return (
    <Button style={{ marginRight: '10px', marginBottom:"10px" }}onClick={onClick}>
      {value}
    </Button>
  );
};

CustomActionButton.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CustomActionButton;

