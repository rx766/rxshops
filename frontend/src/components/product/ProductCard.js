import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product, isFavorite = false, onToggleFavorite }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Debug info for localhost vs network issue
    console.log('🛒 Add to cart clicked:', {
      host: window.location.hostname,
      port: window.location.port,
      product: product.name,
      redux: !!dispatch
    });
    
    const cartItem = {
      product,
      quantity: 1,
      size: product.sizes?.[0] || 'One Size',
      color: product.colors?.[0]?.name || 'Default',
    };
    
    try {
      dispatch(addToCart(cartItem));
      console.log('✅ Cart item dispatched successfully');
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(product._id);
    }
  };

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      {discountPercentage > 0 && (
        <Chip
          label={`-${discountPercentage}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
          }}
        />
      )}
      
      <IconButton
        onClick={handleToggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
        }}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardMedia
        component={RouterLink}
        to={`/products/${product._id}`}
        sx={{
          height: 240,
          textDecoration: 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        image={product.images?.[0]?.url || 'https://via.placeholder.com/300x240/f5f5f5/666?text=No+Image'}
        title={product.name}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to={`/products/${product._id}`}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { color: 'primary.main' },
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating value={product.ratings.average} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({product.ratings.count})
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {product.discountPrice ? (
            <>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                ${product.discountPrice.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>

        <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
          {product.tags.slice(0, 3).map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Box>

        {product.stock <= 10 && product.stock > 0 && (
          <Typography variant="body2" color="warning.main">
            Only {product.stock} left in stock!
          </Typography>
        )}

        {product.stock === 0 && (
          <Typography variant="body2" color="error.main">
            Out of Stock
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ padding: 2, paddingTop: 0 }}>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          fullWidth
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;