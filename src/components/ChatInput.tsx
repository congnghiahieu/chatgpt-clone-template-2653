
import { useState, useRef } from 'react';
import { Send, Plus, Database, Brain, BarChart3, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import SessionUpload from './SessionUpload';

interface ChatInputProps {
  onSend: (message: string, options?: { search?: string; data?: string }) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [selectedSearchOption, setSelectedSearchOption] = useState<string | null>(null);
  const [selectedDataOption, setSelectedDataOption] = useState<string | null>(null);
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
      setSelectedSearchOption(null);
      setSelectedDataOption(null);
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

  const selectSearchOption = (option: string) => {
    setSelectedSearchOption(selectedSearchOption === option ? null : option);
  };

  const selectDataOption = (option: string) => {
    setSelectedDataOption(selectedDataOption === option ? null : option);
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Các tệp đã tải lên cho phiên này:', files);
  };

  const searchOptions = [
    { id: 'deep-thinking', label: 'Suy nghĩ sâu', icon: Brain },
    { id: 'deep-search', label: 'Tìm kiếm sâu', icon: Search },
  ];

  const dataOptions = [
    { id: 'raw-data', label: 'Dữ liệu thô', icon: Database },
    { id: 'aggregated-data', label: 'Dữ liệu tổng hợp', icon: BarChart3 },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full'
    >
      <div className='mx-auto max-w-3xl'>
        <div className='relative rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900'>
          {/* Selected options */}
          {(selectedSearchOption || selectedDataOption) && (
            <div className='flex flex-wrap gap-2 border-b border-gray-200 p-3 dark:border-gray-700'>
              {selectedSearchOption && (
                (() => {
                  const option = searchOptions.find((o) => o.id === selectedSearchOption);
                  return option ?
                      <div className='flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                        <option.icon className='h-3 w-3' />
                        {option.label}
                        <button
                          type='button'
                          onClick={() => setSelectedSearchOption(null)}
                          className='rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800'
                        >
                          ×
                        </button>
                      </div>
                    : null;
                })()
              )}
              {selectedDataOption && (
                (() => {
                  const option = dataOptions.find((o) => o.id === selectedDataOption);
                  return option ?
                      <div className='flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200'>
                        <option.icon className='h-3 w-3' />
                        {option.label}
                        <button
                          type='button'
                          onClick={() => setSelectedDataOption(null)}
                          className='rounded-full p-0.5 hover:bg-green-200 dark:hover:bg-green-800'
                        >
                          ×
                        </button>
                      </div>
                    : null;
                })()
              )}
            </div>
          )}

          <div className='flex items-end gap-3 p-4'>
            {/* Options dropdown */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start'>
                      <div className='px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400'>
                        Phương thức tìm kiếm
                      </div>
                      {searchOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.id}
                          onClick={() => selectSearchOption(option.id)}
                          className={
                            selectedSearchOption === option.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }
                        >
                          <option.icon className='mr-2 h-4 w-4' />
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <div className='px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400'>
                        Loại dữ liệu
                      </div>
                      {dataOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.id}
                          onClick={() => selectDataOption(option.id)}
                          className={
                            selectedDataOption === option.id ? 'bg-green-50 dark:bg-green-900/20' : ''
                          }
                        >
                          <option.icon className='mr-2 h-4 w-4' />
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tùy chọn truy vấn</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* File upload */}
            <SessionUpload onFileUpload={handleFileUpload} />

            {/* Text input */}
            <div className='flex-1'>
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder='Hỏi VPBank Text2SQL Assistant...'
                disabled={isLoading}
                className='max-h-32 min-h-[40px] resize-none border-0 bg-transparent p-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-400'
                rows={1}
              />
            </div>

            {/* Send button */}
            <Button
              type='submit'
              size='sm'
              disabled={!message.trim() || isLoading}
              className='h-8 w-8 rounded-full bg-blue-500 p-0 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600'
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
