'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { teamsService } from '@/services/teamsService';
import PageHeader from '@/components/layout/PageHeader';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';

export default function CreateTeamPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const { values, errors, submitting, handleChange, handleSubmit } = useForm(
    { name: '', logoUrl: '', homeColor: '#3b82f6', awayColor: '#ef4444' },
    async (vals) => {
      try {
        await teamsService.create(vals);
        showToast('Team created successfully!', 'success');
        router.push('/teams');
      } catch (err) {
        showToast(err.response?.data?.error || 'Failed to create team', 'error');
        throw err;
      }
    },
    (vals) => {
      const errs = {};
      if (!vals.name?.trim()) errs.name = 'Team name is required';
      return errs;
    }
  );

  return (
    <>
      <PageHeader title="Add Team" description="Create a new team" />
      <Card hover={false}>
        <CardBody>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', maxWidth: 720 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
              <Input label="Team Name" name="name" placeholder="Enter team name" value={values.name} onChange={handleChange} error={errors.name} required />
              <Input label="Logo URL" name="logoUrl" placeholder="https://..." value={values.logoUrl} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
              <Input label="Home Color" name="homeColor" type="color" value={values.homeColor} onChange={handleChange} />
              <Input label="Away Color" name="awayColor" type="color" value={values.awayColor} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-default)' }}>
              <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" variant="primary" loading={submitting}>Create Team</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
