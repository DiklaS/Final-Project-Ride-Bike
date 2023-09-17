import { Typography, Card, CardMedia, CardContent, CardActions, Button, Container, Divider, CircularProgress, ListItem, ListItemText, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailedItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailedCardArr, setDetailedCardArr] = useState(null); 

  useEffect(() => {
    axios
      .get("/cards/"+id)
      .then(({ data }) => {
        setDetailedCardArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, [detailedCardArr]);

  const handleCloseBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };

  if (!detailedCardArr) {
    return <CircularProgress />;
  }  
  return (
      <Container component="main" maxWidth="md">
        <Typography variant="h4" textAlign={"center"} my={2}>
            Detailed Item Card
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
            Here you can find more details on the item
        </Typography>
        <Divider />
        <Card sx={{ maxWidth: 'sm', marginY: 2, marginX: 'auto' }}>
          <CardMedia
            component="img"
            alt={detailedCardArr.image.alt} //{selectedImage ? selectedImage.alt : detailedCardArr.image.alt}
            height="auto"
            image={detailedCardArr.image.url} //{selectedImage ? selectedImage.url : detailedCardArr.image.url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ display: "flex", justifyContent: "space-between", fontWeight: 'bold' }}>
              <div>{detailedCardArr.item}</div>
              <div>{detailedCardArr.price} NIS</div>
            </Typography>
            <Divider />
            <ListItem >
              <Typography variant="subtitle1" > Produced by:</Typography>
              <ListItemText primary={detailedCardArr.company} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem >
              <Typography variant="subtitle1" > Size:</Typography>
              <ListItemText primary={detailedCardArr.size} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem >
              <Typography variant="subtitle1" >Contact Name: </Typography>
              <ListItemText primary={detailedCardArr.contactName} style={{ marginLeft: '10px' }} />
              <Typography variant="subtitle1" >Phone: </Typography>
              <ListItemText primary={detailedCardArr.phone} style={{ marginLeft: '10px' }} />
              <Typography variant="subtitle1" >Email: </Typography>
              <ListItemText primary={detailedCardArr.email} style={{ marginLeft: '10px' }} />
            </ListItem>
            <ListItem >
              <Typography variant="subtitle1" >Location: </Typography>
              <ListItemText primary={detailedCardArr.location} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem >
              <Typography variant="subtitle1" >Created at: </Typography>
              <ListItemText primary={new Date(detailedCardArr.createdAt).toLocaleDateString("en-US")} style={{ marginLeft: '10px' }}/>
            </ListItem>
            <ListItem >
              <Typography variant="subtitle1" >Item number:</Typography>
              <ListItemText primary={ detailedCardArr.bizNumber}  style={{ marginLeft: '10px' }} />
            </ListItem> 
          </CardContent>
          <CardActions>
            <Button variant="contained" size="medium" onClick={handleCloseBtnClick}>Close</Button>
          </CardActions>
        </Card>
          
      </Container>
  );
}

  
export default DetailedItemPage;