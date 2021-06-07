import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
      const userId = getState().auth.userId;
    //any async code you want! Redux thunk will take care about this
    try {
      const response = await fetch(
        `https://rn-shopping-app-a0c84-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const respData = await response.json();
      const loadedProducts = [];

      for (const key in respData) {
        loadedProducts.push(
          new Product(
            key,
            respData[key].ownerId,
            respData[key].title,
            respData[key].imageUrl,
            respData[key].description,
            respData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter(prod => prod.ownerId === userId) });
    } catch (err) {
      //send to custom analytic error
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shopping-app-a0c84-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //any async code you want! Redux thunk will take care about this
    const response = await fetch(
      `https://rn-shopping-app-a0c84-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //firebase will generate the id
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        }),
      }
    );

    const respData = await response.json();
    console.log(respData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: respData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
      const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shopping-app-a0c84-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        //firebase will generate the id
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
