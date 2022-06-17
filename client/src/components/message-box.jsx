import React from "react";
import {Box, Text, Button} from "zmp-framework/react";
import api from "zmp-sdk";

const MessageBox = ({isTexted, partner}) => {
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
      {isTexted === -1 ? <></> : (
        <>
          <Box flex alignItems="center">
            <Text style={{flex: 1, marginBottom: 0}}>
              ️{isTexted ? "✅ Đã liên hệ người bán" : "Liên hệ với người bán"}
            </Text>
            <Button typeName={isTexted ? "secondary" : "primary"}
                    onClick={() => {
                      api.openChat({
                        type: 'user',
                        id: partner
                      });
                    }}>
              {isTexted ? "Xem tin nhắn" : "Gửi tin nhắn"}
            </Button>
          </Box>
        </>
      )
      }
    </Box>
  );
};

MessageBox.displayName = "zmp-message-box";

export default MessageBox;
