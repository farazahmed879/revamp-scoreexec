'use client';

import { useCallback, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { tenantsService } from '@/services/tenantsService';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/ui/DataTable';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function TenantsPage() {
  const { data: tenants, loading, refetch } = useApi(
    useCallback(() => tenantsService.getAll(), [])
  );
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await tenantsService.delete(deleteId);
      showToast('Tenant deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete tenant', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { title: 'Name', key: 'name', dataIndex: 'name' },
    { title: 'Slug', key: 'slug', dataIndex: 'slug' },
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
      <PageHeader title="Tenants" description="Manage platform tenants" />
      <DataTable columns={columns} data={tenants || []} loading={loading} emptyMessage="No tenants found." />
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Tenant" onConfirm={handleDelete} confirmText="Delete" confirmVariant="danger" loading={deleting}>
        Are you sure you want to delete this tenant?
      </Modal>
    </>
  );
}
