'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { tournamentsService } from '@/services/tournamentsService';
import { getSportLabel, getTournamentStatusLabel } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EntityCard, { EntityGrid } from '@/components/ui/EntityCard';
import Modal from '@/components/ui/Modal';
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function TournamentsPage() {
  const router = useRouter();
  const { data: tournaments, loading, refetch } = useApi(
    useCallback(() => tournamentsService.getAll(), [])
  );
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await tournamentsService.delete(deleteId);
      showToast('Tournament deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete tournament', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const statusVariant = (val) => {
    if (val === 0) return 'info';
    if (val === 1) return 'success';
    return 'default';
  };

  return (
    <>
      <PageHeader title="Tournaments" description="Manage tournaments and competitions">
        <Link href="/tournaments/create">
          <Button variant="primary" icon="➕">Add Tournament</Button>
        </Link>
      </PageHeader>
      
      {loading ? (
        <SkeletonGrid cards={6} />
      ) : tournaments?.length === 0 ? (
        <div className="empty-state">
          <p>No tournaments found. Start by creating your first tournament!</p>
          <Link href="/tournaments/create">
            <Button variant="secondary">Create Tournament</Button>
          </Link>
        </div>
      ) : (
        <EntityGrid>
          {tournaments.map((t) => (
            <EntityCard
              key={t.id}
              title={t.name}
              subtitle={getSportLabel(t.sport)}
              image="/images/dummy/tournament.png"
              status={getTournamentStatusLabel(t.status)}
              statusVariant={statusVariant(t.status)}
              onClick={() => router.push(`/tournaments/${t.id}`)}
              actions={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(t.id);
                  }}
                >
                  Delete
                </Button>
              }
            />
          ))}
        </EntityGrid>
      )}

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Tournament" onConfirm={handleDelete} confirmText="Delete" confirmVariant="danger" loading={deleting}>
        Are you sure you want to delete this tournament?
      </Modal>
    </>
  );
}
