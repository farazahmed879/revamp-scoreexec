'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    setError('');
    try {
      await login(email, password);
      showToast('Login successful! Welcome back.', 'success');
      router.push('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className={styles.container}>
      {/* Animated background orbs */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      <div className={`${styles.card} ${shake ? styles.shake : ''}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoIcon}>⚡</div>
          <h1 className={styles.title}>ScorEXEC</h1>
          <p className={styles.subtitle}>Sports Scoring SaaS Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            name="email"
            type="text"
            placeholder="admin@scorexec.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="✉"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="🔒"
          />

          {error && (
            <div className={styles.error}>
              <span>⚠</span> {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            block
            loading={loading}
          >
            Sign In
          </Button>
        </form>

        <p className={styles.footer}>
          Secure login • Your data is encrypted
        </p>
      </div>
    </div>
  );
}
