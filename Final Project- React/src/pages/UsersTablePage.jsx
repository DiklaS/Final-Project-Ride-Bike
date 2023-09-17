import { Box, Typography, Divider, CircularProgress} from "@mui/material";
//import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; 
import { useEffect, useState } from "react";
import axios from "axios";
//import CircularProgress from "@mui/material";

const UsersTablePage = () => {
    const [usersArr, setUsersArr] = useState(null);

  useEffect(() => {
  axios
    .get("/users")
    .then(({ data }) => {
      console.log("data", data);
      setUsersArr(data);
    })
    .catch((err) => {
      console.log("err from axios", err);
      //toast.error("Oops");
    })
  }, []);
  

    const handleDeleteFromInitialUsersArr = async (id) => {
      try {
        await axios.delete("/users/" + id); // /users/:id
        setUsersArr((newUsersArr) =>
          newUsersArr.filter((item) => item._id !== id)
        );
      } catch (err) {
        console.log("error when deleting", err.response.data);
      }
    }; 

    const handleStatusBtn = async (id) => {
      try {
        const newUser = usersArr.find(user => user._id === id);
          if (!newUser) {
            throw new Error("User not found");
          }
        const updatedUser = {
        ...newUser,
        isAdmin: !newUser.isAdmin,
        };
        const { _id, isAdmin, ...updatedUserData } = updatedUser;
        console.log("id:", id);
        await axios.patch("/users/" + id, updatedUserData); // /users/:id
        setUsersArr(prevState => prevState.map(user => user._id === id ? updatedUser : user));
      } catch (err) {
        console.log("error when updating user", err);
      }
    };

    if (!usersArr) {
    return <CircularProgress />;
  }

    return (
      <Box>
        <Typography variant="h4" textAlign={"center"} my={2}>
          Users Table 
        </Typography>
        <Typography variant="h6" textAlign={"center"} my={2}>
         Here you can see all the users and their status.
        </Typography>
        <Divider/>
        <TableContainer component={Paper} sx={{ my: 3 }} >
      <Table sx={{ minWidth: 650, my: '3' }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Users id</TableCell>
            
            <TableCell align="center">First Name&nbsp;</TableCell>
            <TableCell align="center">Last Name&nbsp;</TableCell>
            <TableCell align="center">Email&nbsp;</TableCell>
            <TableCell align="center">Admin status&nbsp;</TableCell>
            <TableCell align="center">Change Status&nbsp;</TableCell>
            <TableCell align="center">Delete User&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersArr.map((user) => (
            <TableRow key={user.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user._id}</TableCell>
              <TableCell align="center">{user.name.firstName}</TableCell>
              <TableCell align="center">{user.name.lastName}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.isAdmin ? "true" : "false"}</TableCell>
              <TableCell align="center">{user.isAdmin ? "" : <button onClick={() => handleStatusBtn(user._id)}>change status</button>}</TableCell>
              <TableCell align="center">{user.isAdmin ? "" : <button onClick={() => handleDeleteFromInitialUsersArr(user._id)}>Delete</button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
     





  );


}

export default UsersTablePage; 