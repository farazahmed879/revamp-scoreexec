'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { matchesService } from '@/services/matchesService';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/ui/DataTable';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export default function MatchesPage() {
  const { data: matches, loading, refetch } = useApi(
    useCallback(() => matchesService.getAll(), [])
  );
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await matchesService.delete(deleteId);
      showToast('Match deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete match', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { title: 'Ground', key: 'ground', dataIndex: 'ground' },
    {
      title: 'Team 1',
      key: 'team1',
      dataIndex: 'team1',
      render: (val) => val?.name || '—',
    },
    {
      title: 'Team 2',
      key: 'team2',
      dataIndex: 'team2',
      render: (val) => val?.name || '—',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (val) => {
        const variants = { 0: 'info', 1: 'warning', 2: 'success' };
        const labels = { 0: 'Upcoming', 1: 'Live', 2: 'Completed' };
        return <Badge variant={variants[val] || 'default'}>{labels[val] || val}</Badge>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      sortable: false,
      render: (_, row) => (
        <Button variant="ghost" size="sm" onClick={() => setDeleteId(row.id)}>Delete</Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Matches" description="Manage cricket matches">
        <Link href="/matches/create">
          <Button variant="primary" icon="➕">Create Match</Button>
        </Link>
      </PageHeader>

      <DataTable columns={columns} data={matches || []} loading={loading} emptyMessage="No matches found." />

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Match" onConfirm={handleDelete} confirmText="Delete" confirmVariant="danger" loading={deleting}>
        Are you sure you want to delete this match?
      </Modal>
    </>
  );
}
