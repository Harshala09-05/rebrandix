import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to create a product with file upload support
export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      // Extract values from formData for verification fields
      const isoFound = formData.get("isoFound");
      const certificateNumber = formData.get("certificateNumber");
      const issuer = formData.get("issuer");
      const trustScore = formData.get("trustScore");
      const finalVerdict = formData.get("finalVerdict");

      const operations = {
        query: `
          mutation CreateProduct(
            $name: String!,
            $description: String!,
            $categoryId: Int!,
            $productImage: Upload,
            $isoCertificate: Upload,
            $isoFound: Boolean,
            $certificateNumber: Int,
            $issuer: String,
            $trustScore: Int,
            $finalVerdict: String
          ) {
            createProduct(
              name: $name,
              description: $description,
              categoryId: $categoryId,
              productImage: $productImage,
              isoCertificate: $isoCertificate,
              isoFound: $isoFound,
              certificateNumber: $certificateNumber,
              issuer: $issuer,
              trustScore: $trustScore,
              finalVerdict: $finalVerdict
            ) {
              product {
                id
                name
                description
                category {
                  id
                  name
                }
                isoFound
                certificateNumber
                issuer
                trustScore
                finalVerdict
                isoCertificate
                productImage
              }
            }
          }
        `,
        variables: {
          name: formData.get("name"),
          description: formData.get("description"),
          categoryId: parseInt(formData.get("categoryId")),
          productImage: null,
          isoCertificate: null,
          isoFound: isoFound === "true",
          certificateNumber: certificateNumber ? parseInt(certificateNumber) : 0,
          issuer: issuer || "",
          trustScore: trustScore ? parseInt(trustScore) : 0,
          finalVerdict: finalVerdict || ""
        },
      };

      // Create a new FormData for the actual API request
      const apiFormData = new FormData();
      
      // Add operations to the FormData
      apiFormData.append("operations", JSON.stringify(operations));
      
      // Prepare map for file variables
      const map = {};
      let fileIndex = 0;
      
      // Handle product image
      if (formData.get("productImage")) {
        map[fileIndex.toString()] = ["variables.productImage"];
        apiFormData.append(fileIndex.toString(), formData.get("productImage"));
        fileIndex++;
      }
      
      // Handle ISO certificate
      if (formData.get("isoCertificate")) {
        map[fileIndex.toString()] = ["variables.isoCertificate"];
        apiFormData.append(fileIndex.toString(), formData.get("isoCertificate"));
      }
      
      // Add map to the FormData
      apiFormData.append("map", JSON.stringify(map));

      // Log to debug
      console.log("Creating product with operations:", operations);
      console.log("File map:", map);
      
      // Make the API request
      const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: apiFormData,
      });

      const result = await response.json();
      
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        return rejectWithValue(result.errors[0].message);
      }
      
      return result.data.createProduct.product;
    } catch (error) {
      console.error("Error in createProduct:", error);
      return rejectWithValue(error.message || "Failed to create product");
    }
  }
);

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchAll", 
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(import.meta.env.VITE_GRAPHQL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          query: `
            {
              allProducts {
                id
                name
                description
                category {
                  id
                  name
                }
                isoFound
                certificateNumber
                issuer
                trustScore
                finalVerdict
                isoCertificate
                productImage
              }
            }
          `,
        }),
      });
      
      const data = await res.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        return rejectWithValue(data.errors[0].message);
      }

      return data.data.allProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearProductMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Product created successfully!";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create product";
      })

      // FETCH
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export const { clearProductMessage } = productSlice.actions;
export default productSlice.reducer;