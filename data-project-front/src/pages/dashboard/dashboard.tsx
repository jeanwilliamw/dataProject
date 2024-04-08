import { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import {
  getAverageByCategoryByWorkCategory,
  getAverageByWorkCategory,
  getCategories,
} from '../../api/collects';
import useRequireAuth from '../../hooks/useRequireAuth';
import { MyChart } from './components/Scatterchart';
import Header from '../../components/header';
import { useApiBanner } from '../../contexts/apiBannerContext';
import ExportCSVButton from '../../components/ExportCSVButton';

function DashboardPage() {
  const { user } = useRequireAuth();
  const { setApiBanner } = useApiBanner();

  const [averageByWorkCategory, setAverageByWorkCategory] =
    useState<Record<string, number>>();
  const [averageByCategoryByWorkCategory, setAverageByCategoryByWorkCategory] =
    useState<Record<string, Record<string, number>>>();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getAverageByWorkCategory(user.access_token),
      getAverageByCategoryByWorkCategory(user.access_token),
      getCategories(user.access_token),
    ])
      .then(
        ([
          averageByWorkCategoryData,
          averageByCategoryByWorkCategoryData,
          categories,
        ]) => {
          setAverageByWorkCategory(averageByWorkCategoryData);
          setAverageByCategoryByWorkCategory(
            averageByCategoryByWorkCategoryData,
          );
          setCategories(categories);
        },
      )
      .catch(() => {
        setApiBanner({
          message: `La récupération des données a échoué`,
          type: 'failure',
        });
      });
  }, []);

  const barChartData = averageByWorkCategory
    ? Object.keys(averageByWorkCategory).map((category) => ({
        x: category,
        y: parseInt(averageByWorkCategory[category].toFixed(0)),
      }))
    : [];

  return (
    <div className="flex justify-center flex-col items-center">
      {user && <Header user={user} pageName="Tableau de bord" />}
      <ExportCSVButton />
      {averageByWorkCategory && (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mt-10">
          <h3 className="text-2xl font-semibold mb-4">
            Prix moyen par catégorie de travail
          </h3>
          <VictoryChart
            theme={VictoryTheme.material}
            width={1200}
            height={500}
            domainPadding={20}
          >
            <VictoryAxis tickFormat={barChartData.map((data) => data.x)} />
            <VictoryAxis
              tickFormat={(tick: string) => parseInt(tick)}
              dependentAxis
            />
            <VictoryBar
              data={barChartData}
              labels={({ datum }) => `${datum.y}€`}
            />
          </VictoryChart>
        </div>
      )}

      {averageByCategoryByWorkCategory && categories && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-8 max-w-7xl">
          <h3 className="text-2xl font-semibold mb-4">
            Prix moyen par catégorie et par catégorie de travail
          </h3>
          <MyChart
            data={averageByCategoryByWorkCategory}
            categories={categories}
          />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
