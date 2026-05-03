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
import ImageUpload from '@/components/ui/ImageUpload';
import { sportOptions, tournamentFormatOptions, tournamentTypeOptions } from '@/constants/enums';
import styles from './create.module.css';

export default function CreateTournamentPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const { values, errors, submitting, handleChange, handleSubmit, setFieldValue } = useForm(
    { 
      name: '', 
      description: '', 
      sport: 1, // Default to Cricket
      format: 1, // Default to T20
      type: 1, // Default to Knockout
      logoUrl: '',
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
    <div className={styles.container}>
      <PageHeader 
        title="Create Tournament" 
        description="Launch a new tournament and invite teams" 
      />
      
      <Card hover={false} className="glass">
        <CardBody>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Section 1: Basic Info */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>📝</span>
                <h3 className={styles.sectionTitle}>Basic Information</h3>
              </div>
              <div className={styles.grid}>
                <div style={{ gridColumn: 'span 1' }}>
                  <ImageUpload 
                    label="Tournament Logo" 
                    value={values.logoUrl} 
                    onChange={(val) => setFieldValue('logoUrl', val)} 
                    placeholder="Upload Logo"
                  />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                  <Input 
                    label="Tournament Name" 
                    name="name" 
                    placeholder="e.g. Summer Championship 2024" 
                    value={values.name} 
                    onChange={handleChange} 
                    error={errors.name} 
                    required 
                  />
                </div>
              </div>
              <div className={styles.grid}>
                <Select 
                  label="Sport" 
                  name="sport" 
                  options={sportOptions} 
                  value={values.sport} 
                  onChange={setFieldValue} 
                  required 
                />
                <Select 
                  label="Tournament Type" 
                  name="type" 
                  options={tournamentTypeOptions} 
                  value={values.type} 
                  onChange={setFieldValue} 
                  required 
                />
                <Select 
                  label="Match Format" 
                  name="format" 
                  options={tournamentFormatOptions} 
                  value={values.format} 
                  onChange={setFieldValue} 
                  required 
                />
                <Input 
                  label="Max Participating Teams" 
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
            </section>

            {/* Section 2: Schedule */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>📅</span>
                <h3 className={styles.sectionTitle}>Tournament Schedule</h3>
              </div>
              <div className={styles.grid}>
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
            </section>

            {/* Section 3: Additional Details */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>ℹ️</span>
                <h3 className={styles.sectionTitle}>Additional Details</h3>
              </div>
              <div className={styles.fullWidth}>
                <Input 
                  label="Description" 
                  name="description" 
                  placeholder="Tell us about the tournament, rules, prizes, etc..." 
                  value={values.description} 
                  onChange={handleChange} 
                  error={errors.description}
                  multiline
                  rows={4}
                />
              </div>
            </section>

            <div className={styles.actions}>
              <Button variant="ghost" onClick={() => router.back()} type="button">Cancel</Button>
              <Button type="submit" variant="primary" loading={submitting} icon="🏆">
                Create Tournament
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
