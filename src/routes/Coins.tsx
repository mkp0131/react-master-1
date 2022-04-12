import { getCoins } from 'api';
import Loader from 'components/Loader';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const CoinList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const Coin = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 1em;
    background: ${(props) => props.theme.boxColor};
    border-radius: ${(props) => props.theme.bdRadius};
    padding: 1em;
    transition: all 0.5s;
    img {
      width: 30px;
      height: 30px;
    }
    &:hover {
      /* font-weight: 900; */
      color: ${(props) => props.theme.colors.main};
    }
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>('coins', getCoins);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>코인 리스트 | 다운비트</title>
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <div className="inner">
          <h1>다운비트</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <CoinList>
              {data?.slice(0, 100).map((coin) => (
                <Coin key={coin.id}>
                  <Link to={coin.id} state={{ name: coin.name }}>
                    <img
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                      alt={`coin.id`}
                    />
                    {coin.name}
                  </Link>
                </Coin>
              ))}
            </CoinList>
          )}
        </div>
      </div>
    </>
  );
};

export default Coins;
