import React, { useState } from 'react';
import { useAuth } from "../../utils/AuthContext"; 
import toast from "react-hot-toast";
import './Methodsform.css';

const Methodsform = () => {
  const { email } = useAuth(); 
  const [method, setMethod] = useState('');
  const [products, setProducts] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      eval(method.trim());
      console.log(method.trim());
      toast.success('Method submitted!');
    } catch (error) {
      console.error('Error executing method:', error);
      toast.error('Error executing method');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      console.log(data);
      toast.success('Products fetched successfully!');
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    }
  };

  return (
    <div className="content">
      <div className="two-column-layout">
        <div className="left-column">
          Current user: <strong>{email}</strong>
          <br />
          <p>Example methods: </p>
          <br />
          <pre>
{`exponea.track('purchase', {
purchase_status: 'success',
product_list: [
{ product_id: "abc123", quantity: 2 },
{ product_id: "abc456", quantity: 1 }
],
total_price: 7.99,
payment_type: 'credit_card'
});

exponea.update({
email: 'gordon.freeman@blackmesa.com',
first_name: 'Gordon',
last_name: 'Freeman',
company: 'Blackmesa'
});`

}
        </pre>
        <br />
        <a href ='https://documentation.bloomreach.com/engagement/docs/tracking' target="_new">https://documentation.bloomreach.com/engagement/docs/tracking</a>
        </div>
        <div className="right-column">
          <form onSubmit={handleSubmit} id="form">
            <label htmlFor="method">Enter SDK method:</label>
            <br />
            <textarea
              id="method"
              name="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="event-textarea"
              placeholder="Enter SDK method"
              required
            />
            <button className="btn-primary" type="submit">Submit</button>
          </form>
          <button className="btn-secondary" onClick={fetchProducts}>Fetch Products</button>
          <div>
            {products.length > 0 && (
              <ul>
                {products.map(product => (
                  <li key={product.id}>{product.title} - ${product.price}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Methodsform;
