import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import './MyAccount.css';

const MyAccount = () => {
  const { isLogin } = useContext(MyContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [profile, setProfile] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    if (isLogin) {
      fetchOrderHistory();
      fetchWishlistItems();
      setProfile(localStorage.getItem('userImage'));
      let storedEmail = localStorage.getItem('user');

      // Split the email into local and domain parts
      const atIndex = storedEmail.indexOf('@');
      if (atIndex !== -1) {
        const localPart = storedEmail.slice(0, atIndex); // part before @
        const domainPart = storedEmail.slice(atIndex + 1); // part after @

        // Replace underscores with dots only in the domain part
        const normalizedDomainPart = domainPart.replace(/_/g, '.');

        // Combine local and normalized domain parts
        storedEmail = `${localPart}@${normalizedDomainPart}`;
      }

      setUserDetails({
        email: storedEmail,
      });
    

    }
  }, [isLogin]);

  const fetchOrderHistory = async () => {
    try {
      const ordersRef = doc(db, 'orders', localStorage.getItem('uid'));
      const ordersCollectionRef = collection(ordersRef, 'orderDetails');
      const querySnapshot = await getDocs(ordersCollectionRef);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrderHistory(orders);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const wishlistRef = doc(db, 'wishlists', localStorage.getItem('uid'));
      const productsCollectionRef = collection(wishlistRef, 'products');
      const querySnapshot = await getDocs(productsCollectionRef);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setWishlistItems(products);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  if (!isLogin) {
    return (
      <div className="my-account">
        <h2>Please <Link to="/signIn">Sign In</Link> to view your account.</h2>
      </div>
    );
  }

  return (
    <div className="my-account">
      <h2 id='title'>My Account</h2>
      <div className="profile-section">
        <h3>Profile</h3>
        <img src={profile || 'https://cdn-icons-png.flaticon.com/512/5323/5323352.png'} alt="Profile" />
        <div className="profile-details">

          <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
      </div>
      <div className="order-history">
        <h3>Order History</h3>
        {orderHistory.length === 0 ? (
          <p className="no-data">No orders found.</p>
        ) : (
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>
                <Link to={`/order/${order.id}`}>Order #{order.id}</Link>
                <p>Order Date: {order.date}</p>
                {/* Add more order details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="wishlist">
        <h3>Wishlist</h3>
        {wishlistItems.length === 0 ? (
          <p className="no-data">No items in wishlist.</p>
        ) : (
          <ul>
            {wishlistItems.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`}>{item.productName}</Link>
                {/* Add more wishlist details as needed */}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default MyAccount;
