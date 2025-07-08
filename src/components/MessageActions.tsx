
import { useState } from 'react';
import { Copy, Download, Code, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MessageActions = () => {
  const [showSQL, setShowSQL] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const handleCopy = () => {
    console.log('Copy message');
  };

  const handleDownload = () => {
    console.log('Download data');
  };

  const handleToggleSQL = () => {
    setShowSQL(!showSQL);
  };

  const handleChangeChartType = () => {
    const types: ('bar' | 'line' | 'pie')[] = ['bar', 'line', 'pie'];
    const currentIndex = types.indexOf(chartType);
    const nextIndex = (currentIndex + 1) % types.length;
    setChartType(types[nextIndex]);
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 mt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sao chép</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tải xuống</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleSQL}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Code className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hiển thị SQL</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChangeChartType}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Loại biểu đồ: {chartType}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default MessageActions;
