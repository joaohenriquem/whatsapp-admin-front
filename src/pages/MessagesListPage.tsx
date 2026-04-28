import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { MessageDTO, PaginatedResponse } from '../lib/types';
import { MessageFilters } from '../components/MessageFilters';
import { MessageTable } from '../components/MessageTable';
import { PaginationControls } from '../components/PaginationControls';
import { ExportButton } from '../components/ExportButton';

export function MessagesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    direction: searchParams.get('direction') || '',
    status: searchParams.get('status') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    search: searchParams.get('search') || '',
  };

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 20;

  const queryParams = useMemo(() => {
    const params: Record<string, string> = { page: String(page), pageSize: String(pageSize) };
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params[k] = v;
    });
    return params;
  }, [page, pageSize, filters.direction, filters.status, filters.startDate, filters.endDate, filters.search]);

  const { data, isLoading } = useQuery<PaginatedResponse<MessageDTO>>({
    queryKey: ['messages', queryParams],
    queryFn: async () => {
      const { data } = await api.get('/messages', { params: queryParams });
      return data;
    },
  });

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) next.set(k, v);
      else next.delete(k);
    });
    setSearchParams(next);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    updateParams({ ...newFilters, page: '1' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Mensagens</h2>
        <ExportButton filters={filters} totalCount={data?.pagination.totalCount ?? 0} />
      </div>

      <MessageFilters filters={filters} onChange={handleFiltersChange} />

      <MessageTable messages={data?.data ?? []} loading={isLoading} />

      {data && (
        <PaginationControls
          page={data.pagination.page}
          pageSize={data.pagination.pageSize}
          totalCount={data.pagination.totalCount}
          totalPages={data.pagination.totalPages}
          onPageChange={(p) => updateParams({ page: String(p) })}
          onPageSizeChange={(s) => updateParams({ pageSize: String(s), page: '1' })}
        />
      )}
    </div>
  );
}
