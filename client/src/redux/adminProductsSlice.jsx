// src/features/admin/adminProductsSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../lib/api/api";

// Fetch all products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      let allProducts = [];
      let page = 1;
      let totalPages = 1;

      do {
        const response = await getProducts({ page });
        const data = response.data;

        // تنظيف كل الصور
        const sanitizedProducts = (data.products || []).map((product) => {
          if (product.images && Array.isArray(product.images)) {
            const cleanedImages = product.images.map((img) => {
              if (
                img &&
                typeof img.url === "string" &&
                img.url.includes("/api/products")
              ) {
                return { ...img, url: "https://via.placeholder.com/150" }; // placeholder أكبر
              }
              return img;
            });
            return { ...product, images: cleanedImages };
          }
          return product;
        });

        allProducts = allProducts.concat(sanitizedProducts);

        totalPages = data.pages || 1;
        page++;
      } while (page <= totalPages);

      return allProducts;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add product
export const addAdminProduct = createAsyncThunk(
  "adminProducts/add",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await createProduct(productData);
      return response.data; // full product object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Edit product
export const editAdminProduct = createAsyncThunk(
  "adminProducts/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateProduct(id, data);
      return response.data; // updated product
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete product
export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // دلوقتي array فعلًا
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit
      .addCase(editAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(editAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductsSlice.reducer;
