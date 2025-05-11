import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IP } from "../../config/const";
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("authorization"))
  return user
}
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    variations: [],
    currentSetCategory: {
      id: "",
      name: "",
      description: "",
      totalItem: 0
    },
    currentSetVariation: {
      id: null,
      name: "",
      nameVie: "",
    }
  },
  reducers: {
    resetAlert: (state, action) => {
      state.alert = action.payload
    },
    getVariationById: (state, action) => {
      if (action.payload.id === null) {
        state.currentSetVariation = {
          id: null,
          name: "",
          nameVie: "",
        }
        return
      }
      const categories = current(state.categories)
      const category = categories.find((item) => item.id === action.payload.category)
      // state.currentSetVariation =
      const variation = category.variations.find((item) => item.id === action.payload.id)
      state.currentSetVariation = variation
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        console.log(action.payload)
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.currentSetCategory = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.alert = action.payload;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.newCategory.id) {
            return action.payload.newCategory;
          }
          return category;
        });
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.alert = action.payload.data;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
      })
      .addCase(getVariationByCategory.fulfilled, (state, action) => {
        const data = action.payload
        let variationsObjArr = []
        variationsObjArr = data.map((item)=>{
            return {
                id: item.id,
                variationOptionValue:""
            }
        })
        state.variations = variationsObjArr
      })
      .addCase(addVariation.fulfilled, (state, action) => {
        const data = action.payload
        state.alert = data.alert
        let categoriesList = current(state.categories)
        categoriesList = categoriesList.map((category) => {
          if (category.id === data.categoryId) {
            if (category.variations === null) {
              let tmpArray = []
              tmpArray.push(data.variation)
              category = { ...category, variations: tmpArray }
            }
            else {
              let tmpArray = [...category.variations]
              tmpArray.push(data.variation)
              category = { ...category, variations: tmpArray }
            }
            return category
          }
          return category
        })
        state.categories = categoriesList
      })
      .addCase(editVariation.fulfilled, (state, action) => {
        const data = action.payload
        state.alert = data.alert
        let categoriesList = current(state.categories)
        categoriesList = categoriesList.map((category) => {
          if (category.id === data.categoryId) {
            let tmpArray = [...category.variations]
            tmpArray = tmpArray.map((item) => {
              if (item.id === data.variation.id) return data.variation
              return item
            })
            category = { ...category, variations: tmpArray }
            return category
          }
          return category
        })
        state.categories = categoriesList
      })
      .addCase(removeVariation.fulfilled, (state, action) => {
        const data = action.payload
        state.alert = data.alert
        let categoriesList = current(state.categories)
        let tmpCategoriesList = categoriesList.map((category) => {
          if (category.id === data.categoryId) {
            let tmpArr = [...category.variations]
            tmpArr = tmpArr.filter((item) => item.id !== data.variationId)
            category = { ...category, variations: tmpArr }
            return category
          }
          return category
        })
        state.categories = tmpCategoriesList
      })
  },
});

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const token = getUser().token
    const res = await fetch(IP + "/customer/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
);
export const getCategoryById = createAsyncThunk(
  "users/getCategoryById",
  async (id) => {
    const token = getUser().token
    if (id === -1)
      return {
        id: "",
        name: "",
        description: ""
      };
    const res = await fetch(IP + `/admin/api/category?id=` + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.message;
  }
);
export const addCategory = createAsyncThunk(
  "user/addCategory",
  async (newCategory) => {
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    };
    const res = await fetch(IP + `/admin/api/category`, options);
    const data = await res.json();
    return data;
  }
);
export const editCategory = createAsyncThunk(
  "user/editCategory",
  async (newCategory) => {
    const token = getUser().token
    const options = {
      method: "PUT",
      body: JSON.stringify(newCategory),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(IP + `/admin/api/category`, options);
    const data = await res.json();
    return {
      newCategory: newCategory,
      data: data,
    };
  }
);
export const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async (id) => {
    const token = getUser().token
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(IP + `/admin/api/category?id=` + id, options);
    const data = await res.json();
    return {
      id: id,
      data: data,
    };
  }
);
export const getVariationByCategory = createAsyncThunk(
  "category/getVariationByCategory",
  async (category) => {
    if(category===null) return []
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
export const addVariation = createAsyncThunk(
  "category/addVariation",
  async (newVariation) => {
    const token = getUser().token
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVariation.variation),
    };
    const res = await fetch(IP + `/admin/api/variation?categoryId=${newVariation.categoryId}`, options);
    const data = await res.json();
    return {
      alert: {
        code: data.code,
        message: data.message
      },
      variation: data.variation,
      categoryId: newVariation.categoryId
    };
  }
)
export const editVariation = createAsyncThunk(
  "category/editVariation",
  async (newVariation) => {
    const token = getUser().token
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVariation.variation),
    };
    const res = await fetch(IP + `/admin/api/variation?categoryId=${newVariation.categoryId}`, options);
    const data = await res.json();
    return {
      alert: {
        code: data.code,
        message: data.message
      },
      variation: data.variation,
      categoryId: newVariation.categoryId
    };
  }
)
export const removeVariation = createAsyncThunk(
  "category/removeVariation",
  async ({ variationId, category }) => {
    const token = getUser().token
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };
    const res = await fetch(IP + `/admin/api/variation?variationId=${variationId}`, options);
    const data = await res.json();
    return {
      alert: {
        code: data.code,
        message: data.message
      },
      variationId: variationId,
      categoryId: category
    };
  }
)
export default categorySlice;
