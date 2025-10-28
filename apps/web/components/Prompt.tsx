import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

const Prompt = () => {
  return (
    <div>
      <Textarea
        className='h-24 text-white'
        placeholder='Create a Billion Dollar idea...'
      />
      <div className='flex justify-end pt-2'>
        <Button className='bg-white hover:bg-red-200 cursor-pointer'>
          <Send className='text-red-800' />
        </Button>
      </div>
    </div>
  );
};

export default Prompt;
