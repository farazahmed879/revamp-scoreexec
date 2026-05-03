'use client';

import { useCallback, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { usersService } from '@/services/usersService';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '@/components/ui/DataTable';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export default function UsersPage() {
  const { data: users, loading, refetch } = useApi(
    useCallback(() => usersService.getAll(), [])
  );
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await usersService.delete(deleteId);
      showToast('User deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete user', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { title: 'Full Name', key: 'fullName', dataIndex: 'fullName' },
    { title: 'Email', key: 'email', dataIndex: 'email' },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (val) => <Badge variant="purple">{val || '—'}</Badge>,
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
      <PageHeader title="Users" description="Manage platform users" />
      <DataTable columns={columns} data={users || []} loading={loading} emptyMessage="No users found." />
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete User" onConfirm={handleDelete} confirmText="Delete" confirmVariant="danger" loading={deleting}>
        Are you sure you want to delete this user?
      </Modal>
    </>
  );
}
