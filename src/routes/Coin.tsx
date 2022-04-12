import { getCoinData, getCoinTicker } from 'api';
import Loader from 'components/Loader';
import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type RouterParams = {
  coinId: string;
};

interface RouterState {
  state: {
    name: string;
  };
}

interface ICoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface ICoinTicker {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const CoinInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  padding: 1em;
  background: ${(props) => props.theme.boxColor};
  border-radius: ${(props) => props.theme.bdRadius};
  .info-box {
    text-align: center;
    .title {
      font-size: 0.85rem;
    }
    .txt {
      font-weight: 700;
    }
  }
`;

const CoinSupply = styled(CoinInfo)`
  grid-template-columns: repeat(2, 2fr);
  margin-top: 1em;
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 1em;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const LinkBox = styled.div<{ isActive: boolean }>`
  background: ${(props) =>
    props.isActive ? props.theme.colors.main : props.theme.colors.btn};
  color: #fff;
  border-radius: ${(props) => props.theme.bdRadius};
  &:hover {
    background: ${(props) => props.theme.colors.main};
  }
  a {
    padding: 0.5em;
  }
`;

const CoinDesc = styled.div`
  margin-top: 1em;
  line-height: 1.25;
  padding: 0 1em;
`;

const BtnBack = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.btn};
    svg {
      width: 15px;
      path {
        fill: ${(props) => props.theme.colors.btn};
      }
    }
  }
`;

const priceFormatter = (value: number) => {
  let result = value.toFixed(4).toString();
  const resultLength = result.length;

  if (resultLength > 8) {
    result = result.substring(0, 4);
  } else if (resultLength > 7) {
    result = result.substring(0, 6);
  } else if (resultLength > 6) {
    result = result.substring(0, 7);
  }

  return '$' + result;
};

const Coin = () => {
  const { coinId } = useParams<RouterParams>();
  const location = useLocation();
  const { state } = location as RouterState;
  const matchChart = useMatch('/:coinId/chart');
  const matchPrice = useMatch('/:coinId/price');

  const {
    isLoading: dataLoading,
    isFetching: dataFatching,
    data: coinData,
  } = useQuery<ICoinData>(['data', coinId], () => getCoinData(coinId!));

  const {
    isLoading: tickerLoading,
    isFetching: tickerFatching,
    data: tickerData,
  } = useQuery<ICoinTicker>(['ticker', coinId], () => getCoinTicker(coinId!), {
    refetchInterval: 5000,
  });

  const isLoading = dataLoading || tickerLoading;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name
              ? state.name
              : dataLoading
              ? 'Loading...'
              : coinData?.name}{' '}
            | 다운비트
          </title>
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <div className="inner">
          <BtnBack>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
              뒤로가기
            </Link>
          </BtnBack>
          <h1>
            {state?.name
              ? state.name
              : dataLoading
              ? 'Loading...'
              : coinData?.name}
          </h1>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CoinInfo>
                <div className="info-box">
                  <div className="title">랭킹</div>
                  <div className="txt">{coinData?.rank}</div>
                </div>
                <div className="info-box">
                  <div className="title">심볼</div>
                  <div className="txt">{coinData?.symbol}</div>
                </div>
                <div className="info-box">
                  <div className="title">실시간 가격</div>
                  <div className="txt">
                    {priceFormatter(tickerData?.quotes.USD.price!)}
                  </div>
                </div>
              </CoinInfo>
              <CoinDesc>{coinData?.description}</CoinDesc>
              <CoinSupply>
                <div className="info-box">
                  <div className="title">전체 발행 갯수</div>
                  <div className="txt">
                    {tickerData?.circulating_supply.toLocaleString('ko-kr')}
                  </div>
                </div>
                <div className="info-box">
                  <div className="title">전체 갯수</div>
                  <div className="txt">
                    {tickerData?.total_supply.toLocaleString('ko-kr')}
                  </div>
                </div>
              </CoinSupply>
              <LinkContainer>
                <LinkBox isActive={matchChart !== null}>
                  <Link to="chart" state={{ coinId }}>
                    차트
                  </Link>
                </LinkBox>
                <LinkBox isActive={matchPrice !== null}>
                  <Link to="price" state={{ price: tickerData?.quotes.USD }}>
                    가격
                  </Link>
                </LinkBox>
              </LinkContainer>
              <Outlet />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Coin;
