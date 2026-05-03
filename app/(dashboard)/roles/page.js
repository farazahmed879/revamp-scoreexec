'use client';

import { useCallback, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { rolesService } from '@/services/rolesService';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/ui/DataTable';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function RolesPage() {
  const { data: roles, loading, refetch } = useApi(
    useCallback(() => rolesService.getAll(), [])
  );
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await rolesService.delete(deleteId);
      showToast('Role deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete role', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { title: 'Role Name', key: 'name', dataIndex: 'name' },
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
      <PageHeader title="Roles" description="Manage user roles and permissions" />
      <DataTable columns={columns} data={roles || []} loading={loading} emptyMessage="No roles found." />
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Role" onConfirm={handleDelete} confirmText="Delete" confirmVariant="danger" loading={deleting}>
        Are you sure you want to delete this role?
      </Modal>
    </>
  );
}
