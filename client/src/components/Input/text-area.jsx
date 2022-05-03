import React from "react";
import { Box, Text } from "zmp-framework/react";
import "../../css/input.scss";
const TextArea = React.forwardRef((props, ref) => {
  const { compulsory, label, errorMessage, ...rest } = props;

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
      <textarea ref={ref} {...rest} />
      {errorMessage && (
        <Text size="large" className="custom-input__error-message">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
});

TextArea.displayName = "zmp-textarea";

export default TextArea;
