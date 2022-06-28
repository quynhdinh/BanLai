import React from "react";
import zalo from "../static/icons/Zalo.svg";
import facebook from "../static/icons/Facebook.svg";
import messenger from "../static/icons/Messenger.svg";
import link from "../static/icons/Link.svg";
import { Box, Title } from "zmp-framework/react";
import { FacebookShareButton } from "react-share";
import api from "zmp-sdk";

const ShareItem = ({ url }) => {
  const shareUrl = "http://github.com";
  const title = "GitHub";
  const shareToZalo = () => () => {
    console.log("hihi");
    // api.openShareSheet({
    //   type: "zmp",
    //   data: {
    //     title: "My Zalo Mini Program - HomePage",
    //     description: "Home page",
    //     thumbnail: "https://sample-videos.com/img/Sample-jpg-image-50kb.jpg",
    //   },
    //   success: (res) => {},
    //   fail: (err) => {},
    // });
    api.openPostFeed({
      type: "link",
      data: {
        link: "http://news.zing.vn/Trung-uong-quyet-dinh-phuong-an-nhan-su-cap-cao-post632739.html",
        title: "Trung ương quyết định phương án nhân sự cấp cao",
        thumb: "link-to-thumb",
        description: "description",
      },
      success: (data) => {},
      fail: (err) => {},
    });
  };

  const getLinkShare = ({ content }) => {
    const ta = document.createElement("textarea");
    ta.innerText = content;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  };
  return (
    <div>
      <Title size="small" bold>
        Chia sẻ bài đăng
      </Title>
      <Box ml={0} flexDirection="row" alignItems="left" inline>
        <img src={zalo} style={{ marginRight: 12 }} onClick={shareToZalo()} />
        <FacebookShareButton
          url={
            "https://www.figma.com/file/dm0Emec09D1Psj1zSBnAvp/Zalo-Mini-App-Framework?node-id=3%3A202"
          }
          quote={"hihihihihihi"}
          picture={
            "https://pixabay.com/photos/football-sport-play-competition-4455306/"
          }
          style={{ display: "contents" }}
        >
          <img src={facebook} style={{ marginRight: 12 }} />
        </FacebookShareButton>
        <img src={messenger} style={{ marginRight: 12 }} />
        <img
          src={link}
          style={{ marginRight: 12 }}
          onClick={getLinkShare({ content: url })}
        />
      </Box>
    </div>
  );
};

ShareItem.displayName = "zmp-heart-icon";

export default ShareItem;
