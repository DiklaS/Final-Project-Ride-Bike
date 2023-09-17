import {Box, Typography, } from '@mui/material';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ROUTES from '../routes/ROUTES';

const MuiBottomNavigators = () => {
    return (
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[300]
              : "rgba(255, 255, 255, 0.09)",
          p: 1,
          display: "flex",
          justifyContent:'space-between',
          alignItems: "center",
        }}
        component="footer"
        
      >
      <div>
        <Link to="/"  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: "inherit" }} >
         <PedalBikeIcon sx={{mr:1}}/>
         Ride Bike
        </Link>
      </div>
      <Typography variant="body2" color="text.primary" align="center">
        &copy; {new Date().getFullYear()} created by Dikla Shaked
      </Typography>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={ROUTES.CONTACT} style={{ textDecoration: 'none', color: "inherit", marginRight: '3' }}>
         Contact us
        </Link>
        <span style={{ marginRight: '10px' }}></span>
        <Link to="https://www.linkedin.com/in/dikla-shaked" style={{ display: 'flex', alignItems: 'center', color: "inherit" }}>
         <LinkedInIcon />
        </Link>
      </div>
      
      
      
    </Box>

    )
}

export default MuiBottomNavigators;
