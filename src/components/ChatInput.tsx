
import { useState, useRef } from 'react';
import { Send, Paperclip, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SessionUpload from './SessionUpload';

interface ChatInputProps {
  onSend: (message: string, options?: { search?: string; data?: string }) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [selectedSearchOption, setSelectedSearchOption] = useState<string>('');
  const [selectedDataOption, setSelectedDataOption] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      const options = {
        search: selectedSearchOption || undefined,
        data: selectedDataOption || undefined,
      };
      onSend(message.trim(), options);
      setMessage('');
      setSelectedSearchOption('');
      setSelectedDataOption('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Các tệp đã tải lên cho phiên này:', files);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='mx-auto max-w-4xl'>
        <div className='flex items-end gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900'>
          {/* File upload - external left */}
          <SessionUpload onFileUpload={handleFileUpload} />

          {/* Main input area */}
          <div className='flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-600 dark:bg-gray-800'>
            {/* Search option select */}
            <Select value={selectedSearchOption} onValueChange={setSelectedSearchOption}>
              <SelectTrigger className='w-[140px] border-0 bg-transparent p-0 h-auto shadow-none focus:ring-0'>
                <SelectValue placeholder="DeepSearch" />
                <ChevronDown className='h-3 w-3 opacity-50' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deep-thinking">Suy nghĩ sâu</SelectItem>
                <SelectItem value="deep-search">Tìm kiếm sâu</SelectItem>
              </SelectContent>
            </Select>

            <div className='h-4 w-px bg-gray-300 dark:bg-gray-600' />

            {/* Data option select */}
            <Select value={selectedDataOption} onValueChange={setSelectedDataOption}>
              <SelectTrigger className='w-[120px] border-0 bg-transparent p-0 h-auto shadow-none focus:ring-0'>
                <SelectValue placeholder="Think" />
                <ChevronDown className='h-3 w-3 opacity-50' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="raw-data">Dữ liệu thô</SelectItem>
                <SelectItem value="aggregated-data">Dữ liệu tổng hợp</SelectItem>
              </SelectContent>
            </Select>

            <div className='h-4 w-px bg-gray-300 dark:bg-gray-600' />

            {/* Text input */}
            <div className='flex-1'>
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder='What do you want to know?'
                disabled={isLoading}
                className='max-h-32 min-h-[24px] resize-none border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus:outline-none focus:ring-0 focus-visible:ring-offset-0 dark:text-gray-100 dark:placeholder:text-gray-400'
                rows={1}
              />
            </div>

            {/* Send button */}
            <Button
              type='submit'
              size='sm'
              disabled={!message.trim() || isLoading}
              className='h-8 w-8 rounded-lg bg-blue-500 p-0 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600'
            >
              <Send className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
