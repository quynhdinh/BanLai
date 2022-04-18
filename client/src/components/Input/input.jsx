import React, { useState } from "react";
import { Box, Text } from "zmp-framework/react";
import "./style.scss";
const CustomInput = React.forwardRef((props, ref) => {
  const { compulsory, label, errorMessage, hintMessage, ...rest } = props;
  const [hintShown, setHintShown] = useState(false);
  const handleFocus = (e) => {
    setHintShown(true);
  };
  const handleBlur = (e) => {
    setHintShown(false);
  };
  return (
    <Box className="custom-input">
      {label && (
        <Text style={{ marginBottom: "2px", color: "#667685" }}>
          {label}
          {compulsory && (
            <span style={{ color: "rgba(239, 78, 73, 1)" }}> *</span>
          )}
        </Text>
      )}
      <input ref={ref} {...rest} onFocus={handleFocus} onBlur={handleBlur} />
      {hintMessage && hintShown && (
        <Box className="custom-input__hint">
          {hintMessage.map((item, index) => (
            <Text size="xxsmall" key={index}>
              {item}
            </Text>
          ))}
        </Box>
      )}
      {errorMessage && (
        <Text size="large" className="custom-input__error-message">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
});

CustomInput.displayName = "zmp-input";

export default CustomInput;
