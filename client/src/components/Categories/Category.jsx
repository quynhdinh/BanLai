import React from "react";
import {
    Page,
    Card,
    SkeletonImage,
    SkeletonText,
    Icon,
    Text,
    Box,
} from "zmp-framework/react";

const Category = ({product}) => {
    return (
        <Card style={{padding: 0}}>
            <Box
                flex
                flexDirection="row"
                p={2}
                m={0}
                style={{
                    position: "relative",
                    height: "120px",
                    border: "0.5px solid black",
                    borderRadius: "8px",
                }}
            >
                <Box
                    width={102}
                    height={102}
                    m={0}
                    p={0}
                    flex
                    justifyContent="center"
                    alignContent="center"
                    style={{position: "relative"}}
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        style={{
                            objectFit: "cover",
                            width: 102,
                            height: 102,
                            borderRadius: 4,
                        }}
                    />
                    <Box
                        px={1}
                        m={0}
                        flex
                        alignItems="center"
                        style={{
                            position: "absolute",
                            background: "rgba(0, 0, 0, 0.5)",
                            width: "fit-content",
                            height: 20,
                            top: 4,
                            left: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Icon zmp="zi-photo" size={16} style={{color: "#ffffff"}}/>
                        <Text
                            size="xxxsmall"
                            style={{color: "#ffffff", marginBottom: 0, marginLeft: 2}}
                        >
                            4
                        </Text>
                    </Box>
                </Box>
                <Box style={{flex: 1}} my={0}>
                    <Box p={0} m={0} style={{height: 48}}>
                        <Text
                            size="xsmall"
                            style={{
                                marginRight: 16,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            Laptop Apple MacBook Pro M1 2020 8GB/512GB (MYD92SA/A)
                        </Text>
                    </Box>

                    <Text style={{color: "rgba(239, 78, 73, 1)", fontWeight: 700}}>
                        20.000.000đ
                    </Text>
                    <Box
                        p={1}
                        m={0}
                        style={{
                            background: "#E4E8EC",
                            borderRadius: 2,
                            width: "fit-content",
                        }}
                    >
                        <Text size="xxxsmall" style={{marginBottom: 0}}>
                            Tan Binh, Ho Chi Minh
                        </Text>
                    </Box>
                </Box>
                <Box m={0} style={{position: "absolute", right: 8, top: 8}}>
                    <Icon
                        className="demo-icon "
                        zmp="zi-heart"
                        size={20}/>
                </Box>
                <Box m={0} style={{position: "absolute", right: 8, bottom: 16}}>
                    <Text size="xxxsmall" style={{marginBottom: 0}}>
                        1 tháng trước
                    </Text>
                </Box>
            </Box>
        </Card>
    );
};
export default Category;
