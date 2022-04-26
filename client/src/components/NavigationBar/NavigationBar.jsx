import React, { useRef, useState } from "react";
import { Link, Tabbar, Text, zmp } from "zmp-framework/react";
import {
  ArticleIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  PlusIcon,
} from "../Icons";
import useCurrentRoute from "../../hooks/useCurrentRoute";
import "./styles.scss";

const NavigationBar = () => {
  const currentPath = useCurrentRoute();

  let activePath = currentPath;
  if (currentPath[currentPath.length - 1] !== "/") {
    activePath = `${currentPath}/`;
  }
  const tabHistory = useRef([activePath]);

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
        <HomeIcon active={activePath === "/"} />
        <Text
          size="xxxsmall"
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
        <ArticleIcon active={activePath === "/manage-post/"} />
        <Text
          size="xxxsmall"
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
          <PlusIcon />
        </Link>
      </div>
      <Link
        noLinkClass
        onClick={() => switchTab("/post-detail")}
        className="flex flex-col items-center	"
        tabLinkActive={activePath === "/post-detail"}
      >
        <SearchIcon active={activePath === "/post-detail"} />
        <Text
          size="xxxsmall"
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
        <MenuIcon active={activePath === "/account/"} />
        <Text
          size="xxxsmall"
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
