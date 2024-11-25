import React, { useState, useEffect } from 'react';
import { useAuth } from "../../utils/AuthContext"; 
import './Subscriptionform.css';

const Subscriptionform = () => {
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchConsents = async () => {
      try {
        const response = await fetch('/api/get-consents');
        const data = await response.json();
        setEmail(data.email);
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching consents:', error);
      }
    };

    fetchConsents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('/api/update-consents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories }),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error updating consents:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, valid: !category.valid } : category
      )
    );
  };

  const unsubscribeAll = () => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({ ...category, valid: false }))
    );
  };

  return (
    <div className="content">
      <h1>Subscription preferences</h1>
      {isSubmitted && <div className="success">Settings saved!</div>}
      <div className="email-block">
        <div className="email-block-title">
          Email Subscriptions for <strong>${email}</strong>
        </div>
        <div className="email-block-subtitle">
          Here you can change your email sending preferences.
        </div>
      </div>
      <form onSubmit={handleSubmit} id="form">
        <div className="checkboxes">
          {categories.map((category) => (
            <div key={category.id}>
              <hr />
              <label>
                <input
                  type="checkbox"
                  checked={category.valid}
                  onChange={() => handleCheckboxChange(category.id)}
                />
                <span className="checkbox-title">{category.name}</span>
                {category.description && (
                  <span className="checkbox-subtitle">{category.description}</span>
                )}
              </label>
            </div>
          ))}
        </div>
        <hr />
        <button type="submit">Change subscriptions</button>
        <button type="button" onClick={unsubscribeAll}>
          Unsubscribe from all
        </button>
      </form>
    </div>
  );
};

export default Subscriptionform;