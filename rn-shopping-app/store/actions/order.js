import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
    
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-shopping-app-a0c84-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const respData = await response.json();
      const loadedOrders = [];

      for (const key in respData) {
        loadedOrders.push(
          new Order(
            key,
            respData[key].cartItems,
            respData[key].totalAmount,
            new Date(respData[key].date)
          )
        );
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      //send to custom analytic error
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-shopping-app-a0c84-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //firebase will generate the id
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    const respData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: respData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });

    //Better to do the below logic in the server side.
    for(const cartItem of cartItems){
      const pushToken = cartItem.productPushToken;

      fetch('https://exp.host/--/api/v2/push/send', {
        method:"POST",
        headers:{
          'Accept':'application/json',
          'Accept-Encoding':'gzip, deflate',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          to:pushToken,
          title: 'Order was placed!',
          body:cartItem.productTitle
        })
      })
    }
  };
};
