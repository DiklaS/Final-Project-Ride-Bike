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
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES";
import { CircularProgress } from "@mui/material";
import validateProfileSchema from "../validation/profileValidation";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [inputState, setInputState] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  //const { id } = useParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const id = payload._id;
  const [imageUrl, setImageUrl] = useState("");

  const fields = [
          { id: "firstName", path: "name.firstName", label: "First Name", required: true, type:"text" },
          { id: "middleName", path: "name.middleName", label: "Middle Name", required: false, type:"text" },
          { id: "lastName", path: "name.lastName", label: "Last Name", required: true, type:"text" },
          { id: "phone", path: "phone", label: "Phone", required: true, type:"text" },
          { id: "email", path: "email", label: "Email", required: true, type:"text" },
          { id: "imageUrl", path: "image.url", label: "Image URL", required: false, type:"text" },
          { id: "imageAlt", path: "image.alt", label: "Image Alt", required: false, type:"text" },
          { id: "state", path: "address.state", label: "State", required: false, type:"text" },
          { id: "country", path: "address.country", label: "Country", required: true, type:"text" },
          { id: "city", path: "address.city", label: "City", required: true, type: "text" },
          { id: "street", path: "address.street", label: "Street", required: true, type:"text" },
          { id: "houseNumber", path: "address.houseNumber", label: "House number", required: true, type:"number" },
          { id: "zipCode", path: "address.zip", label: "Zip", required: false, type:"number" },
        ];
  useEffect(() => {
    axios
      .get("/users/"+id)
      .then(({ data }) => {
        //console.log("profile data", data);
        let newInputState = {...data};
        

        fields.forEach(({ id, path }) => {
          const value = getNestedValue(newInputState, path);
          newInputState[id] = value || "";
        });

        setInputState(newInputState);
        setIsAdmin(newInputState.isAdmin);
        setImageUrl(newInputState.imageUrl);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops"); 
      });
  }, []);

  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };

   const handleResetBtnClick = () => {
    const initInputState ={firstName: "",middleName: "",lastName: "",phone: "",email: "",password: "",imageUrl: "",imageAlt: "",state: "",country: "",city: "",street: "",houseNumber: "",zipCode: ""
  }
    setInputState(initInputState)
    setIsAdmin(false)
    setInputsErrorsState({})
  };    

  const getNestedValue = (obj, path) => {
  if (!path) {
    return obj;
  }
  const keys = path.split(".");
  return keys.reduce((nestedObj, key) => {
    if (nestedObj && nestedObj.hasOwnProperty(key)) {
      return nestedObj[key];
    }
    return undefined;
  }, obj);
  };

  const handleInputChange = (ev) => {
    const{id, value} = ev.target
    setInputState(prev => (
      {...prev,
      [id] : value}
    ));
   
  } 
  const handleCheckChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  useEffect(() => {
    const joiResponse = validateProfileSchema(inputState);
    setInputsErrorsState(joiResponse);
    //console.log(joiResponse)
  }, [inputState]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
      try {
        const formData = new FormData();
        formData.append("image", file);
      
        const response = await axios.put(`/users/${id}/upload-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
       const imageUrl = response.data.imageUrl;
        setImageUrl(imageUrl); 
        
      } catch (error) {
        console.error("Error uploading image:", error);
      }
  };
  
 
  
  const handleBtnClick = async () => {
  try {
    const joiResponse = validateProfileSchema(inputState);
    setInputsErrorsState(joiResponse);

    if (joiResponse.error) {
      return;
    }
    const requestData = {
      name: {
        firstName: inputState.firstName,
        middleName: inputState.middleName,
        lastName: inputState.lastName,
      },
      phone: inputState.phone,
      email: inputState.email,
      image: {
        url: imageUrl,
        alt: inputState.imageAlt,
      },
      address: {
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zip: inputState.zipCode === "" ? null : inputState.zipCode,
      },
      isAdmin: isAdmin,
    };
    await axios.put(`/users/${id}`, requestData);
    navigate(ROUTES.HOME);
  } catch (err) {
    console.log("error from axios", err);
  }
  };

  
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
          Profile Page
        </Typography>
       
        <Grid item xs={12} sm={6}>
        {inputState.imageUrl && (
            
              <img
                src={imageUrl.startsWith("http") ? imageUrl : `http://localhost:8181${imageUrl}`}
                alt="profile_image"
                style={{ width: "100%", marginTop: "10px" }}
              />
            
          )} </Grid>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {fields.map(({ id, label, required }) => (
              <Grid item xs={12} sm={6} key={id}>
                {id === "imageUrl" ? (
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                ) : (
                <TextField
                  required={required}
                  id={id}
                  label={label}
                  fullWidth
                  value={inputState[id] !== null ? String(inputState[id]) : ""}
                  //value={inputState[id] !== null ? inputState[id].toString() : ""}
                  //type={id === "houseNumber" ? "number" : "text"}
                  onChange={handleInputChange}
                  error={
                    inputsErrorsState &&
                    inputsErrorsState[id] &&
                    (inputsErrorsState[id].length || inputState[id.split(".")[1]].length) > 0
                  }
                  helperText={
                    inputsErrorsState &&
                    inputsErrorsState[id] &&
                    inputsErrorsState[id].map((item, index) => (
                      <span key={`error${index}`}>{item}</span>
                    ))
                  }
                />)}
              </Grid>
            ))}
            <Grid item xs={12}>
              {<FormControlLabel
                control={<Checkbox id="biz" checked={isAdmin} onChange={handleCheckChange} color="primary" />}
                label="Signup as adminastor"
              /> }
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
                onClick={(event) => handleBtnClick(event)}
                //onClick={handleBtnClick}
                disabled={!inputState.firstName || !inputState.lastName || !inputState.phone || !inputState.email || !inputState.country || !inputState.city || !inputState.street || !inputState.houseNumber}
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

export default ProfilePage;
  