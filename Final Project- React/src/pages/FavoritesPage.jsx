import { Typography, Box, Grid, Divider, CircularProgress, IconButton, TableContainer, Table, TableBody, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "../components/CardComponent";
import { useSelector } from "react-redux";
import { filterData } from "../components/filterFunc";
import useQueryParams from "../hooks/useQueryParams";
import PropTypes from 'prop-types';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TableRawComponent from "../components/TableRawComponent";

const FavoritesPage = () => {
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const [originalfavoritesArr, setOriginalfavoritesArr] = useState(null);
  const [favoritesArr, setFavoritesArr] = useState();
  let qparams = useQueryParams();
  const [viewMode, setViewMode] = useState("cards");

  useEffect(() => {
    axios
      .get("/cards/favorites")
      .then(({ data }) => {
        console.log("data", data);
        //setFavoritesArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
    const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();;
    }
      const newOriginalCardsArr = JSON.parse(
        JSON.stringify(originalfavoritesArr || data)
      );
      const filteredData = filterData(newOriginalCardsArr, filter);
      setOriginalfavoritesArr(newOriginalCardsArr);
      setFavoritesArr(filteredData);
  };
  }, [qparams.filter]);

  const updateFavoritesArr = (updatedFavorites) => {
    setFavoritesArr(updatedFavorites);
  };

  const switchToCardsView = () => {
    setViewMode("cards");
  };

  const switchToTableView = () => {
    setViewMode("table");
  };

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setFavoritesArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  }; 

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); 
  };
  
  const handleDetailedCardFromInitialCardsArr = (id) => {
    navigate(`/detailedcard/${id}`); 
  }; 

  if (!favoritesArr) {
    return <CircularProgress />;
  }  
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              My Favorites Cards Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              All your favorites items are displayed here.
            </Typography>
            <Box display="flex" justifyContent="right" my={2}>
              <IconButton variant="contained" color="primary" onClick={switchToCardsView}       disabled={viewMode === "cards"}>
                <ViewModuleIcon/>
              </IconButton>
              <IconButton variant="contained" color="primary" onClick={switchToTableView}       disabled={viewMode === "table"}>
                <ViewListIcon/>
              </IconButton>
            </Box>
            <Divider />
            
            
            {favoritesArr && favoritesArr.length>0 ? (viewMode === "cards" ?(
              <Grid container spacing={2} my={2}>
              {favoritesArr.map((item) => (
              <Grid item xs={12} md={4} key={item._id + Date.now()}>
                <CardComponent
                  id={item._id}
                  item={item.item}
                  company={item.company}
                  price={item.price}
                  size={item.size}
                  url={item.image.url}
                  alt={item.image.alt}
                  location={item.location}
                  contactName={item.contactName}
                  bizNumber={item.bizNumber}
                  phone={item.state}
                  likes={item.likes}
                  userId={item.user_id}
                  createdAt={item.createdAt}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onEdit={handleEditFromInitialCardsArr}
                  onDetailedCard={handleDetailedCardFromInitialCardsArr}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  updateFavoritesArr={updateFavoritesArr}
                />
              </Grid>))}
              </Grid>) : (
                <TableContainer component={Paper} mb={2}>
                  <Table sx={{ minWidth: 650}} aria-label="simple table" >
                    <TableBody>
                      {favoritesArr.map((row) => (
                        <TableRawComponent
                          key={row._id}
                          row={row}
                          canEdit={payload && payload.isAdmin}
                          onDelete={handleDeleteFromInitialCardsArr}
                          onEdit={handleEditFromInitialCardsArr}
                          onDetailedCard={handleDetailedCardFromInitialCardsArr}

                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ))
              : <Typography variant="h6" gutterBottom>
                You don't have Favorites
              </Typography>
          
            }
        </Box>
  );
}

FavoritesPage.propTypes = {
    //CardComponent: PropTypes.elementType.isRequired,
    originalfavoritesArr: PropTypes.array,
    favoritesArr: PropTypes.array,
    updateFavoritesArr: PropTypes.func,
    qparams: PropTypes.object,
  };

export default FavoritesPage;