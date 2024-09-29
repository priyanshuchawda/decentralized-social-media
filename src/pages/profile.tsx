import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useWallet } from '@/hooks/useWallet';
import { uploadToIPFS } from '@/utils/ipfs';
import { updateProfile, getProfile } from '@/utils/contractInteraction';

export default function Profile() {
  const { address } = useWallet();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (address) {
      fetchProfile();
    }
  }, [address]);

  const fetchProfile = async () => {
    if (address) {
      const profile = await getProfile(address);
      if (profile) {
        setName(profile.name);
        setBio(profile.bio);
        setProfileImage(profile.profileImageUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      const profileImageUrl = await uploadToIPFS(profileImage);
      const success = await updateProfile(name, bio, profileImageUrl);
      if (success) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // ... rest of the component remains the same
}