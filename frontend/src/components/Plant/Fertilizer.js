import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4009/api/fertilizers/`
        );
        const data = await response.json();
        setProducts(data); // Assuming data is an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <section className="products container" id="products" style={{ marginTop:'10vh'}}>
        <h1 className='justy-content-center' style={{ paddingLeft:'35vh'}}>Green Garden Enhancers <hr /></h1>
        <div className="row" style={{ borderRadius: '10px', border: '2px solid brown' }}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

// Define ProductCard component outside of AllProducts component
function ProductCard({ product }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-3">
      <div className="product_content">
        <div className="product_box" >
          {/* <img className="card-img-top mx-auto" src={product.image.url} alt={product.name} /> */}
          {product.image && (
                        <img src={product.image.url} className="card-img-top mx-auto" alt={product.name} />
                      )}
          <div className="">
            <h5 className="card-title">
              
            </h5>
            <p className="card-text"> {product.name}</p>
            <p className="card-text">Rs. {product.price}</p>
            <div className='organic' style={{ textAlign: "center" }}>
              <Link to={"/viewdetails/"+product._id} id="view_btn" className="brown-button" style={{ backgroundColor: "brown", color: "white", padding: "8px 18px", borderRadius: "8px", textDecoration: "none" }}>View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;


