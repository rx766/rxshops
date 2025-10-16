import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  Login as LoginIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { selectCartQuantity } from '../../store/slices/cartSlice';
import { selectIsAuthenticated, selectUser, logout } from '../../store/slices/authSlice';
import { setFilters } from '../../store/slices/productSlice';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartQuantity = useSelector(selectCartQuantity);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setFilters({ searchTerm: searchTerm.trim() }));
      navigate('/products');
    }
  };

  const navigationItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <StoreIcon /> },
  ];

  const MobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {!isAuthenticated ? (
            <ListItem
              component={RouterLink}
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          ) : (
            <>
              <ListItem
                component={RouterLink}
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              {user?.role === 'admin' && (
                <ListItem
                  component={RouterLink}
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemIcon><DashboardIcon /></ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              )}
              <ListItem onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            RXshops
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', mr: 4 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  sx={{ mr: 2 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box component="form" onSubmit={handleSearch} sx={{ mr: 2 }}>
              <TextField
                size="small"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  },
                }}
              />
            </Box>
          )}

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {!isMobile && (
            <>
              {!isAuthenticated ? (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              ) : (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleUserMenuOpen}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem onClick={handleUserMenuClose} component={RouterLink} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleUserMenuClose} component={RouterLink} to="/orders">
                      My Orders
                    </MenuItem>
                    {user?.role === 'admin' && (
                      <MenuItem onClick={handleUserMenuClose} component={RouterLink} to="/admin">
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      
      <MobileMenu />
    </>
  );
};

export default Header;