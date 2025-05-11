import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
import { notify } from "../../components/Admin/notify";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const productSlice = createSlice({
  name: "product",
  initialState: {
    fullProducts: [],
    products: [],
    laptop: [],
    phone: [],
    accessory: [],
    brand: [],
    variations: [],
    variationsObjArr: [],
    currentSetProduct: {
      productId: -1,
      category: {
        id: 1,
        variations: []
      },
      product: {
        id: -1,
        name: "",
        images: []
      }
    },
    currentSetProductDetails: {
      "id": -1,
      "color": "",
      "isAvailable": "",
      "soldNumber": "",
      "price": "",
      "quantity": "",
      "screenSize": "",
      "diskSize": "",
      "ram": ""
    }
  },
  reducers: {
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
    changeVariationArr: (state, action) => {
      const tmp = action.payload
      let tmpArr = current(state.variationsObjArr)
      let arr = []
      arr = tmpArr.map((item) => {
        if (item.id == tmp.id) return tmp
        else return item
      })
      state.variationsObjArr = arr
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.brand = action.payload
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        if (action.payload.key === "") {
          state.fullProducts = action.payload.data
        }
        state.products = action.payload.data;
        state.laptop = action.payload.data.filter(item => item.category.id == 1)
        state.phone = action.payload.data.filter(item => item.category.id == 2)
        state.accessory = action.payload.data.filter(item => item.category.id == 3)

      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.currentSetProduct = action.payload;
        console.log(action.payload)
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.alert = {
          "code": action.payload.code,
          "message": action.payload.message
        };
        console.log(action.payload)
        // state.products.push(action.payload.product)
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.alert = action.payload.alert;
        const products = current(state.products)
        console.log(action.payload)
        state.products = products.map((product) => {
          if (product.productId === action.payload.newProduct.productId) {
            return action.payload.newProduct;
          }
          return product;
        });
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(getProductDetailsById.fulfilled, (state, action) => {
        state.currentSetProductDetails = action.payload
        console.log(action.payload)
      })
      .addCase(addProductDetails.fulfilled, (state, action) => {
        state.alert = {
          code: action.payload.data.code,
          message: action.payload.data.message
        }
        const id = action.payload.id
        state.products.map((product) => {
          if (product.productId === id) {
            product.itemDetails.push(action.payload.data.itemDetail)
          }
        })
      })
      .addCase(editProductDetails.fulfilled, (state, action) => {
        state.alert = action.payload.data
        const productId = action.payload.productId
        console.log(current(state.products))
        console.log(action.payload.newProductDetail)
        state.products = state.products.map((product) => {
          if (product.productId === productId) {
            product.itemDetails = product.itemDetails.map((item) => {
              if (item.at(-1).productItemId == action.payload.newProductDetail.at(-1).productItemId) {
                return action.payload.newProductDetail;
              }
              return item;
            });
          }
          return product;
        });
      })
      .addCase(deleteProductDetails.fulfilled, (state, action) => {
        state.alert = action.payload.data
        // notify(action.payload.data)
        const productId = action.payload.productId
        const id = action.payload.id
        state.products = state.products.map((product) => {
          if (product.productId === productId) {
            product.itemDetails = product.itemDetails.filter((item) => item.at(-1).productItemId !== id);
          }
          return product;
        });
      })
      .addCase(getVariationByCategory.fulfilled, (state, action) => {
        const data = action.payload
        let variationsObjArr = data.map((item) => {
          return {
            id: item.id,
            variationOptionValue: ""
          }
        })
        state.variations = data
        state.variationsObjArr = variationsObjArr
      })
  },
});

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ brandId, categoryId, key }) => {
    const res = await fetch(IP + `/customer/api/items?brandId=${brandId}&categoryId=${categoryId}&key=${key}`);
    const data = await res.json();
    console.log(data)
    return {
      key: key,
      data: data,
    };
  }
);
export const getProductById = createAsyncThunk(
  "product/getProdcutById",
  async (id) => {
    const empty =
    {
      productId: -1,
      category: {
        id: 1,
        variations: []
      },
      product: {
        id: -1,
        name: "",
        images: []
      }
    }
    if (id === -1)
      return empty

    const res = await fetch(IP + `/customer/api/item?productId=` + id);
    const data = await res.json();
    return data;
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ newProduct, brandId }) => {

    console.log(newProduct)
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    };
    const res = await fetch(IP + `/admin/api/item?brandId=${brandId}`, options);
    const data = await res.json();
    return data;
  }
);
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ newProduct, brand }) => {
    console.log(newProduct)
    const token = getUser().token
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    };
    const res = await fetch(IP + `/admin/api/item?brandId=${brand}`, options);
    const data = await res.json();
    console.log(data)
    return {
      newProduct: newProduct,
      alert: data
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const token = getUser().token
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/admin/api/item?id=` + id, options);
    const data = await res.json();
    return {
      id: id,
      data: data,
    };
  }
);
export const getProductDetailsById = createAsyncThunk(
  "product/getProductDetailsById",
  async (id) => {
    const token = getUser().token
    if (id === -1)
      return {
        "id": null,
        "color": "",
        "isAvailable": "",
        "soldNumber": "",
        "price": "",
        "quantity": "",
        "screenSize": "",
        "diskSize": "",
        "ram": ""
      };
    const res = await fetch(IP + `/admin/api/item/detail?id=` + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
);
export const addProductDetails = createAsyncThunk(
  "product/addProductDetails",
  async ({ variationsOption, productId }) => {
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variationsOption),
    };
    const res = await fetch(IP + `/admin/api/item/detail?productId=${productId}`, options);
    const data = await res.json();
    return {
      id: productId,
      data: data
    };
  }
);
export const editProductDetails = createAsyncThunk(
  "product/editProductDetails",
  async ({ newProductDetails, productId }) => {
    const token = getUser().token
    const noChange = [...newProductDetails.variationOptions]
    const productItemId = newProductDetails.variationOptions.pop().productItemId
    let fetchDataArr = newProductDetails.variationOptions.map((item) => {
      return {
        id: item.id_variation_option,
        value: item.value
      }
    })
    newProductDetails.variationOptions = fetchDataArr
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductDetails),
    };
    const res = await fetch(IP + `/admin/api/item/detail?productItemId=${productItemId}`, options);
    const data = await res.json();
    console.log(noChange.variationOptions)
    return {
      productId: productId,
      newProductDetail: noChange,
      data: data
    }
  }
);
export const deleteProductDetails = createAsyncThunk(
  "product/deleteProductDetails",
  async ({ productId, productItemId }) => {
    const token = getUser().token
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/admin/api/item/detail?productItemId=${productItemId}`, options);
    const data = await res.json();

    return {
      productId: productId,
      id: productItemId,
      data: data,
    };
  }
);
export const fetchBrand = createAsyncThunk("/product/fetchBrand", async () => {
  const token = getUser().token
  const res = await fetch(IP + "/customer/api/brands", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  const data = await res.json()
  return data
})
export const getVariationByCategory = createAsyncThunk(
  "product/getVariationByCategory",
  async (category) => {
    const token = getUser().token
    const res = await fetch(IP + `/admin/api/variations?categoryId=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
)
export default productSlice;
