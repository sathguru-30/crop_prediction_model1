import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    pH_Value: '',
    Rainfall: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:5000/predict', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
      setResult(response.data);  
    })
    .catch(error => {
      console.error('Error making prediction:', error.response ? error.response.data : error.message);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nitrogen (N):
        <input type="number" name="Nitrogen" value={formData.Nitrogen} onChange={handleChange} required />
      </label><br /><br />
      <label>
        Phosphorus (P):
        <input type="number" name="Phosphorus" value={formData.Phosphorus} onChange={handleChange} required />
      </label><br /><br />
      <label>
        Potassium (K):
        <input type="number" name="Potassium" value={formData.Potassium} onChange={handleChange} required />
      </label><br /><br />
      <label>
        Temperature:
        <input type="number" name="Temperature" value={formData.Temperature} onChange={handleChange} required />
      </label><br /><br />
      <label>
        Humidity:
        <input type="number" name="Humidity" value={formData.Humidity} onChange={handleChange} required />
      </label><br /><br />
      <label>
        pH Value:
        <input type="number" name="pH_Value" value={formData.pH_Value} onChange={handleChange} required />
      </label><br /><br />
      <label>
        Rainfall:
        <input type="number" name="Rainfall" value={formData.Rainfall} onChange={handleChange} required />
      </label><br /><br />
      <button type="submit">Predict</button>

      
      {result && <p>Predicted Crop: {result.crop}</p>}
    </form>
  );
}

export default Form;
