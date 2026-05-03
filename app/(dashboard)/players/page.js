'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/hooks/useToast';
import { playersService } from '@/services/playersService';
import { getBattingStyleLabel, getBowlingStyleLabel } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EntityCard, { EntityGrid } from '@/components/ui/EntityCard';
import Modal from '@/components/ui/Modal';
import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function PlayersPage() {
  const { data: players, loading, refetch } = useApi(
    useCallback(() => playersService.getAll(), [])
  );
  const router = useRouter();
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await playersService.delete(deleteId);
      showToast('Player deleted successfully', 'success');
      setDeleteId(null);
      refetch();
    } catch {
      showToast('Failed to delete player', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader title="Players" description="Manage your cricket players roster">
        <Link href="/players/create">
          <Button variant="primary" icon="➕">Add Player</Button>
        </Link>
      </PageHeader>

      {loading ? (
        <SkeletonGrid cards={6} />
      ) : players?.length === 0 ? (
        <div className="empty-state">No players found. Add your first player!</div>
      ) : (
        <EntityGrid>
          {players.map((player) => (
            <EntityCard
              key={player.id}
              title={player.fullName}
              subtitle={`#${player.jerseyNumber || 'N/A'}`}
              image="/images/dummy/player.png"
              status={player.isActive ? 'Active' : 'Inactive'}
              statusVariant={player.isActive ? 'success' : 'danger'}
              onClick={() => router.push(`/players/${player.id}`)}
              stats={[
                { label: 'Batting', value: getBattingStyleLabel(player.battingStyle) },
                { label: 'Bowling', value: getBowlingStyleLabel(player.bowlingStyle) }
              ]}
              actions={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(player.id);
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
        title="Delete Player"
        onConfirm={handleDelete}
        confirmText="Delete"
        confirmVariant="danger"
        loading={deleting}
      >
        Are you sure you want to delete this player? This action cannot be undone.
      </Modal>
    </>
  );
}
