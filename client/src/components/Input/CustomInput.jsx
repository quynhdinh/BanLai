import React, { useState } from "react";
import { Box, Text } from "zmp-framework/react";
import "../../css/input.scss";
const CustomInput = React.forwardRef((props, ref) => {
  const { compulsory, label, errorMessage, hintMessage, ...rest } = props;
  const [hintShown, setHintShown] = useState(false);
  const handleFocus = (_e) => {
    setHintShown(true);
  };
  const handleBlur = (_e) => {
    setHintShown(false);
  };
  return (
    <Box className="custom-input">
      {label && (
        <Text className="text-color-nl500" style={{ marginBottom: "2px" }}>
          {label}
          {compulsory && <span className="text-color-rl300"> *</span>}
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
        <Text
          size="large"
          className="text-color-rl300 custom-input__error-message"
        >
          {errorMessage}
        </Text>
      )}
    </Box>
  );
});

CustomInput.displayName = "zmp-input";

export default CustomInput;
