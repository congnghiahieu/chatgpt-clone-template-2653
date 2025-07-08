import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FileText, File, Code, Copy, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableProps {
  data: any[];
  columns: string[];
  title?: string;
  sqlQuery?: string;
}

const DataTable = ({ data, columns, title, sqlQuery }: DataTableProps) => {
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  const downloadData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Downloading data as ${format}`);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${format === 'excel' ? 'xlsx' : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    console.log('SQL đã được sao chép');
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          {title || 'Kết quả truy vấn'}
        </h3>
        <div className='flex gap-2'>
          {sqlQuery && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setShowSql(!showSql)}
                    className='h-8 w-8 p-0'
                  >
                    <Code className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showSql ? 'Ẩn SQL' : 'Hiển thị SQL'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                    >
                      <Download className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => downloadData('csv')}>
                      <File className='mr-2 h-4 w-4' />
                      CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadData('excel')}>
                      <FileSpreadsheet className='mr-2 h-4 w-4' />
                      Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadData('pdf')}>
                      <FileText className='mr-2 h-4 w-4' />
                      PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tải xuống</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {showSql && sqlQuery && (
        <div className='relative rounded-lg border border-gray-200 bg-slate-50 p-4 dark:border-gray-700 dark:bg-slate-900'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>SQL Query:</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => copyToClipboard(sqlQuery)}
              className='h-6 w-6 p-0'
            >
              {copied ?
                <Check className='h-3 w-3 text-green-500' />
              : <Copy className='h-3 w-3' />}
            </Button>
          </div>
          <pre className='whitespace-pre-wrap rounded border bg-white p-3 font-mono text-sm text-gray-800 dark:bg-slate-800 dark:text-gray-200'>
            {sqlQuery}
          </pre>
        </div>
      )}

      <div className='rounded-lg border border-gray-200 dark:border-gray-700'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column}
                  className='text-gray-900 dark:text-gray-100'
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    className='text-gray-700 dark:text-gray-300'
                  >
                    {row[column]?.toString() || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className='text-gray-500 dark:text-gray-400'>
            Tổng cộng {data.length} bản ghi
          </TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
