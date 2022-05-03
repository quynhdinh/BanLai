import React, { useState } from "react";
import { Page, Box, zmp, Button, Text, Title } from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import Categories from "../components/Categories";
import pc from "../static/icons/PC.svg";
import bed from "../static/icons/Bed.svg";

const HomePage = () => {
  const zmproute = zmp.views.main.router;

  const handleOnClick = ({ navigateLink }) => {
    zmproute.navigate(navigateLink);
  };

  return (
    <Page name="home" navbarLarge>
      <NavigationBar />
      <Box flex flexDirection="row" style={{ justifyContent: "center" }}>
        {categoryList.map((item, index) => (
          <CategoryIcon
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={() => {
              zmproute.navigate(item.navigateLink);
            }}
          />
        ))}
      </Box>

      <Categories />
    </Page>
  );
};

const categoryList = [
  { title: "Thiết bị điện tử", icon: pc, navigateLink: "/electronic-list" },
  {
    title: "Đồ gia dụng, Nội thất",
    icon: bed,
    navigateLink: "/house-item-list",
  },
];
const CategoryIcon = ({ title, icon, onClick }) => (
  <div onClick={onClick}>
    <Box
      flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="border-color-bl300"
      px={4}
      pt={2}
      m={2}
      style={{ border: "1px solid", maxWidth: 150, borderRadius:8 }}
    >
      <img src={icon} className="custom-icon" />
      <Box m={0} style={{ height: 44 }}>
        <Title
          className="text-color-bl300"
          size="xsmall"
          bold
          textAlign="center"
        >
          {title}
        </Title>
      </Box>
    </Box>
  </div>
);

export default HomePage;
