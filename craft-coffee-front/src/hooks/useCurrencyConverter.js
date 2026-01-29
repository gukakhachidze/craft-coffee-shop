import { useState, useEffect } from 'react';

export const useCurrencyConverter = () => {
  const [currency, setCurrency] = useState('GEL');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://bankofgeorgia.ge/api/currencies/convert/USD/GEL?amountFrom=1'
      );
      if (!response.ok) throw new Error('Failed to fetch exchange rate');
      const data = await response.json();
      setExchangeRate(data.rate || data.amountTo || 2.65);
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError(err.message);
      setExchangeRate(2.65);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'GEL' ? 'USD' : 'GEL'));
  };

  const convertPrice = (priceInGEL) => {
    if (!exchangeRate) return priceInGEL;
    if (currency === 'USD') {
      return priceInGEL / exchangeRate;
    }
    return priceInGEL;
  };

  const formatPrice = (priceInGEL) => {
    const converted = convertPrice(priceInGEL);
    const symbol = currency === 'GEL' ? '₾' : '$';
    return `${converted.toFixed(2)} ${symbol}`;
  };

  return {
    currency,
    toggleCurrency,
    convertPrice,
    formatPrice,
    exchangeRate,
    isLoading,
    error,
    refreshRate: fetchExchangeRate
  };
};
