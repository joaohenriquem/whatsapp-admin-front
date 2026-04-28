import { useState } from 'react';
import { Download } from 'lucide-react';
import api from '../lib/api';

interface ExportButtonProps {
  filters: Record<string, string>;
  totalCount: number;
}

export function ExportButton({ filters, totalCount }: ExportButtonProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [exporting, setExporting] = useState(false);

  const doExport = async () => {
    setExporting(true);
    setShowWarning(false);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      const { data } = await api.get(`/messages/export?${params.toString()}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `mensagens_export_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Erro ao exportar. Tente novamente.');
    } finally {
      setExporting(false);
    }
  };

  const handleClick = () => {
    if (totalCount > 10000) {
      setShowWarning(true);
    } else {
      doExport();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={exporting || totalCount === 0}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
      >
        <Download className="h-4 w-4" />
        {exporting ? 'Exportando...' : 'Exportar CSV'}
      </button>

      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Exportação grande</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              A exportação contém {totalCount.toLocaleString('pt-BR')} registros. Isso pode demorar alguns segundos. Deseja continuar?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={doExport}
                className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
