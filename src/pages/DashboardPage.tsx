import { useQuery } from '@tanstack/react-query';
import { MessageSquare, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import api from '../lib/api';
import type { StatsResponse } from '../lib/types';
import { StatsCard } from '../components/StatsCard';
import { VolumeChart } from '../components/VolumeChart';

export function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery<StatsResponse>({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/messages/stats');
      return data;
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
          <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erro ao carregar estatísticas. Tente novamente.</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Hoje"
          value={stats.todayTotal}
          icon={<MessageSquare className="h-6 w-6" />}
        />
        <StatsCard
          label="WhatsApp → Slack"
          value={stats.todayByDirection.whatsapp_to_slack ?? 0}
          icon={<ArrowRightLeft className="h-6 w-6" />}
        />
        <StatsCard
          label="Slack → WhatsApp"
          value={stats.todayByDirection.slack_to_whatsapp ?? 0}
          icon={<ArrowRightLeft className="h-6 w-6" />}
        />
        <StatsCard
          label="Taxa de Falha"
          value={`${stats.todayFailureRate.toFixed(1)}%`}
          icon={<AlertTriangle className="h-6 w-6" />}
        />
      </div>

      <VolumeChart data={stats.dailyVolume} />
    </div>
  );
}
