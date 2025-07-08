import { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import UserPermissions from './UserPermissions';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          <User className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-80 border-gray-200 bg-white p-0 dark:border-gray-700 dark:bg-gray-900'
        align='end'
      >
        <div className='p-4'>
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500'>
              <User className='h-5 w-5 text-white' />
            </div>
            <div>
              <p className='font-medium text-gray-900 dark:text-gray-100'>
                {user.username || 'User'}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>VPBank Text2SQL</p>
            </div>
          </div>
          <UserPermissions username={user.username || 'user'} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
