export const formatPrice = (value, opts = {}) => {

  const num = Number(value) || 0;

  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0, 
    ...opts,                  
  }).format(num);
};