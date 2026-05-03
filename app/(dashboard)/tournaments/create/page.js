'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { tournamentsService } from '@/services/tournamentsService';
import PageHeader from '@/components/layout/PageHeader';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import { sportOptions, tournamentFormatOptions } from '@/constants/enums';

export default function CreateTournamentPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const { values, errors, submitting, handleChange, handleSubmit, setFieldValue } = useForm(
    { 
      name: '', 
      description: '', 
      sport: 1, // Default to Cricket
      format: 1, // Default to T20
      startDate: '',
      endDate: '',
      maxTeams: 8
    },
    async (vals) => {
      try {
        await tournamentsService.create({
          ...vals,
          maxTeams: parseInt(vals.maxTeams)
        });
        showToast('Tournament created successfully!', 'success');
        router.push('/tournaments');
      } catch (err) {
        showToast(err.response?.data?.error || 'Failed to create tournament', 'error');
        throw err;
      }
    },
    (vals) => {
      const errs = {};
      if (!vals.name?.trim()) errs.name = 'Tournament name is required';
      if (!vals.startDate) errs.startDate = 'Start date is required';
      if (!vals.endDate) errs.endDate = 'End date is required';
      if (vals.startDate && vals.endDate && new Date(vals.startDate) > new Date(vals.endDate)) {
        errs.endDate = 'End date cannot be before start date';
      }
      if (!vals.maxTeams || vals.maxTeams < 2) errs.maxTeams = 'At least 2 teams required';
      return errs;
    }
  );

  return (
    <>
      <PageHeader 
        title="Create Tournament" 
        description="Launch a new tournament and invite teams" 
      />
      <div className="animate-fade-in" style={{ maxWidth: 800 }}>
        <Card hover={false}>
          <CardBody>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-lg)' }}>
                <Input 
                  label="Tournament Name" 
                  name="name" 
                  placeholder="e.g. Summer Championship 2024" 
                  value={values.name} 
                  onChange={handleChange} 
                  error={errors.name} 
                  required 
                />
                <Input 
                  label="Description" 
                  name="description" 
                  placeholder="Tell us about the tournament..." 
                  value={values.description} 
                  onChange={handleChange} 
                  error={errors.description}
                  multiline
                  rows={3}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                <Select 
                  label="Sport" 
                  name="sport" 
                  options={sportOptions} 
                  value={values.sport} 
                  onChange={setFieldValue} 
                  required 
                />
                <Select 
                  label="Format" 
                  name="format" 
                  options={tournamentFormatOptions} 
                  value={values.format} 
                  onChange={setFieldValue} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                <Input 
                  label="Start Date" 
                  name="startDate" 
                  type="date" 
                  value={values.startDate} 
                  onChange={handleChange} 
                  error={errors.startDate} 
                  required 
                />
                <Input 
                  label="End Date" 
                  name="endDate" 
                  type="date" 
                  value={values.endDate} 
                  onChange={handleChange} 
                  error={errors.endDate} 
                  required 
                />
              </div>

              <div style={{ maxWidth: '200px' }}>
                <Input 
                  label="Max Teams" 
                  name="maxTeams" 
                  type="number" 
                  min={2}
                  max={128}
                  value={values.maxTeams} 
                  onChange={handleChange} 
                  error={errors.maxTeams} 
                  required 
                />
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 'var(--space-md)', 
                paddingTop: 'var(--space-lg)', 
                borderTop: '1px solid var(--border-default)',
                marginTop: 'var(--space-md)'
              }}>
                <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" variant="primary" loading={submitting}>
                  Create Tournament
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
