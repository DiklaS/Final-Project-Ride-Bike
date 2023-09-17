import { Box, CircularProgress, Divider, Grid, Typography, TableContainer, Table, TableBody, Paper, IconButton} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import { filterData } from "../components/filterFunc";
import SecondaryAppBar from "../components/Navbar/SecondaryAppBar";
import TableRawComponent from "../components/TableRawComponent";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const HomePage = ({updateFavoritesArr}) => {
  const [originalItemsArr, setOriginalItemsArr] = useState(null);
  const [itemsArr, setItemsArr] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [viewMode, setViewMode] = useState("cards");
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const filterItemsByCategory = (items, category) => {
    if (category === 'All') {
      return items;
    } else {
      return items.filter((item) => item.item.trim().toLowerCase() === category.trim().toLowerCase());
    }
  };

  useEffect(() => {
    axios
      .get("/cards/")
      .then(({ data }) => {
        setOriginalItemsArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  useEffect(() => {
    if (originalItemsArr) {
      filterFunc(originalItemsArr);
    }
  }, [qparams.filter, selectedCategory, originalItemsArr]);


  const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();
    } 
    const filteredData = filterData(data, filter);
    const filteredItemsArr = filterItemsByCategory(filteredData, selectedCategory);
    setItemsArr(filteredItemsArr);
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
      setItemsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  }; 

  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleDetailedCardFromInitialCardsArr = (id) => {
    navigate(`/detailedcard/${id}`); 
  }; 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  if (!itemsArr) {
    return <CircularProgress />;
  } 

  return (
    <Box>
      <SecondaryAppBar selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
      <Typography variant="h4" textAlign={"center"} my={2}>
        Bikes and everything around
      </Typography>
      <Typography variant="h6" textAlign={"center"} my={2}>
        Mountain biking is a sport that requires a lot of expensive equipment. Second hand equipment is a good way to reduce costs. This site presents second-hand equipment related to mountain biking from anywhere in Israel.
      </Typography>
      <Box display="flex" justifyContent="right" my={2}>
        <IconButton variant="contained" color="primary" onClick={switchToCardsView} disabled={viewMode === "cards"}>
          <ViewModuleIcon/>
        </IconButton>
        <IconButton variant="contained" color="primary" onClick={switchToTableView} disabled={viewMode === "table"}>
          <ViewListIcon/>
        </IconButton>
      </Box>
      <Divider />
      {viewMode === "cards" ? (
      <Grid container spacing={2} my={2}>
        {itemsArr.map((item) => (
          <Grid item xs={12} md={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              item={item.item}
              company={item.company}
              price={item.price}
              size={item.size}
              contactName={item.contactName}
              location={item.location}
              phone={item.phone}
              bizNumber={item.bizNumber}
              url={item.image.url}
              alt={item.image.alt}
              likes={item.likes}
              userId={item.user_id}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onDetailedCard={handleDetailedCardFromInitialCardsArr}
              //onFavorite={handleFavoritedChange}
              canEdit={payload && payload.isAdmin}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </Grid>))}
          </Grid>) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      {itemsArr.map((row) => (
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
              )}
    </Box>
  );
};

export default HomePage;