import { ethers } from 'ethers';
import SocialMediaABI from './SocialMediaABI.json';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

export const getContract = () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, SocialMediaABI, signer);
  }
  return null;
};

export const updateProfile = async (name: string, bio: string, profileImageUrl: string) => {
  const contract = getContract();
  if (contract) {
    try {
      const tx = await contract.updateProfile(name, bio, profileImageUrl);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }
  return false;
};

export const createPost = async (content: string) => {
  const contract = getContract();
  if (contract) {
    try {
      const tx = await contract.createPost(content);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      return false;
    }
  }
  return false;
};

export const getProfile = async (address: string) => {
  const contract = getContract();
  if (contract) {
    try {
      const profile = await contract.getProfile(address);
      return {
        name: profile.name,
        bio: profile.bio,
        profileImageUrl: profile.profileImageUrl
      };
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }
  return null;
};

export const getPosts = async () => {
  const contract = getContract();
  if (contract) {
    try {
      const postCount = await contract.getPostCount();
      const posts = [];
      for (let i = 0; i < postCount; i++) {
        const post = await contract.getPost(i);
        posts.push({
          author: post.author,
          content: post.content,
          timestamp: new Date(post.timestamp * 1000)
        });
      }
      return posts;
    } catch (error) {
      console.error('Error getting posts:', error);
      return [];
    }
  }
  return [];
};