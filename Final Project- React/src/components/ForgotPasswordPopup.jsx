import { useState } from "react";
import axios from "axios";
import {Container, Typography, Button, TextField} from "@mui/material";
import { toast } from "react-toastify";

const ForgotPasswordPopup = () => {
  const [email, setEmail] = useState(""); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`/users/password/${email}`);
      if (response.status === 200) {
        console.log('Password reset email sent successfully');
        toast.info("Password reset email sent successfully.");
      } else {
        console.error('Password reset request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.error);    }
  };

  return (
    
    <Container maxWidth="xs">
      <div className="popup-container">
        <div className="popup">
          <Typography variant="h5" sx={{marginBottom: 1.5}}>Forgot Password?</Typography>
          <Typography variant="body1" sx={{marginBottom: 1.5}}>
            Enter your email address to reset your password.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: 1.5 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            sx={{lineHeight: 2}}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordPopup;

