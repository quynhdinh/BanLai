import React from "react";
import { Icon, Box, Text, Button, Tab } from "zmp-framework/react";
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
          <Box flex alignItems="center">
            <Text style={{ flex: 1, marginBottom: 0 }}>
              ️Liên hệ với người bán
            </Text>
            <Button typeName="primary">Gửi tin nhắn</Button>
          </Box>
        </>
      ) : (
        <>
          <Box flex alignItems="center">
            <Text style={{ flex: 1, marginBottom: 0 }}>
              ️✅ Đã liên hệ người bán
            </Text>
            <Button typeName="secondary">Xem tin nhắn</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

MessageBox.displayName = "zmp-message-box";

export default MessageBox;
