import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box,} from '@mui/material';


const categories = ['All', 'Bikes', 'Shoes', 'Gloves']; 

function SecondaryAppBar({selectedCategory, handleCategoryChange}) {
    
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Customize the content of your second app bar here */}
          {/* Categories */}
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            {categories.map((category) => (
              <Typography
                key={category}
                component="span"
                variant="subtitle1"
                sx={{
                  color: 'white',
                  marginLeft: 2,
                  cursor: 'pointer',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal',
                }}
                onClick={() => {handleCategoryChange(category);}}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SecondaryAppBar;
