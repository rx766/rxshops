import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Button,
  Chip,
  Rating,
  CircularProgress,
  Pagination,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import {
  selectFilteredProducts,
  selectProductFilters,
  selectCategories,
  setFilters,
  setSortBy,
  clearFilters,
} from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';

const ITEMS_PER_PAGE = 12;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const filters = useSelector(selectProductFilters);
  const categories = useSelector(selectCategories);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange);
  
  // Pagination
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
    setCurrentPage(1);
  };
  
  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };
  
  const handlePriceRangeChange = (event, newValue) => {
    setTempPriceRange(newValue);
  };
  
  const handlePriceRangeCommit = (event, newValue) => {
    dispatch(setFilters({ priceRange: newValue }));
    setCurrentPage(1);
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setTempPriceRange([0, 1000]);
    setCurrentPage(1);
  };
  
  const hasActiveFilters = filters.category || filters.rating > 0 || filters.searchTerm;
  
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        
        {/* Filter and Sort Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Button
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? "contained" : "outlined"}
              >
                Filters
              </Button>
              
              {hasActiveFilters && (
                <Button
                  startIcon={<ClearIcon />}
                  onClick={handleClearFilters}
                  color="secondary"
                >
                  Clear Filters
                </Button>
              )}
              
              <Typography variant="body2" color="text.secondary">
                {products.length} products found
              </Typography>
            </Box>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy || 'name'}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="name">Name A-Z</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {filters.category && (
                <Chip
                  label={`Category: ${filters.category}`}
                  onDelete={() => handleFilterChange('category', '')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.rating > 0 && (
                <Chip
                  label={`Rating: ${filters.rating}+ stars`}
                  onDelete={() => handleFilterChange('rating', 0)}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.searchTerm && (
                <Chip
                  label={`Search: "${filters.searchTerm}"`}
                  onDelete={() => handleFilterChange('searchTerm', '')}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          )}
        </Paper>
        
        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          {showFilters && (
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, position: 'sticky', top: 100 }}>
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
                
                {/* Category Filter */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filters.category}
                    label="Category"
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {/* Price Range Filter */}
                <Box sx={{ mb: 3 }}>
                  <Typography gutterBottom>Price Range</Typography>
                  <Slider
                    value={tempPriceRange}
                    onChange={handlePriceRangeChange}
                    onChangeCommitted={handlePriceRangeCommit}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    valueLabelFormat={(value) => `$${value}`}
                  />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2">${tempPriceRange[0]}</Typography>
                    <Typography variant="body2">${tempPriceRange[1]}</Typography>
                  </Box>
                </Box>
                
                {/* Rating Filter */}
                <Box sx={{ mb: 3 }}>
                  <Typography gutterBottom>Minimum Rating</Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {[4, 3, 2, 1].map((rating) => (
                      <Box
                        key={rating}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        onClick={() => handleFilterChange('rating', rating)}
                        sx={{
                          cursor: 'pointer',
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: filters.rating === rating ? 'action.selected' : 'transparent',
                          '&:hover': { backgroundColor: 'action.hover' }
                        }}
                      >
                        <Rating value={rating} readOnly size="small" />
                        <Typography variant="body2">& up</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )}
          
          {/* Products Grid */}
          <Grid item xs={12} md={showFilters ? 9 : 12}>
            {products.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters or search terms
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {currentProducts.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={showFilters ? 4 : 3}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
