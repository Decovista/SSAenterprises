import React, { useEffect, useState } from 'react';
import './Navigation.css';
import { useMyContext } from '../../Context/MyContext';
import asstes from '../../assets/asstes';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import axios from 'axios';

function Navigation() {
  const navigate = useNavigate();
  const {
    toggleCart,
    setToggleCart,
    setPopCart,
    productsData,
    toggleMSearch,
    setToggleMSearch,
    toggleLogin,
    setToggleLogin,
    cartItems,
    setCartItems, // add this from context
  } = useMyContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState(null);

  // Fetch cart from backend when user logs in or Navigation mounts
  useEffect(() => {
    const fetchCartFromBackend = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartItems([]);
        setToggleCart(0);
        return;
      }
      try {
        const res = await axios.get(`https://ssa-backend-y3ne.onrender.com/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.items) {
          const formattedItems = res.data.items.map(item => ({
            id: item.productId,
            name: item.productname,
            price: item.price,
            qty: item.quantity,
            img: item.img || '/fallback.jpg',
          }));
          setCartItems(formattedItems);
          setToggleCart(formattedItems.reduce((acc, i) => acc + i.qty, 0));
        } else {
          setCartItems([]);
          setToggleCart(0);
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setCartItems([]);
        setToggleCart(0);
      }
    };

    fetchCartFromBackend();
  }, [toggleLogin, setCartItems, setToggleCart]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('username');

    if (token && storedName) {
      setUsername(storedName);
    } else {
      setUsername(null);
    }
  }, [toggleLogin]);

  // Remove this effect, because cartItems is now synced from backend on mount and on toggleLogin
  // useEffect(() => {
  //   setToggleCart(cartItems.length);
  // }, [cartItems, setToggleCart]);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const filteredProducts = productsData.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    navigate('/search', { state: { results: filteredProducts, query } });
    setSearchQuery('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    setUsername(null);
    alert('Logged out successfully');
    setToggleLogin(false);
    setCartItems([]);   // clear cart on logout
    setToggleCart(0);
    navigate('/');
  };

  return (
    <div className='Navigation'>
      <div className='Nav-wrapper'>
        <div className='Nav-logo'>
          <Link to='/'>
            <img className='mainSiteLogo' src={asstes.mainSiteLogo} alt='mainSiteLogo' />
          </Link>
        </div>
         
        <i
          className={`fa-solid fa-xmark ${toggleMSearch ? 'toggle' : ''}`}
          onClick={() => setToggleMSearch(false)}
        ></i>

        <div className={`search-feild ${toggleMSearch ? 'mobile-header' : ''}`}>
          <input
            type='text'
            placeholder='Enter your Query'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className='login-btn-con'>
          <i className='fa-solid fa-magnifying-glass' onClick={() => setToggleMSearch(true)}></i>
           <Link to='/products'><p className='product-btn'>Product</p></Link>
          {username ? (
            <div className='user-greeting'>
              <span>Hi, {username}</span>
              <button className='logout-btn' onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className='login-btn' onClick={() => setToggleLogin(true)}>
              Login
            </button>
          )}

          {toggleLogin && <Login />}

          <Link to='/AddTo'>
            <i
              className='fa-solid fa-cart-plus'
              data-count={toggleCart}
              onClick={() => setPopCart(true)}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
