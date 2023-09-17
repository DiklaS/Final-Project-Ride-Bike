import React, { useState } from 'react';
import {TextField, Container} from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import Joi from 'joi';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    message: Joi.string().required().min(5).max(1000),
  });

    const validation = schema.validate(formData, { abortEarly: false });

    if (!validation.error) {
      try {
        const response = await axios.post('/users/sendEmail', formData);

        if (response.status === 200) {
          alert('Email sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        } else {
          alert(`Error: ${response.data.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Joi validation errors
      const newErrors = {};
      validation.error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
       
      });
       const errorMessages = Object.values(newErrors).join('\n');
      setFormErrors(newErrors);
      alert(errorMessages);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField sx={{marginY: 2}}
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button sx={{marginY: 2}}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formData.name || !formData.email || !formData.message}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ContactPage;
