import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const useStyles = makeStyles((theme) => ({
  menubar: {
    background: 'linear-gradient(45deg, #fd5f1f 2%, #FF8E53 90%,#fff8f5 25%)',
    
    
    boxShadow: '0 3px 8px 2px rgba(255, 105, 135, .3)',
    color: 'white',
   
    
  },
  menuButton: {
    flexGrow: 1,
    
    color:'#fd5f1f',
  },
  title: {
    
    
    alignItems:'left'
  },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const [auth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    // const handleChange = (event) => {
    //   setAuth(event.target.checked);
    // };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div >
        
        <AppBar position="static" className={classes.menubar} >
        
          <Toolbar>
            
            <Typography variant="h5" className={classes.title}  >
            <Button style={{color:'white'}} href='/' size="large">
              CB Poll
              </Button>
            </Typography>
            {auth && (
              <div>
                <IconButton
                className={classes.menuButton}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
  );
}