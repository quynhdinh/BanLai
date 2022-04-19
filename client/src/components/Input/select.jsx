import React from "react";
import { Box, Text } from "zmp-framework/react";
import "./style.scss";
const Select = React.forwardRef((props, ref) => {
  const { compulsory, label, errorMessage, option, onChange, ...rest } = props;

  return (
    <Box className="custom-select">
      {label && (
        <Text style={{ marginBottom: "2px", color: "#667685" }}>
          {label}
          {compulsory && (
            <span style={{ color: "rgba(239, 78, 73, 1)" }}> *</span>
          )}
        </Text>
      )}
      <select ref={ref} {...rest} onChange={onChange}>
        {option?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {errorMessage && (
        <Text size="large" className="custom-select__error-message">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
});

Select.displayName = "zmp-select";

export default Select;
