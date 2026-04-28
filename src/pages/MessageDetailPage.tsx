import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../lib/api';
import type { MessageDTO } from '../lib/types';

const N8N_BASE_URL = import.meta.env.VITE_N8N_URL || 'https://n8n-credit.testegerencianet.com.br';

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

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</dt>
      <dd className="text-sm">{value ?? '—'}</dd>
    </div>
  );
}

export function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: message, isLoading, error } = useQuery<MessageDTO>({
    queryKey: ['message', id],
    queryFn: async () => {
      const { data } = await api.get(`/messages/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Mensagem não encontrada</p>
        <Link to="/mensagens" className="text-blue-600 hover:underline text-sm">
          ← Voltar para mensagens
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link
        to="/mensagens"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar para mensagens
      </Link>

      <h2 className="text-xl font-bold">Detalhes da Mensagem</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="ID" value={<span className="font-mono text-xs">{message.id}</span>} />
          <Field label="Direção" value={directionLabels[message.direction] ?? message.direction} />
          <Field label="Telefone do Remetente" value={message.sender_phone} />
          <Field label="Nome do Remetente" value={message.sender_name} />
          <Field label="Status" value={statusLabels[message.status] ?? message.status} />
          <Field label="Usuário Slack" value={message.slack_user} />
          <Field label="Canal Slack" value={message.slack_channel} />
          <Field label="ID Mensagem WhatsApp" value={message.whatsapp_message_id} />
          <Field
            label="Execução n8n"
            value={
              message.n8n_execution_id ? (
                <a
                  href={`${N8N_BASE_URL}/execution/${message.n8n_execution_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                >
                  {message.n8n_execution_id}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : null
            }
          />
          <Field
            label="Criado em"
            value={format(parseISO(message.created_at), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
          />
          <Field
            label="Atualizado em"
            value={format(parseISO(message.updated_at), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
          />
        </dl>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Texto da Mensagem
          </h3>
          <p className="text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
            {message.message_text}
          </p>
        </div>
      </div>
    </div>
  );
}
