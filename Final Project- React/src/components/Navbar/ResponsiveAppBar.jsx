import * as React from 'react';
import {MenuItem, Box, Typography, Menu, Toolbar, Container, Avatar, AppBar,} from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import LightModeIcon from '@mui/icons-material/LightMode';
import woman_avatar from './woman_avatar.png';
import { darkThemeActions } from "../../store/darkTheme";
import SearchPartial from "./SearchPartial";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PedalBikeIcon from '@mui/icons-material/PedalBike';


const pages = [{label: 'Home', url: ROUTES.HOME}, {label: "About", url: ROUTES.ABOUT}];
const nonLoginPages = [{label: "Signup", url: ROUTES.SIGNUP},{label: "Login", url: ROUTES.LOGIN}];
const loginPages = [{label: 'Favorites', url: ROUTES.FAVORITES}];
//const BusinessPages = [{label: 'My Cards', url: ROUTES.MYCARDS}];
const AdminPages = [{label: 'My Cards', url: ROUTES.MYCARDS}, {label: 'CRM', url: ROUTES.CRM}, {label: 'RATING', url: ROUTES.RATING}];
const settings = [{label: 'Profile', url: ROUTES.PROFILE}, {label: 'Logout', url: ROUTES.LOGOUT}];


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  //const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const imageUrl = useSelector((bigState) => bigState.authSlice.imageUrl);
  const isAdmin = useSelector((bigState) => bigState.authSlice.isAdmin);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state) => state.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const setToDarkTheme = () => {
    dispatch(darkThemeActions.setToDarkTheme());
  };

  const setToLightTheme = () => {
    dispatch(darkThemeActions.setToLightTheme());
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
  
  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{color: 'white'}}>
          {/* md Screen */}
          <PedalBikeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:'white',
              textDecoration: 'none',
            }}
          >
            Ride Bike
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
              {isLoggedIn && loginPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
              {/* {(isLoggedIn && isBiz) && BusinessPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))} */}
              {(isLoggedIn && isAdmin) && AdminPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}  
              

            </Menu>
            
          </Box>
          {/* xs Screen */}
          <PedalBikeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:'white',
              textDecoration: 'none',
            }}
          >
            Ride Bike
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },  }}>
           
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} style={{color: "aqua " }}/>
            ))}
            {isLoggedIn && loginPages.map((page) => (
              <NavLinkComponent key={page.url} {...page} sx={{ color: 'white !important' }}/>
            ))}
            {/* {(isLoggedIn && isBiz) && BusinessPages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))} */}
            {(isLoggedIn && isAdmin) && AdminPages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
          
          </Box>
          

          {/* Right Side */}
          <SearchPartial />
          {isDarkTheme ? <IconButton aria-label="light-theme" checked={isDarkTheme} onClick={setToLightTheme}><LightModeIcon/>
            </IconButton> : <IconButton aria-label="dark-theme" checked={isDarkTheme} onClick={setToDarkTheme}>
              <DarkModeIcon/>
            </IconButton>}
          {isLoggedIn ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                
                <Avatar alt="avatar" src={imageUrl && imageUrl.startsWith("http") ? imageUrl : `http://localhost:8181${imageUrl}`}/>
              </IconButton> 
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            {settings.map((page) => (
              page.url === ROUTES.LOGOUT ? (
                <MenuItem key={page.url} onClick={handleCloseUserMenu}>
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                    
                  />
                </MenuItem> 
              ) : (
                <MenuItem key={page.url} onClick={handleCloseUserMenu}>
                  <NavLinkComponent key={page.url} {...page} />
                </MenuItem>
              )
            ))}
            </Menu>
          </Box> : <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
            {nonLoginPages.map((page) => (
              <NavLinkComponent
                key={page.url} {...page}
                //onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              />
            ))}
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;