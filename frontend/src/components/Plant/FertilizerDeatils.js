import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

export default function ProductDetails({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const email = localStorage.getItem("email");
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Fetching product with ID:", id);
    fetch(`http://localhost:4009/api/fertilizers/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log("Product fetched successfully:", res);
        setProduct(res);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  function addToCart() {
    console.log("its working")
    const itemExist = cartItems.find((item) => item.product._id === product._id)

    if (!email) {
      toast.error("Please login to add items to the cart.");
      navigate('/login');
      return;
    }

    if (!itemExist) {
      const newItem = { product, qty };
      setCartItems((state) => [...state, newItem]);
      toast.success("Cart Item added succesfully!")
    } else {
      toast.error("Item already exists in the cart.");
    }
  }

  function increaseQty() {
    if (product.stock === qty) {
      return;
    }
    setQty((state) => state + 1);
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  }

  return product &&   
    <div style={{ margin: '27vh 20px 0vh 36vh', borderRadius: '20vh', width: '118vh', backgroundColor: '#e8d8cd' }}>
      <div className="container container-fluid details" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div className="col-12 col-lg-5 img-fluid" id="product_image" style={{ width: '40%' ,Radius: '7vh'}}>
          <img src={product.image.url} alt="Product" style={{ height: '40vh', maxWidth: '40vh',backgroundBoder:'2vh', borderRadius: '10vh'}} />
        </div>
        <div className="col-12 col-lg-5 mt-5 dish-box" style={{ width: '50%' }}>
          <h3>{product.name}</h3>
          <p id="product_id">Product #{product._id}</p>

          <hr />

          <div className="rating-outer">
            <div className="rating-inner" style={{width : `${product.ratings/5 * 100}%`}}></div>
          </div>
          <span id ="no_of_reviews">({product.numOfReviews} Reviews)</span>

          <hr />

          <p id="product_price">{product.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

            <input type="number" className="form-control count d-inline" value={qty} readOnly />

            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
          </div>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>
          <hr />
          <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

          <button 
            type="button" 
            onClick={addToCart} 
            disabled={product.stock === 0}
            id="cart_btn" 
            className="btn btn-primary d-inline ml-4" style={{background:'brown'}}>Add to Cart</button>
          <ToastContainer />
        </div>
      </div>
    </div>;
}

