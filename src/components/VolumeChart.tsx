import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface VolumeChartProps {
  data: Array<{ date: string; count: number }>;
}

export function VolumeChart({ data }: VolumeChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    label: format(parseISO(item.date), 'dd/MM', { locale: ptBR }),
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Volume Diário (últimos 30 dias)</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Nenhum dado disponível
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Volume Diário (últimos 30 dias)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-gray-800, #1f2937)',
              border: 'none',
              borderRadius: '8px',
              color: '#f3f4f6',
            }}
            formatter={(value: number) => [value, 'Mensagens']}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
