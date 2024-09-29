import { useState } from 'react';
import Layout from '@/components/Layout';
import { useWallet } from '@/hooks/useWallet';
import { uploadToIPFS } from '@/utils/ipfs';
import { createPost } from '@/utils/contractInteraction';

export default function CreatePost() {
  const { address } = useWallet();
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
      const contentUrl = await uploadToIPFS(content);
      const success = await createPost(contentUrl);
      if (success) {
        console.log('Post created successfully');
        setContent('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // ... rest of the component remains the same
}