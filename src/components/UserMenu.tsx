
import { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import UserPermissions from './UserPermissions';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <User className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        align="end"
      >
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user.username || 'User'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                VPBank Text2SQL
              </p>
            </div>
          </div>
          <UserPermissions username={user.username || 'user'} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
