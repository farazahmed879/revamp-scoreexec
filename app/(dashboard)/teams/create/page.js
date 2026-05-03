'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { teamsService } from '@/services/teamsService';
import PageHeader from '@/components/layout/PageHeader';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import ImageUpload from '@/components/ui/ImageUpload';
import styles from './create.module.css';

export default function CreateTeamPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const { values, errors, submitting, handleChange, handleSubmit, setFieldValue } = useForm(
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
    <div className={styles.container}>
      <PageHeader title="Add Team" description="Create a new team for competition" />
      <Card hover={false} className="glass">
        <CardBody>
          <form onSubmit={handleSubmit} className={styles.form}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>🛡️</span>
                <h3 className={styles.sectionTitle}>Team Profile</h3>
              </div>
              <div className={styles.grid}>
                <ImageUpload 
                  label="Team Logo" 
                  value={values.logoUrl} 
                  onChange={(val) => setFieldValue('logoUrl', val)} 
                  placeholder="Upload Logo"
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <Input 
                    label="Team Name" 
                    name="name" 
                    placeholder="e.g. Mumbai Indians" 
                    value={values.name} 
                    onChange={handleChange} 
                    error={errors.name} 
                    required 
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                    <Input 
                      label="Home Color" 
                      name="homeColor" 
                      type="color" 
                      value={values.homeColor} 
                      onChange={handleChange} 
                    />
                    <Input 
                      label="Away Color" 
                      name="awayColor" 
                      type="color" 
                      value={values.awayColor} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.actions}>
              <Button variant="ghost" onClick={() => router.back()} type="button">Cancel</Button>
              <Button type="submit" variant="primary" loading={submitting} icon="🛡️">
                Create Team
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
