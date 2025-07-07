import { Volume2, ThumbsUp, ThumbsDown, Copy, RotateCcw, MoreHorizontal } from 'lucide-react';

const MessageActions = () => {
  return (
    <div className='flex items-center gap-2 text-gray-400'>
      <button className='p-1 transition-colors hover:text-white'>
        <Volume2 className='h-4 w-4' />
      </button>
      <button className='p-1 transition-colors hover:text-white'>
        <ThumbsUp className='h-4 w-4' />
      </button>
      <button className='p-1 transition-colors hover:text-white'>
        <ThumbsDown className='h-4 w-4' />
      </button>
      <button className='p-1 transition-colors hover:text-white'>
        <Copy className='h-4 w-4' />
      </button>
      <button className='p-1 transition-colors hover:text-white'>
        <RotateCcw className='h-4 w-4' />
      </button>
      <button className='p-1 transition-colors hover:text-white'>
        <MoreHorizontal className='h-4 w-4' />
      </button>
    </div>
  );
};

export default MessageActions;
