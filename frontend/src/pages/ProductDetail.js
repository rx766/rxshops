import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  IconButton,
  Paper,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { selectFilteredProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import ProductCard from '../components/product/ProductCard';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes?.[0] || 'One Size');
      setSelectedColor(foundProduct.colors?.[0]?.name || 'Default');
    }
  }, [id, products]);

  if (!product) {
    return (
      <Container maxWidth="lg">
        <Box py={4} textAlign="center">
          <Typography variant="h6">Product not found</Typography>
          <Button onClick={() => navigate('/products')} sx={{ mt: 2 }}>
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const relatedProducts = products
    .filter(p => p._id !== product._id && p.category === product.category)
    .slice(0, 4);

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <Box
                component="img"
                src={product.images[0]?.url || 'https://via.placeholder.com/500x500/f5f5f5/666?text=No+Image'}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 500 },
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                {product.brand}
              </Typography>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Rating value={product.ratings.average} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({product.ratings.count} reviews)
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                {product.discountPrice ? (
                  <>
                    <Typography variant="h4" color="primary.main" fontWeight="bold">
                      ${product.discountPrice.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    {discountPercentage > 0 && (
                      <Chip label={`-${discountPercentage}%`} color="error" size="small" />
                    )}
                  </>
                ) : (
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    ${product.price.toFixed(2)}
                  </Typography>
                )}
              </Box>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              {product.sizes && product.sizes.length > 1 && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={selectedSize}
                    label="Size"
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography variant="body2">Quantity:</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={quantity}
                    size="small"
                    sx={{ width: 80 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                  <IconButton
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box mb={3}>
                {product.stock > 0 ? (
                  <Typography variant="body2" color="success.main">
                    {product.stock <= 10 ? `Only ${product.stock} left in stock!` : 'In Stock'}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error.main">
                    Out of Stock
                  </Typography>
                )}
              </Box>

              <Box display="flex" gap={2} mb={3}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CartIcon />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  sx={{ flex: 1 }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {relatedProducts.length > 0 && (
          <Box mt={6}>
            <Typography variant="h5" gutterBottom>
              Related Products
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item key={relatedProduct._id} xs={12} sm={6} md={3}>
                  <ProductCard product={relatedProduct} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetail;
