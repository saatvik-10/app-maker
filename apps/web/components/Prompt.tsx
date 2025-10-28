'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { BACKEND_URL } from '@/lib/config';

const Prompt = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { getToken } = useAuth();

  const handlePrompt = async () => {
    const token = await getToken();
    const res = axios.post(
      `${BACKEND_URL}/projects`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  };

  return (
    <div>
      <Textarea
        className='h-24 text-white'
        placeholder='Create a Billion Dollar idea...'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex justify-end pt-2'>
        <Button
          className='bg-white hover:bg-red-200 cursor-pointer'
          onClick={handlePrompt}
        >
          <Send className='text-red-800' />
        </Button>
      </div>
    </div>
  );
};

export default Prompt;
