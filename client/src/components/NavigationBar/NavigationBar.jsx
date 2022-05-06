import React from "react";
import { Link, Tabbar, Text, zmp } from "zmp-framework/react";
import useCurrentRoute from "../../hooks/useCurrentRoute";
import "./styles.scss";
import { AiFillHome } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import CreatePostIcon from "../../static/icons/CreatePost.svg";

const NavigationBar = () => {
  const currentPath = useCurrentRoute();

  let activePath = currentPath;
  if (currentPath[currentPath.length - 1] !== "/") {
    activePath = `${currentPath}/`;
  }
  const switchTab = (tabLink) => {
    console.log("switch to " + tabLink);
    zmp.views.current.router.navigate(tabLink, {
      browserHistory: false,
      animate: false,
    });
  };

  return (
    <Tabbar slot="fixed" bottom className="app-tabbar shadow-1" noHairline>
      <Link
        noLinkClass
        onClick={() => switchTab("/")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/"}
      >
        <AiFillHome size={24} />
        <Text
          size="xxsmall"
          className="navbar-item-label navbar-item-label text-gray-dark font-roboto"
        >
          Trang chủ
        </Text>
      </Link>
      <Link
        noLinkClass
        onClick={() => switchTab("/manage-post")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/manage-post/"}
      >
        <BsReverseLayoutTextSidebarReverse size={21} />
        <Text
          size="xxsmall"
          className="navbar-item-label text-gray-dark font-extrabold"
        >
          Quản lý tin
        </Text>
      </Link>
      <div>
        <Link
          noLinkClass
          onClick={() => switchTab("/choose-category/")}
          className="write-blog rounded-full border-white bg-blue border-4 items-center"
          tabLinkActive={activePath === "/choose-category/"}
        >
          <img src={CreatePostIcon} />
        </Link>
      </div>
      <Link
        noLinkClass
        onClick={() => switchTab("/messages/")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/messages/"}
      >
        <BiMessageDetail size={24} />
        <Text
          size="xxsmall"
          className="navbar-item-label text-gray-dark font-extrabold"
        >
          Tin nhắn
        </Text>
      </Link>
      <Link
        noLinkClass
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/account/"}
        onClick={() => switchTab("/account/")}
      >
        <FaRegUser size={22} />
        <Text
          size="xxsmall"
          className="navbar-item-label text-gray-dark font-extrabold"
        >
          Tài khoản
        </Text>
      </Link>
    </Tabbar>
  );
};
NavigationBar.propTypes = {};
NavigationBar.displayName = "zmp-toolbar";
export default NavigationBar;
