
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
          placeholder='Message Claude'
          className='w-full resize-none rounded-full bg-[#2F2F2F] px-4 py-4 pr-20 pl-12 focus:outline-none dark:bg-[#2F2F2F] light:bg-gray-100 light:text-black'
          style={{ maxHeight: '200px' }}
          disabled={isLoading}
        />
        
        <div className='absolute left-3 top-[50%] -translate-y-[50%]'>
          <SessionUpload onFileUpload={handleFileUpload} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
          className='absolute right-3 top-[50%] -translate-y-[50%] rounded-full bg-white p-1.5 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:hover:bg-gray-200'
        >
          {isLoading ?
            <Loader2 className='h-4 w-4 animate-spin text-black' />
          : <ArrowUp className='h-4 w-4 text-black' />}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
