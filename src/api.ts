const BASE_URL = 'https://api.coinpaprika.com/v1';

export const getCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const getCoinData = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const getCoinTicker = (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};

export const getCoinOHLC = (coinId: string, start: number, end: number) => {
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${start}&end=${end}`
  ).then((res) => res.json());
};
