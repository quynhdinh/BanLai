import React from "react";
import { Box, Icon, Tab, Text } from "zmp-framework/react";
import "../../css/input.scss";
import { AiFillCloseCircle } from "react-icons/ai";

const ImageUploader = React.forwardRef((props, ref) => {
  const {
    compulsory,
    label,
    errorMessage,
    displayImages,
    setDisplayImages,
    setUploadFile,
    ...rest
  } = props;
  return (
    <section>
      <Box m={0} flex>
        {label && (
          <Text
            className="text-color-nl500"
            style={{ marginBottom: "2px", flex: 1 }}
          >
            {label}
            {compulsory && <span className="text-color-rl300"> *</span>}
          </Text>
        )}
        <Text> {displayImages.length}/10 </Text>
      </Box>
      <Tab
        className="page-content"
        m={0}
        style={{ paddingTop: 8, marginBottom: 8 }}
      >
        <Box m={0} flex style={{ width: "max-content" }}>
          <label className="border-color-nl700">
            <Icon
              className="demo-icon color-nl700"
              zmp="zi-add-photo"
              size={16}
            />
            <Text className="text-color-nl700"> Thêm ảnh</Text>
            <input
              type="file"
              name="images"
              multiple
              accept="image/png , image/jpeg, image/webp"
              ref={ref}
              {...rest}
              style={{ display: "none" }}
            />
          </label>
          {displayImages &&
            displayImages.map((image, index) => {
              return (
                <Box
                  m={0}
                  key={index}
                  style={{ position: "relative", marginRight: 12 }}
                >
                  <img
                    src={image.url}
                    className="border-color-nl700"
                    style={{
                      objectFit: "cover",
                      width: 100,
                      height: 120,
                      borderRadius: 4,
                      border: "1px solid",
                    }}
                    alt="upload"
                  />
                  <div
                    onClick={() => {
                      setDisplayImages(
                        displayImages.filter((e) => e !== image)
                      );
                      setUploadFile((previousFiles) =>
                        previousFiles.filter((value, i) => i !== index)
                      );
                    }}
                    style={{ position: "absolute", top: -8, right: -8 }}
                  >
                    <AiFillCloseCircle className="color-nl300" size={20} />
                  </div>
                </Box>
              );
            })}
        </Box>
      </Tab>
      {errorMessage && (
        <Text
          size="large"
          className="text-color-rl300 custom-input__error-message"
        >
          {errorMessage}
        </Text>
      )}
    </section>
  );
});

ImageUploader.displayName = "zmp-image-uploader";

export default ImageUploader;
