// Utility function to format currency in INR
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Alternative simple format with ₹ symbol
export const formatINRSimple = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};