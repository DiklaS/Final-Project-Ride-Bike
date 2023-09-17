import { useState, useEffect } from "react";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SignupPage = () => {
  const initInputState ={name: {firstName: "",middleName: "",lastName: ""},phone: "",email: "",password: "",image: {url: "",alt: ""},address: {state: "",country: "",city: "",street: "",houseNumber: "",zip: ""}
  }
  const [inputState, setInputState] = useState(initInputState);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
       
      if (joiResponse) {
        return;
      }
      const requestData = {
      name: {firstName: inputState.name.firstName,
      middleName: inputState.name.middleName,
      lastName: inputState.name.lastName},
      phone: inputState.phone,
      email: inputState.email,
      password: inputState.password,
      image: {url: inputState.image.url,
      alt: inputState.image.alt},
      address: {state: inputState.address.state,
      country: inputState.address.country,
      city: inputState.address.city,
      street: inputState.address.street,
      houseNumber: inputState.address.houseNumber,
      zip: inputState.address.zip === "" ? null : inputState.address.zip},
      isAdmin: isAdmin
        
    };
      console.log(requestData)
      await axios.post("/users", requestData);
      toast.info('Registration process completed successfully')
      navigate(ROUTES.LOGIN);
    } catch (err) {
        console.log("error from axios", err.response.data.error);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
        } else {
        toast.error('Registration process did not complete successfully, please try again');
      }
    }
  };

  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleResetBtnClick = () => {
    const newInputState = initInputState;
    setInputState(newInputState)
    setInputsErrorsState({})
  };  

  const handleInputChange = (ev) => {
  const { id, value } = ev.target;
  if (id.startsWith("name")) {
    const [nameKey, nestedKey] = id.split(".");
    setInputState((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        [nestedKey]: value,
      },
    }));
  } else if (id.startsWith("address")) {
    const [addressKey, nestedKey] = id.split(".");
    setInputState((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [nestedKey]: value,
      },
    }));
  } else if (id.startsWith("image")) {
    const [imageKey, nestedKey] = id.split(".");
    setInputState((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        [nestedKey]: value,
      },
    }));
  } else {
    setInputState((prev) => ({
      ...prev,
      [id]: value,
    }));
  }
};

  const handleCheckChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  useEffect(() => {
  const joiResponse = validateRegisterSchema(inputState);
  setInputsErrorsState(joiResponse);
}, [inputState]);

useEffect(() => {
  console.log(inputsErrorsState);
}, [inputsErrorsState]);
  
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Signup Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              {id: 'name.firstName',label: 'First Name',required: true, },
              {id: 'name.middleName',label: 'Middle Name', required: false, },
              {id: 'name.lastName',label: 'Last Name',required: true, },
              {id: 'phone',label: 'Phone',required: true, },
              {id: 'email',label: 'Email',required: true, },
              {id: 'password',label: 'Password',required: true},
              {id: 'image.url',label: 'Image url',required: false, },
              {id: 'image.alt',label: 'Image alt',required: false, },
              {id: 'address.state',label: 'State',required: false, },
              {id: 'address.country',label: 'Country',required: true, },
              {id: 'address.city',label: 'City',required: true, }, 
              {id: 'address.street',label: 'Street',required: true, }, 
              {id: 'address.houseNumber',label: 'House number', required: true, }, 
              {id: 'address.zip',label: 'Zip',required: false, },
            ].map(({id, label, required}) => (
              <Grid item xs={12} sm={6} key={id}>
                <TextField
                  required={required}
                  id={id}
                  label={label}
                  fullWidth
                  type={id === 'password' ? 'password' : 'text'} 
                  value={inputState[id]}
                  onChange={handleInputChange}
                  error={(inputsErrorsState && (inputState[id]  ||  inputState[id.split(".")[0]][id.split(".")[1]] ) && (inputsErrorsState[id]  || inputsErrorsState[id.split(".")[1]] )) ? true : false}
                  helperText = {inputsErrorsState && (inputState[id]  ||  inputState[id.split(".")[0]][id.split(".")[1]] ) && ((inputsErrorsState[id] && inputsErrorsState[id].map((error) => (<span key={error}>{error}</span>))) || (inputsErrorsState[id.split(".")[1]] && inputsErrorsState[id.split(".")[1]].map((error) => (<span key={error}>{error}</span>))))}
                />
            </Grid>
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox id="isAdmin" checked={isAdmin} onChange={handleCheckChange} color="primary" />}
                label="Signup as adminastor"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleCancelBtnClick}
              >
              CANCEL
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button 
                fullWidth
                variant="outlined"
                onClick={handleResetBtnClick} 
              >
                <LoopOutlinedIcon/>
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                fullWidth
                sx={{mb: 5}}
                variant="contained" 
                onClick={handleBtnClick}
                disabled={!inputState.name.firstName || !inputState.name.lastName || !inputState.phone || !inputState.email || !inputState.password || !inputState.address.country || !inputState.address.city || !inputState.address.street || !inputState.address.houseNumber}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

};
 
export default SignupPage;
