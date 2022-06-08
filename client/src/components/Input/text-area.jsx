import React from "react";
import { Box, Text } from "zmp-framework/react";
import "../../css/input.scss";
const TextArea = React.forwardRef((props, ref) => {
  const { compulsory, label, errorMessage, ...rest } = props;

  return (
    <Box className="custom-input">
      {label && (
        <Text className="text-color-nl500" style={{ marginBottom: "2px" }}>
          {label}
          {compulsory && <span className="text-color-rl300"> *</span>}
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
