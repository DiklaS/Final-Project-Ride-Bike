import {Container, Typography, Box, Button, Grid, TextField, CircularProgress} from "@mui/material/";
import { useState, useEffect } from "react";
import editCardSchema from "../validation/editValidation"
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validateEditSchema from "../validation/editValidation";
import PropTypes from 'prop-types';

const CreateCardPage = () => {
  const initInputState = ({});
  const [inputState, setInputState] = useState(initInputState);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = editCardSchema(inputState);
      console.log(inputState)
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        const newItem = {
          item: inputState.item,
          company: inputState.company,
          price: inputState.price,
          size: inputState.size,
          location: inputState.location,
          contactName: inputState.contactName,
          phone: inputState.phone,
          email: inputState.email,
          image: {
            url: inputState.url,
            alt: inputState.alt,
          },
        };
        await axios.post("/cards/", newItem);
        toast.success("A new item has been created");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err);
      toast.error("There was an error, the card was not saved in the system.");
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
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  useEffect(() => {
    const joiResponse = validateEditSchema(inputState);
    setInputsErrorsState(joiResponse);
    console.log(inputsErrorsState)
  }, [inputState]);

  if (!inputState) {
    return <CircularProgress />;
  }

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
          Create New Item 
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              {id: 'item',label: 'Item', required: true, },
              {id: 'company',label: 'Company', required: true, },
              {id: 'price',label: 'Price', required: true, },
              {id: 'size',label: 'Size', required: false, },
              {id: 'location',label: 'Location', required: true, },
              {id: 'contactName',label: 'Contact Name', required: true},
              {id: 'phone',label: 'Phone', required: true, },
              {id: 'email',label: 'Email', required: false, },
              {id: 'url',label: 'Image Url', required: true, },
              {id: 'alt',label: 'Image alt', required: true, },
              
            ].map(({id, label, required, type}) => (
              <Grid item xs={12} sm={6} key={id}>
                <TextField
                  required={required}
                  id={id}
                  label={label}
                  fullWidth
                  value={inputState[id]}
                  onChange={handleInputChange}
                  error={(inputState[id] && inputsErrorsState && inputsErrorsState[id]) ? true : false}
                  helperText={
                  inputsErrorsState &&
                  inputState[id] &&
                  inputsErrorsState[id] &&
                  inputsErrorsState[id].map((item) => (
                    <span key={`errors${item}`}>{item}</span>
                  ))
                  }   
                />
                
            </Grid>
            ))}
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
                disabled={!inputState.item || !inputState.company || !inputState.price || !inputState.location || !inputState.contactName || !inputState.phone || !inputState.url || !inputState.alt}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

TextField.propTypes = {
  required: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.node,
};

export default CreateCardPage;



