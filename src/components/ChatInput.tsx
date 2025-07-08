import { useState, useRef } from 'react';
import { Send, Mic, Plus, Settings, Search, Database, Brain, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SessionUpload from './SessionUpload';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
      setSelectedOptions([]);
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

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded for this session:', files);
  };

  const options = [
    { id: 'deep-thinking', label: 'Deep thinking', icon: Brain },
    { id: 'deep-search', label: 'Deep search', icon: Search },
    { id: 'raw-data', label: 'Raw data', icon: Database },
    { id: 'aggregated-data', label: 'Aggregated data', icon: BarChart3 },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full'
    >
      <div className='relative rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900'>
        {/* Selected options */}
        {selectedOptions.length > 0 && (
          <div className='flex flex-wrap gap-2 border-b border-gray-200 p-3 dark:border-gray-700'>
            {selectedOptions.map((optionId) => {
              const option = options.find((o) => o.id === optionId);
              return option ?
                  <div
                    key={optionId}
                    className='flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  >
                    <option.icon className='h-3 w-3' />
                    {option.label}
                    <button
                      type='button'
                      onClick={() => toggleOption(optionId)}
                      className='rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800'
                    >
                      ×
                    </button>
                  </div>
                : null;
            })}
          </div>
        )}

        <div className='flex items-end gap-2 p-3'>
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
                    {options.map((option) => (
                      <DropdownMenuItem
                        key={option.id}
                        onClick={() => toggleOption(option.id)}
                        className={
                          selectedOptions.includes(option.id) ?
                            'bg-blue-50 dark:bg-blue-900/20'
                          : ''
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

          {/* Voice input */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                >
                  <Mic className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ghi âm</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Send button */}
          <Button
            type='submit'
            size='sm'
            disabled={!message.trim() || isLoading}
            className='h-8 w-8 bg-blue-500 p-0 text-white hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600'
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
