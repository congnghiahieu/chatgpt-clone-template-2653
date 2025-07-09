
import { Copy, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MessageActions = () => {
  const handleCopy = () => {
    // Copy functionality would be implemented here
    console.log('Copy message');
  };

  const handleLike = () => {
    console.log('Like message');
  };

  const handleDislike = () => {
    console.log('Dislike message');
  };

  const handleRegenerate = () => {
    console.log('Regenerate response');
  };

  return (
    <div className='flex items-center gap-1 pt-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleCopy}
              className='h-7 w-7 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            >
              <Copy className='h-3 w-3' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sao chép</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleLike}
              className='h-7 w-7 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            >
              <ThumbsUp className='h-3 w-3' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Thích</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleDislike}
              className='h-7 w-7 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            >
              <ThumbsDown className='h-3 w-3' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Không thích</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleRegenerate}
              className='h-7 w-7 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            >
              <RefreshCw className='h-3 w-3' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tạo lại</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MessageActions;
