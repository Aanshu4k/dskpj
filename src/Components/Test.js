import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gstNumber: '',
    panNumber: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    gstNumber: '',
    panNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, gstNumber, panNumber } = formData;
    const newErrors = {
      name: '',
      gstNumber: '',
      panNumber: '',
    };

    const nameRegex = /^[A-Za-z\s]+$/;
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

    let isValid = true;

    if (!nameRegex.test(name)) {
      newErrors.name = 'Name is invalid';
      isValid = false;
    }

    if (!gstRegex.test(gstNumber)) {
      newErrors.gstNumber = 'GST number is invalid';
      isValid = false;
    }

    if (!panRegex.test(panNumber)) {
      newErrors.panNumber = 'PAN number is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, submit the data
      console.log('Form is valid. Submitting data:', formData);
    } else {
      // Form is not valid, show error messages
      console.log('Form is not valid. Please fix errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <span className="error">{errors.name}</span>
      </div>

      <div>
        <label>GST Number:</label>
        <input
          type="text"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
        />
        <span className="error">{errors.gstNumber}</span>
      </div>

      <div>
        <label>PAN Number:</label>
        <input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
        />
        <span className="error">{errors.panNumber}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
