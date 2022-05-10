import React from "react";
import { Icon } from "zmp-framework/react";

const HeartIcon = ({ isLiked, handleLikeUnlike }) => {
  return (
    <div onClick={handleLikeUnlike}>
      <Icon
        className="text-color-rl300 demo-icon"
        zmp={isLiked === true ? "zi-heart-solid" : "zi-heart"}
        size={20}
      />
    </div>
  );
};

HeartIcon.displayName = "zmp-heart-icon";

export default HeartIcon;
