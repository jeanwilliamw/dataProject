import { useState } from 'react';
import useRequireAuth from '../hooks/useRequireAuth';
import { getCollects } from '../api/collects';

const ExportCSVButton = () => {
  const { user } = useRequireAuth();
  const [loading, setLoading] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(10);

  const handleExport = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await getCollects(user.access_token, numberOfLines);

      const csvData = new Blob([convertToCSV(response)], {
        type: 'text/csv',
      });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(csvData);
      link.download = 'data.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
    setLoading(false);
  };

  const convertToCSV = (data: string[]) => {
    const header = Object.keys(data[0]).join(',');
    const body = data.map((row) => Object.values(row).join(',')).join('\n');
    return `${header}\n${body}`;
  };

  return (
    <div className="flex items-center space-x-4 mt-10">
      <label htmlFor="numberOfLines" className="text-sm font-semibold">
        Nombre de lignes :
      </label>
      <input
        type="number"
        id="numberOfLines"
        value={numberOfLines}
        onChange={(e) => setNumberOfLines(parseInt(e.target.value))}
        min="1"
        className="border border-gray-300 rounded-md p-1 w-20 text-sm"
      />
      <button
        onClick={handleExport}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded-md transition duration-200"
      >
        {loading ? 'Exportation en cours...' : 'Exporter en CSV'}
      </button>
    </div>
  );
};

export default ExportCSVButton;
