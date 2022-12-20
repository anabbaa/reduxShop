import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/CartActions';



let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data!',
  //       })
  //     );
  //     const response = await fetch(
  //       'https://react-http-6b4a6.firebaseio.com/cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Sending cart data failed.');
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Sent cart data successfully!',
  //       })
  //     );
  //   };
    /* this only to be sure not sending when initalizoing appjs and define the variable before
    app function true then return if it is true before sending data and change its value
    to false so it will happen once */

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error!',
  //         message: 'Sending cart data failed!',
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  // action creator solution

  /*with this code we have another issue is that when we fetch data we canged and when cart
  changed the useEfeect of sending data trigger again 
  - solution add variaböe false to initial value change them to true so replacecart
  method will still false then in app if only varaible is true we will senddata
  the we will face a small issue we will send this variable with false to data base 
  the solution is the function of sending data i will send object with items and total quantity
  - another assue is that when i fetch data and database is empty it will crash my app because
  it will be define the solution either some data or empty array  in replacement method
  */

  useEffect(()=>{
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed){
      dispatch(sendCartData(cart));
    }}, [cart, dispatch]);

    

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;