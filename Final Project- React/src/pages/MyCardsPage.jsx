import { Box, Typography, Divider, Grid, Fab, CircularProgress, Table, TableContainer, Paper, TableBody, IconButton} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "../components/CardComponent";
import AddIcon from '@mui/icons-material/Add';
import useQueryParams from "../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { filterData } from "../components/filterFunc";
import SecondaryAppBar from "../components/Navbar/SecondaryAppBar";
import TableRawComponent from "../components/TableRawComponent";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

const MyCardsPage = () => {
  const [originalmyCardsArr, setOriginalMyCardsArr] = useState(null)
  const [myCardsArr, setmyCardsArr] = useState(null);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [viewMode, setViewMode] = useState("cards");


  const filterItemsByCategory = (items, category) => {
    if (category === 'All') {
      return items;
    } else {
      return items.filter((item) => item.item.trim().toLowerCase() === category.trim().toLowerCase());
    }
  };

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setOriginalMyCardsArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);

  useEffect(() => {
    if (originalmyCardsArr) {
      filterFunc(originalmyCardsArr);
    }
  }, [qparams.filter, selectedCategory, originalmyCardsArr]);
  
  const filterFunc = (data) => {
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter.toLowerCase();
    } 
    const filteredData = filterData(data, filter);
    const filteredItemsArr = filterItemsByCategory(filteredData, selectedCategory);
    setmyCardsArr(filteredItemsArr);
  };

  const switchToCardsView = () => {
    setViewMode("cards");
  };

  const switchToTableView = () => {
    setViewMode("table");
  };

  const handleDeleteCardBtnClick = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setmyCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const handleEditCardBtnClick = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };

  const handleCreateCardBtnClick = (ev) => {
    navigate(ROUTES.CREATECARD);
  };

  const handleDetailedCardFromInitialCardsArr = (id) => {
    navigate(`/detailedcard/${id}`); 
  }; 

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  if (!myCardsArr) {
    return <CircularProgress />;
  }

    return (
        <Box sx={{ position: 'relative' }}>
            <SecondaryAppBar selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />
            <Typography variant="h4" textAlign={"center"} my={2}>
              My Cards Page
            </Typography>
            <Typography variant="h6" textAlign={"center"} my={2}>
              Here are all the items you posted, you are also welcome to add new items (on the plus button).
            </Typography>
             <Box display="flex" justifyContent="right" my={2}>
                <IconButton variant="contained" color="primary" onClick=        {switchToCardsView} disabled={viewMode === "cards"}>
                  <ViewModuleIcon/>
                </IconButton>
                <IconButton variant="contained" color="primary" onClick=        {switchToTableView} disabled={viewMode === "table"}>
                  <ViewListIcon/>
                </IconButton>
            </Box>
            <Divider />
            {viewMode === "cards" ? (
            <Grid container spacing={2} my={2} >
              {myCardsArr.map((item) => (
              <Grid item xs={12} md={4} key={item._id + Date.now()} >
                <CardComponent
                  id={item._id}
                  item={item.item}
                  company={item.company}
                  price={item.price}
                  size={item.price}
                  contactName={item.contactName}
                  phone={item.phone}
                  url={item.image.url}
                  alt={item.image.alt}
                  location={item.location}
                  onDelete={handleDeleteCardBtnClick}
                  onEdit={handleEditCardBtnClick}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  onDetailedCard={handleDetailedCardFromInitialCardsArr}
                  likes={item.likes}
                  userId={item.user_id}
                  bizNumber={item.bizNumber}
                  selectedCategory={selectedCategory}
                  handleCategoryChange={handleCategoryChange}
                /> 
              </Grid>))}
            </Grid>) : (
              <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      {myCardsArr.map((row) => (
                        <TableRawComponent
                          key={row._id}
                          row={row}
                          canEdit={payload && payload.isAdmin}
                          onDelete={handleDeleteCardBtnClick}
                          onEdit={handleEditCardBtnClick}
                          onDetailedCard={handleDetailedCardFromInitialCardsArr}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            )}
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" >
              <Fab color="primary" aria-label="add" size='large' 
                  onClick={handleCreateCardBtnClick}>
                  <AddIcon />
              </Fab>
            </Box>

        </Box>
  ); 
    
}

export default MyCardsPage; 


