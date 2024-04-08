import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryScatter,
} from 'victory';
import { getPantoneColor } from '../functions/getPantoneColor';
import { transformData } from '../functions/transformData';

export const MyChart = ({
  data,
  categories,
}: {
  data: Record<string, Record<string, number>>;
  categories: { id: number; name: string }[];
}) => {
  const chartData = transformData(data, categories);

  return (
    <VictoryChart width={1200} height={700} domainPadding={20}>
      <VictoryLegend
        x={50}
        y={0}
        orientation="horizontal"
        gutter={20}
        data={categories.map((category) => ({
          name: category.name,
          symbol: { fill: getPantoneColor(category.id) },
        }))}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x}€`}
        style={{
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
      <VictoryAxis
        tickValues={Object.keys(data)}
        style={{
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
      <VictoryScatter
        data={Object.keys(chartData)
          .map((workCategory) =>
            Object.keys(chartData[workCategory]).map((category, index) => ({
              x: workCategory,
              y: parseInt(chartData[workCategory][category].toFixed(0)),
              label: `${chartData[workCategory][category].toFixed(0)}€`,
              category: index,
            })),
          )
          .flat()}
        labels={({ datum }) => datum.label}
        labelComponent={<VictoryLabel textAnchor="middle" dy={-10} />}
        size={5}
        style={{
          data: {
            fill: ({ datum }) => {
              return getPantoneColor(datum.category);
            },
          },
        }}
      />
    </VictoryChart>
  );
};
