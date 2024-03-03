import React,{ useState, useEffect } from 'react';
import { WholesalerNavbar } from '../../Navbar/navbar'
import { RiDeleteBin6Fill } from "react-icons/ri"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./Mycart.css"
import Swal from 'sweetalert2';

const MyCart = () => {
  const [Dproducts, setDproducts] = useState([]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'middle',
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 2000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    const fetchDproducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/addToCart/cartdisplay');
        console.log('Request URL:', response.config.url); // Log the URL
        setDproducts(response.data);
      } catch (error) {
        console.error('Error fetching login data:', error);
      }
    };

    fetchDproducts();
  }, []);
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/addToCart/deletecart/${itemId}`);
      // Update cart items after deletion
      setDproducts(prevCartItems => prevCartItems.filter(item => item._id !== itemId));
      // Show notification
      Toast.fire({
        icon: 'success',
        title: 'Product Deleted !'
      })

      setTimeout(
        function() {
          document.location.href="/addtocart"
        },
        1500
    );
      // Optionally, you can update the UI to reflect the removal of the product
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };


  return (
    <>
    <div className="position-fixed w-100" style={{zIndex:"100000"}}>
    <WholesalerNavbar/>
    </div>
    <br/>
    <br/>
    <br/>
    <div className="cart-table-container">
    <h2><center>My Cart</center></h2>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Dproducts.map((item) => (
          <tr key={item._id}>
            <td><img src={item.Pimage} alt={item.productName} /></td>
            <td>{item. productName}</td>
            <td> {item. quantity}KG</td>
            <td> ₹{item.calculatedPrice}</td>
            <td><button>Buy Now</button></td>
            <td><button onClick={() => handleDelete(item._id)}><RiDeleteBin6Fill /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
  );
};

export default MyCart;
