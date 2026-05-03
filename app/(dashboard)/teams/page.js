'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { teamsService } from '@/services/teamsService';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EntityCard, { EntityGrid } from '@/components/ui/EntityCard';
import Modal from '@/components/ui/Modal';
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function TeamsPage() {
  const router = useRouter();
  const { data: teams, loading, refetch } = useApi(
    useCallback(() => teamsService.getAll(), [])
  );
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await teamsService.delete(deleteId);
      showToast('Team deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete team', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader title="Teams" description="Manage your cricket teams">
        <Link href="/teams/create">
          <Button variant="primary" icon="➕">Add Team</Button>
        </Link>
      </PageHeader>

      {loading ? (
        <SkeletonGrid cards={6} />
      ) : teams?.length === 0 ? (
        <div className="empty-state">No teams found. Add your first team!</div>
      ) : (
        <EntityGrid>
          {teams.map((team) => (
            <EntityCard
              key={team.id}
              title={team.name}
              image="/images/dummy/team.png"
              onClick={() => router.push(`/teams/${team.id}`)}
              stats={[
                { label: 'Home Color', value: team.homeColor || '—' },
                { label: 'Away Color', value: team.awayColor || '—' }
              ]}
              actions={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(team.id);
                  }}
                >
                  Delete
                </Button>
              }
            />
          ))}
        </EntityGrid>
      )}

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Team"
        onConfirm={handleDelete}
        confirmText="Delete"
        confirmVariant="danger"
        loading={deleting}
      >
        Are you sure you want to delete this team?
      </Modal>
    </>
  );
}
