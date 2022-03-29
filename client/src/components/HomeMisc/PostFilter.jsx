import {Icon, Text} from "zmp-framework/react";
import React from "react";
import '../../css/post-filter.css'

const onClickTag = () => {
    console.log("closed filters clicked")
}
const PostFilter = ({children}) => (
        <a alt="" href="" className="block-icon">
            <Text
                className="r-round bg-color-nd300 text-color-black"
                class="filter-text"
                style={{
                    padding: "4px 8px",
                    marginBottom: "4px",
                    marginTop: "3px",
                    marginLeft: "2px",
                    display: "inline-block",
                }}
            >
                {children}
            </Text>
            <Icon
                className="icon-tag"
                zmp="zi-close-circle-solid "
                size={14}
                onClick={onClickTag}
            />
        </a>
);

export default PostFilter;