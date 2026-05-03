'use client';

import { useState, useEffect } from 'react';
import { accountService } from '@/services/accountService';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import PageHeader from '@/components/layout/PageHeader';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import styles from './account.module.css';

export default function AccountPage() {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  
  const [emailData, setEmailData] = useState({
    newEmail: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || ''
      });
      setEmailData({ newEmail: user.email || '' });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await accountService.updateProfile(profileData);
      showToast('Profile updated successfully', 'success');
      await refreshUser();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await accountService.changeEmail(emailData);
      showToast('Email updated successfully. Please login again if required.', 'success');
      await refreshUser();
    } catch (err) {
      showToast(err.response?.data?.[0]?.description || 'Failed to change email', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await accountService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      showToast('Password changed successfully', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showToast(err.response?.data?.[0]?.description || 'Failed to change password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader 
        title="Account Settings" 
        description="Manage your personal information and security settings" 
      />

      <div className="stagger-children">
        {/* Personal Information */}
        <section className={styles.section}>
          <div>
            <h2 className={styles.sectionTitle}>👤 Personal Information</h2>
            <p className={styles.sectionDesc}>Update your basic profile details</p>
          </div>
          <form onSubmit={handleUpdateProfile} className={styles.form}>
            <div className={styles.formGrid}>
              <Input 
                label="First Name" 
                value={profileData.firstName} 
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                placeholder="Enter first name"
              />
              <Input 
                label="Last Name" 
                value={profileData.lastName} 
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                placeholder="Enter last name"
              />
              <Input 
                label="Phone Number" 
                value={profileData.phoneNumber} 
                onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className={styles.actions}>
              <Button type="submit" variant="primary" loading={loading}>Save Changes</Button>
            </div>
          </form>
        </section>

        {/* Email Address */}
        <section className={styles.section}>
          <div>
            <h2 className={styles.sectionTitle}>📧 Email Address</h2>
            <p className={styles.sectionDesc}>Update your contact email</p>
          </div>
          <form onSubmit={handleChangeEmail} className={styles.form}>
            <div className={styles.formGrid}>
              <Input 
                label="New Email Address" 
                type="email"
                value={emailData.newEmail} 
                onChange={(e) => setEmailData({...emailData, newEmail: e.target.value})}
                placeholder="Enter new email"
              />
            </div>
            <div className={styles.actions}>
              <Button type="submit" variant="primary" loading={loading}>Update Email</Button>
            </div>
          </form>
        </section>

        {/* Security / Password */}
        <section className={styles.section}>
          <div>
            <h2 className={styles.sectionTitle}>🔒 Security</h2>
            <p className={styles.sectionDesc}>Change your account password</p>
          </div>
          <form onSubmit={handleChangePassword} className={styles.form}>
            <div className={styles.formGrid}>
              <Input 
                label="Current Password" 
                type="password"
                value={passwordData.currentPassword} 
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                placeholder="••••••••"
              />
              <Input 
                label="New Password" 
                type="password"
                value={passwordData.newPassword} 
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                placeholder="••••••••"
              />
              <Input 
                label="Confirm New Password" 
                type="password"
                value={passwordData.confirmPassword} 
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <div className={styles.actions}>
              <Button type="submit" variant="primary" loading={loading}>Change Password</Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
