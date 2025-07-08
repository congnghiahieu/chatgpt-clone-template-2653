
import UserMenu from './UserMenu';

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  return (
    <div className='fixed top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur'>
      <div className='flex h-[60px] items-center justify-between px-4'>
        <div className='flex items-center gap-2'>
          <span className={`font-semibold text-gray-900 dark:text-gray-100 ${!isSidebarOpen ? 'ml-24' : ''}`}>
            VPBank Text2SQL
          </span>
        </div>
        <UserMenu />
      </div>
    </div>
  );
};

export default ChatHeader;
