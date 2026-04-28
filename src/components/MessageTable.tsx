import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { MessageDTO } from '../lib/types';

const statusColors: Record<string, string> = {
  sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  read: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
};

const statusLabels: Record<string, string> = {
  sent: 'Enviado',
  delivered: 'Entregue',
  read: 'Lido',
  failed: 'Falhou',
  pending: 'Pendente',
};

const directionLabels: Record<string, string> = {
  whatsapp_to_slack: 'WhatsApp → Slack',
  slack_to_whatsapp: 'Slack → WhatsApp',
};

interface MessageTableProps {
  messages: MessageDTO[];
  loading?: boolean;
}

export function MessageTable({ messages, loading }: MessageTableProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Nenhuma mensagem encontrada</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Direção</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Telefone</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Nome</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Mensagem</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Data</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              onClick={() => navigate(`/mensagens/${msg.id}`)}
              className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 whitespace-nowrap text-xs">
                {directionLabels[msg.direction] ?? msg.direction}
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">{msg.sender_phone}</td>
              <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">{msg.sender_name ?? '—'}</td>
              <td className="px-4 py-3 max-w-[200px] truncate">{msg.message_text}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[msg.status] ?? ''}`}>
                  {statusLabels[msg.status] ?? msg.status}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                {format(parseISO(msg.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
