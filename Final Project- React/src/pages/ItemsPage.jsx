import { Box, Typography, Divider, CircularProgress} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import { useEffect, useState } from "react";
import axios from "axios";

const ItemsePage = () => {
    const [itemsArr, setItemsArr] = useState(null);
  

  useEffect(() => {
  axios
    .get("/cards")
    .then(({ data }) => {
      console.log("data", data);
      setItemsArr(data);
    })
    .catch((err) => {
      console.log("err from axios", err);
      //toast.error("Oops");
    })
  }, []);

    if (!itemsArr) {
    return <CircularProgress />;
  }

    return (
      <Box>
        <Typography variant="h4" textAlign={"center"} my={2}>
          ITEMS RATING TABLE 
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
          Here you can see all the items and their number of likes.
        </Typography>
        <Divider/>
        <TableContainer component={Paper} sx={{ my: 3 }} >
          <Table sx={{ minWidth: 650, my: '3' }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell>Items id</TableCell>           
                <TableCell align="center">Item&nbsp;</TableCell>
                <TableCell align="center">Size&nbsp;</TableCell>
                <TableCell align="center">Company&nbsp;</TableCell>
                <TableCell align="center">Price&nbsp;</TableCell>
                <TableCell align="center">Favories Number&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsArr.map((item) => (
                <TableRow key={item._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item._id}</TableCell>
                  <TableCell align="center">{item.item}</TableCell>
                  <TableCell align="center">{item.size}</TableCell>
                  <TableCell align="center">{item.company}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.likes.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
     





  );


}

export default ItemsePage; 