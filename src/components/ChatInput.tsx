
import { useState } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import SessionUpload from './SessionUpload';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [sessionFiles, setSessionFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (files: File[]) => {
    setSessionFiles(files);
    console.log('Session files updated:', files);
  };

  return (
    <div className='relative flex w-full flex-col items-center'>
      <div className='relative w-full'>
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Hỏi VPBank Text2SQL Assistant...'
          className='w-full resize-none rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-4 pr-20 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
          style={{ maxHeight: '200px' }}
          disabled={isLoading}
        />
        
        <div className='absolute left-3 top-[50%] -translate-y-[50%]'>
          <SessionUpload onFileUpload={handleFileUpload} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
          className='absolute right-3 top-[50%] -translate-y-[50%] rounded-full bg-blue-500 hover:bg-blue-600 p-1.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500'
        >
          {isLoading ?
            <Loader2 className='h-4 w-4 animate-spin text-white' />
          : <ArrowUp className='h-4 w-4 text-white' />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
