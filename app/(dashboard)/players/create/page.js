'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/useToast';
import { useApi } from '@/hooks/useApi';
import { playersService } from '@/services/playersService';
import { teamsService } from '@/services/teamsService';
import { battingStyleOptions, bowlingStyleOptions } from '@/constants/enums';
import PageHeader from '@/components/layout/PageHeader';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import styles from './create.module.css';

export default function CreatePlayerPage() {
  const router = useRouter();
  const { showToast } = useToast();
  
  const { data: teamsData, loading: loadingTeams } = useApi(
    useCallback(() => teamsService.getAll(), [])
  );

  const teamOptions = (teamsData || []).map(t => ({
    label: t.name,
    value: t.id
  }));

  const validate = (values) => {
    const errors = {};
    if (!values.firstName?.trim()) errors.firstName = 'First name is required';
    if (!values.lastName?.trim()) errors.lastName = 'Last name is required';
    return errors;
  };

  const { values, errors, submitting, handleChange, handleSubmit, setFieldValue } = useForm(
    {
      firstName: '',
      lastName: '',
      jerseyNumber: '',
      battingStyle: 0,
      bowlingStyle: 0,
      teamIds: [],
    },
    async (vals) => {
      try {
        await playersService.create({
          firstName: vals.firstName,
          lastName: vals.lastName,
          jerseyNumber: vals.jerseyNumber ? parseInt(vals.jerseyNumber) : null,
          battingStyle: parseInt(vals.battingStyle),
          bowlingStyle: parseInt(vals.bowlingStyle),
          teamIds: vals.teamIds
        });
        showToast('Player created successfully!', 'success');
        router.push('/players');
      } catch (err) {
        showToast(err.response?.data?.error || 'Failed to create player', 'error');
        throw err;
      }
    },
    validate
  );

  return (
    <>
      <PageHeader title="Add Player" description="Create a new player profile" />

      <Card hover={false}>
        <CardBody>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <Input
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>

            <div className={styles.row}>
              <Input
                label="Jersey Number"
                name="jerseyNumber"
                type="number"
                placeholder="e.g. 7"
                value={values.jerseyNumber}
                onChange={handleChange}
              />
              <Select
                label="Batting Style"
                name="battingStyle"
                options={battingStyleOptions}
                value={values.battingStyle}
                onChange={setFieldValue}
              />
            </div>

            <div className={styles.row}>
              <Select
                label="Bowling Style"
                name="bowlingStyle"
                options={bowlingStyleOptions}
                value={values.bowlingStyle}
                onChange={setFieldValue}
              />
              <MultiSelect
                label="Teams"
                name="teamIds"
                placeholder={loadingTeams ? 'Loading teams...' : 'Select teams'}
                options={teamOptions}
                value={values.teamIds}
                onChange={setFieldValue}
              />
            </div>

            <div className={styles.actions}>
              <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" variant="primary" loading={submitting}>
                Create Player
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
