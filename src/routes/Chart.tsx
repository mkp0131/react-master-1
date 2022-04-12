import { getCoinOHLC } from 'api';
import { isDarkAtom } from 'atoms';
import Loader from 'components/Loader';
import { useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

type RouterParams = {
  coinId: string;
};

interface IChartData {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

const Chart = () => {
  const { coinId } = useParams<RouterParams>();
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;

  const { isLoading, data: chartData } = useQuery<IChartData[]>(
    ['chart', coinId],
    () => getCoinOHLC(coinId!, startDate, endDate)
  );

  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ApexChart
          options={{
            chart: {
              toolbar: {
                show: false,
              },
            },
            theme: {
              mode: `${isDark ? 'dark' : 'light'}`,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#eb3c3c',
                  downward: '#3f3bfa',
                },
              },
            },
            xaxis: {
              labels: {
                formatter: function (value) {
                  const date = new Date(value);
                  return `${date.getFullYear()}.${(
                    '00' +
                    (date.getMonth() + 1)
                  ).slice(-2)}.${('00' + date.getDate()).slice(-2)}`;
                  return date.toString();
                },
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                formatter: function (value) {
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
                },
              },
            },
          }}
          series={[
            {
              data:
                chartData?.map((chart) => ({
                  x: chart.time_open,
                  y: [
                    chart.open.toFixed(4),
                    chart.high.toFixed(4),
                    chart.low.toFixed(4),
                    chart.close.toFixed(4),
                  ],
                })) ?? [],
            },
          ]}
          type="candlestick"
          height="350"
        />
      )}
    </>
  );
};

export default Chart;
