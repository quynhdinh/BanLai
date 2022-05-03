import React from "react";
import { Icon } from "zmp-framework/react";

const HeartIcon = ({ isLiked, handleLikeUnlike }) => {
  return (
    <div onClick={handleLikeUnlike}>
      {isLiked === true ? (
        <Icon
          className="text-color-rl300 demo-icon"
          zmp="zi-heart-solid"
          size={20}
        />
      ) : (
        <Icon className="text-color-rl300 demo-icon" zmp="zi-heart" size={20} />
      )}
    </div>
  );
};

HeartIcon.displayName = "zmp-heart-icon";

export default HeartIcon;
