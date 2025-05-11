import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
const RankProduct = ({ number, product }) => {
  const [styleRank, setStyleRank] = useState("#FFAF45");
  const setStyleForProductRank = () => {
    switch (number) {
      case 1:
        setStyleRank("#FFAF45");
        break;
      case 2:
        setStyleRank("#FB6D48");
        break;
      case 3:
        setStyleRank("#D74B76");
        break;
      default:
        setStyleRank("#673F69");
    }
  };
  useEffect(() => {
    setStyleForProductRank();
  }, []);
  return (
    <Box sx={style.productContainer} style={{ backgroundColor: styleRank }}>
      <Box sx={style.productContainer.rankContainer}>
        <Box sx={style.productContainer.rankContainer.rank}>
          {number}
        </Box>
      </Box>
      <Box sx={style.productContainer.infoContainer}>
        <Tooltip title={product.name}>
          <Box sx={style.productContainer.infoContainer.productName}>
            {product.product_name}
          </Box>
        </Tooltip>
        <Box sx={style.productContainer.infoContainer.monthSale}>
          Doanh số tháng: {product.quantity} sản phẩm
        </Box>
      </Box>
    </Box>
  );
};
/**  @type {import("@mui/material").SxProps} */
const style = {
  productContainer: {
    display: "flex",
    maxHeight: "100px",
    backgroundColor: "#cd7f32",
    alignItems: "center",
    p: 2,
    m: 1,
    borderRadius: "16px",
    rankContainer: {
      height: "auto",
      width: "50px",
      minWidth: "50px",
      backgroundColor: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      rank: {
        width: "75%",
        height: "75%",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        fontWeight: "800",
        fontFamily: "monospace",
      },
    },
    infoContainer: {
      padding: " 0 20px",
      color: "white",
      width: "90%",
      productName: {
        fontSize: "1em",
        overflowX: "hidden",
        textWrap: "nowrap",
        textOverflow: "ellipsis",
      },
      monthSale: {
        fontSize: "0.9em",
      },
    },
  },
};
export default RankProduct;
