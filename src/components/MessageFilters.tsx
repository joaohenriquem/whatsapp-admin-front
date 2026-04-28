import { Search } from 'lucide-react';

interface Filters {
  direction: string;
  status: string;
  startDate: string;
  endDate: string;
  search: string;
}

interface MessageFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function MessageFilters({ filters, onChange }: MessageFiltersProps) {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">
            Direção
          </label>
          <select
            value={filters.direction}
            onChange={(e) => update('direction', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="whatsapp_to_slack">WhatsApp → Slack</option>
            <option value="slack_to_whatsapp">Slack → WhatsApp</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => update('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="sent">Enviado</option>
            <option value="delivered">Entregue</option>
            <option value="read">Lido</option>
            <option value="failed">Falhou</option>
            <option value="pending">Pendente</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">
            Data Início
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => update('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">
            Data Fim
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => update('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium mb-1 text-gray-500 dark:text-gray-400">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              placeholder="Telefone, nome ou texto..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
