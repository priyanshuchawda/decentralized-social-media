import { create } from 'ipfs-http-client';

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Bearer ${infuraApiKey}`,
  },
});

export const uploadToIPFS = async (content: string): Promise<string> => {
  try {
    const added = await client.add(content);
    return `https://ipfs.io/ipfs/${added.path}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};