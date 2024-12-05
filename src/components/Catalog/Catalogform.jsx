import React, { useState } from 'react';
import { useAuth } from "../../utils/AuthContext"; 
import toast from "react-hot-toast";
import './Catalogform.css';

const Catalogform = () => {
  const { email } = useAuth(); 
  const [products, setProducts] = useState([]);
  const [bloomreachPayload, setBloomreachPayload] = useState(null);
  const [catalogId, setCatalogId] = useState(null); // New state to store catalog ID
  const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:5173';

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      const data = await response.json();
      setProducts(data);
      console.log('fake catalog data:', data);
      toast.success('Products fetched successfully!');
      const payload = convertToBloomreachPayload(data);
      setBloomreachPayload(payload);
      console.log('setBloomreachPayload:', payload);

      // Call create catalog endpoint
      const catalogResponse = await fetch(`${apiUrl}/create-catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (catalogResponse.ok) {
        const result = await catalogResponse.json();
        if (result.success) {
          toast.success('Catalog created successfully in Bloomreach!');
          setCatalogId(result.id); // Store the catalog ID
          console.log('Catalog creation result:', result);
        } else {
          toast.error('Error creating catalog in Bloomreach');
          console.error('Error creating catalog:', result);
        }
      } else {
        toast.error('Error creating catalog in Bloomreach');
        console.error('Error creating catalog:', catalogResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    }
  };

  const convertToBloomreachPayload = (products) => {
    const formattedProducts = products.map(product => ({
      name: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      rating: product.rating.rate,
      rating_count: product.rating.count
    }));

    return {
      name: "catalog_name",
      is_product_catalog: true,
      fields: [
        { name: "name", type: "string", searchable: true },
        { name: "description", type: "string", searchable: true },
        { name: "price", type: "number", searchable: true },
        { name: "category", type: "string", searchable: true },
        { name: "image", type: "string", searchable: false },
        { name: "rating", type: "number", searchable: true },
        { name: "rating_count", type: "number", searchable: true }
      ],
      items: formattedProducts
    };
  };

  return (
    <div className="content">
      <p>Current user: <strong>{email}</strong></p>
      <br />
      <button className="btn-primary" onClick={fetchProducts}>Generate catalog in Bloomreach</button>
      <br />
      <div>
        {products.length > 0 && (
          <ul>
            {products.map(product => (
              <li key={product.id}>{product.title} - ${product.price}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {catalogId && (
          <p>Catalog created with ID: <strong>{catalogId}</strong></p>
        )}
      </div>
    </div>
  );
};

export default Catalogform;
