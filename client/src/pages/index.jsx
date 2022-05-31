import React, {useEffect} from "react";
import { Page, Box, zmp, Title } from "zmp-framework/react";
import NavigationBar from "../components/NavigationBar";
import Categories from "../components/Categories";
import pc from "../static/icons/PC.svg";
import bed from "../static/icons/Bed.svg";
import store from "../store";

const HomePage = () => {
  const zmproute = zmp.views.main.router;
  const categoryList = [
    {title: "Thiết bị điện tử", icon: pc, navigateLink: "/electronic-list"},
    {title: "Đồ gia dụng và nội thất", icon: bed, navigateLink: "/house-item-list"}
  ];

  const handleViewCategory = (title) => {
    if (title === "Thiết bị điện tử") {
      useEffect(async () => {
        await store.dispatch("fetchElectronicItems");
      })
    }
    if (title === "Đồ gia dụng và nội thất") {
      useEffect(async () => {
        await store.dispatch("fetchHouseItems");
      })
    }
      zmproute.navigate("/posts-list")
    }

  return (
    <Page name="home" navbarLarge>
      <NavigationBar />
      <Box flex flexDirection="row" style={{ justifyContent: "center" }}>
        {categoryList.map((item, index) => (
          <CategoryIcon
            key={index}
            title={item.title}
            icon={item.icon}
            onClick={handleViewCategory(item.title)}
          />
        ))}
      </Box>

      <Categories />
    </Page>
  );
};

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
      <img src={icon} className="custom-icon"/>
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
