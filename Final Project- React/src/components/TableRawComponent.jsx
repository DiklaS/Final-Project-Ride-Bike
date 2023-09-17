import {Card, CardActionArea, CardMedia, CardHeader,CardContent, Typography, Box, IconButton, Divider, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TableRawComponent = ({row, onDelete, onEdit, onDetailedCard, updateFavoritesArr, canEdit }) => {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const isAdmin = useSelector((state) => state.authSlice.isAdmin);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(() => {
    if (payload && payload._id && row.likes && row.likes.length > 0) {
      return !!row.likes.find(id => id === payload._id);
    }
    return false;
    });

  const handleDeleteBtnClick = () => {
    onDelete(row._id);
  };
  const handleEditBtnClick = () => {
    onEdit(row._id);
  };

  const handleDetailedCardBtnClick = () => {
    onDetailedCard(row._id);
  }; 

  const handleFavoritedChange = async () => {
   setIsFavorited(isFavorited => !isFavorited); 
    try {
      
      
      await axios.patch("/cards/" + row._id); 
      if (isFavorited === true)
      toast.info("Card was removed from favorites");
      if (updateFavoritesArr) {
      // Fetch the updated favorites data from the server
      const response = await axios.get("/cards/get-my-fav-cards");
      const updatedFavorites = response.data;
      updateFavoritesArr(updatedFavorites);
      } else
      toast.info("Card was added to favorites");
      } catch (err) {
      console.log("error when adding favorite", err.response.data);
    }
  }; 

  
 
  /* if (!likes) {
    return <CircularProgress />;
  }  */

  return (
    
        <TableRow
              key={row.item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              //
              //
            >
            
              <TableCell component="th" scope="row" onClick={handleDetailedCardBtnClick} style={{ cursor: "pointer" }}>
                 <img src={row.image.url} alt={row.image.alt} style={{ maxWidth: "300px" }} />
              </TableCell>
              <TableCell align="left" colSpan={2}>
                    <Typography  variant="h6">
                        {`${row.item}, ${row.size}`}
                    </Typography>
                    <Typography  color="textSecondary">
                      {`by: ${row.company}`}
                    </Typography>
                    <Typography  color="textSecondary">
                      {`from: ${row.location}`}
                    </Typography>
                </TableCell>
              {/* /*<TableCell align="left">{row.location}</TableCell> */}
              <TableCell align="left" ><Typography  variant="h6">{`${row.price} NIS`}</Typography></TableCell>
              <TableCell align="left"> 
                    {isLoggedIn && 
                    <IconButton aria-label="favorite" sx={{justifyContent: 'left'}} onClick={handleFavoritedChange}>
                      <FavoriteIcon color={isFavorited ? "error" : "inherit"}/>
                    </IconButton>}
                    
                    {(isAdmin || (payload && (row.user_id === payload._id))) && <IconButton aria-label="delete" onClick={handleDeleteBtnClick}>
                        <DeleteIcon />
                    </IconButton>}
                    {canEdit  && <IconButton aria-label="edit"  onClick={handleEditBtnClick}>
                        <EditIcon />
                    </IconButton>}
                </TableCell>
       
        </TableRow>
     
          )}; 
  

            /* CardComponent.propTypes = {
              id: PropTypes.string,
            
              img: PropTypes.string.isRequired,
              //title: PropTypes.string.isRequired,
              //subTitle: PropTypes.string.isRequired,
              //description: PropTypes.string.isRequired,
              onDelete: PropTypes.func,
              onEdit: PropTypes.func,
              canEdit: PropTypes.bool,
            }; 

             CardComponent.defaultProps = {
              img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI           +CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8        +CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8        +CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8       +CiAgPC9nPgo8L3N2Zz4K",
              //subTitle: "",
              canEdit: false,
            }; */

export default TableRawComponent;
