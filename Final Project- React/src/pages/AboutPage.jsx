import { Typography, Divider, Grid, Box, List, ListItem} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SummarizeIcon from '@mui/icons-material/Summarize';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffdf66',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '100%', 
}));

const AboutPage = () => {
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} my={2}>
              About Ride Bike 
            </Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} mt={2}>
                  <Item ><Typography variant="h6" gutterBottom >Home Page</Typography>
                        <Typography>As a beginner rider you need to equip yourself with a lot of not cheap equipment, so the option of buying second hand is not bad at all... There are groups on Facebook that manage all this but I thought it would be convenient and easy to see it on the site itself.</Typography>
                        <Typography >On the home page you can find all the items we have on our site.</Typography>
                        <Typography >Two items displays are available, cards or table.</Typography>
                        
                    </Item>
                </Grid>
                <Grid item xs={12} md={4} mt={2}>
                  <Item><Typography variant="h6" gutterBottom></Typography>
                    <List>
                        <ListItem><SummarizeIcon sx={{m:1}}/> Clicking on the item card will bring you to a page with more details about the item.</ListItem>
                        <ListItem><FavoriteIcon sx={{m:1}}/> Clicking on the favorite icon will mark this item as a favorite.</ListItem>
                        <ListItem><EditIcon sx={{m:1}}/> Clicking on the edit icon will allow editing the item, available only to admin customers who created the item.</ListItem>
                        <ListItem><DeleteIcon sx={{m:1}}/> Clicking on the delete icon will allow deletion of the card, available only to admin customers.</ListItem>
                    </List>
                  </Item>
                </Grid>
                <Grid item xs={12} md={4} mt={2} >
                    <Item>
                            <Typography variant="h6" gutterBottom>Form pages on the website</Typography>  
                            <List>
                                <ListItem># User Signup</ListItem>
                                <ListItem># User Login (With password update by sending a link to an email with a password update page- bonus task.)</ListItem>
                                <ListItem># User Profile (User profile picture that will be uploaded to a folder on the computer- bonus task)</ListItem>
                                <ListItem># Creat card</ListItem>
                                <ListItem># Edit Card</ListItem>
                            </List>
                    </Item>
                     
                </Grid>
                <Grid item xs={12} md={4} >
                  <Item><Typography variant="h6" gutterBottom>Favorites Page</Typography>
                    <Typography>Favorites page is available to registered and logged in users. All the items that user has marked as favorites are saved here, so you can perform the actions on the card just like from the home page.</Typography> </Item>
                </Grid>
                <Grid item xs={12} md={4} >
                  <Item>
                    <Typography variant="h6" gutterBottom>My Cards Page</Typography>
                    <Typography>This page is available to admin users who logged in. All items created by the user are displayed here. From this page you can also create a new item by clicking on the "+" button.</Typography>
                  </Item>
                </Grid> 
                <Grid item xs={12} md={4} >
                  <Item><Typography variant="h6" gutterBottom>CRM Page</Typography>
                    <Typography>CRM page is available to Admin users. This page shows a table of all users with the option to change their status or delete non-admin users themselves. </Typography></Item>
                </Grid>
                <Grid item xs={12} md={4} mb={2}>
                  <Item><Typography variant="h6" gutterBottom>Rating Page</Typography>
                    <Typography>Rating page is available to Admin users. This page  shows a table of favorites according to the number of people have defined as favorite.</Typography>
                  </Item>
                </Grid>
                <Grid item xs={12} md={4} mb={2}>
                  <Item><Typography variant="h6" gutterBottom>Detailed Item Page</Typography>
                    <Typography>This page is available to all types of users, and here you can find more details about the items.</Typography>
                  </Item>
                </Grid>
                
                <Grid item xs={12} md={4} mb={2}>
                  <Item>
                    <Typography variant="h6" gutterBottom>Bonus tasks Completed:</Typography>
                    <Typography textAlign={"left"}>
                      1. Disconnection after 4 hours without using the application.<br></br>
                      2. Limiting requests to the server in 24 hours.<br></br>
                      3. User management table.<br></br>
                      4. Favorites management table.<br></br>
                      5. Password reset includes sending a link to the user.<br></br>
                    </Typography>
                  </Item>
                </Grid>
            </Grid>



            
        </Box>
    )
}

export default AboutPage;