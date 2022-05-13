import React from "react";
import { Icon, Box, Text, Button } from "zmp-framework/react";
import CustomInput from "./Input";

const MessageBox = ({ isTexted }) => {
  const hintMessages = [
    "Sản phẩm này còn không?",
    "Mình quan tâm, cho thêm thông tin nhé",
    "Sản phẩm còn bảo hành không?",
  ];
  const setMessage = (message) => () => {
    document.getElementById("message").value = Object.values(message);
  };
  return (
    <Box
      m={0}
      px={3}
      py={4}
      className="bg-color-white"
      style={{
        zIndex: 10000,
        position: "fixed",
        bottom: "0",
        width: "-webkit-fill-available",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        boxShadow: "0px -2px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      {isTexted === false ? (
        <>
          <Box m={0} flex>
            <CustomInput
              placeholder="Nhắn tin với người bán qua Zalo"
              id="message"
            />
            <Box
              m={0}
              ml={4}
              flex
              className="bg-color-bl300"
              justifyContent="center"
              alignItems="center"
              style={{ borderRadius: "50%", width: 48, height: 48 }}
            >
              <Icon className="color-white demo-icon" zmp="zi-send-solid" />
            </Box>
          </Box>
          <Box m={0}>
            <Box
              m={0}
              mt={2}
              flex
              style={{ overflowX: "scroll", width: "max-content" }}
            >
              {hintMessages.map((item, index) => (
                <HintMessage
                  key={index}
                  onClick={setMessage({ message: item })}
                >
                  {item}
                </HintMessage>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box flex alignItems="center">
            <Text style={{ flex: 1, marginBottom: 0 }}>
              ️✅ Đã liên hệ người bán
            </Text>
            <Button typeName="primary">Xem tin nhắn</Button>
          </Box>
        </>
      )}
    </Box>
  );
};
const HintMessage = ({ children, onClick }) => (
  <div onClick={onClick}>
    <Text
      className="r-round border-color-nl600 text-color-black"
      style={{
        padding: "8px",
        marginRight: "4px",
        display: "inline-block",
        borderRadius: "8px",
        border: "0.5px solid",
      }}
    >
      {children}
    </Text>
  </div>
);

MessageBox.displayName = "zmp-message-box";

export default MessageBox;