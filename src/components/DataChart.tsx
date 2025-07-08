
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Download, Code, Copy, Check } from 'lucide-react';

interface DataChartProps {
  data: any[];
  title: string;
  xAxisKey: string;
  yAxisKey: string;
  type?: 'bar' | 'line' | 'pie';
  sqlQuery?: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const DataChart = ({ data, title, xAxisKey, yAxisKey, type = 'bar', sqlQuery }: DataChartProps) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>(type);
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  const downloadData = (format: 'csv' | 'excel' | 'json') => {
    console.log(`Đang tải dữ liệu biểu đồ định dạng ${format}`);
    let content = '';
    let mimeType = '';
    let fileName = '';

    switch (format) {
      case 'csv':
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(',')).join('\n');
        content = `${headers}\n${rows}`;
        mimeType = 'text/csv';
        fileName = 'chart-data.csv';
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        fileName = 'chart-data.json';
        break;
      case 'excel':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        fileName = 'chart-data.xlsx';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis 
              dataKey={xAxisKey} 
              stroke='#6b7280'
              fontSize={12}
            />
            <YAxis 
              stroke='#6b7280'
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type='monotone'
              dataKey={yAxisKey}
              stroke='#3B82F6'
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={(entry) => `${entry[xAxisKey]}: ${entry[yAxisKey]}`}
              outerRadius={100}
              fill='#3B82F6'
              dataKey={yAxisKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        );
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
            <XAxis 
              dataKey={xAxisKey} 
              stroke='#6b7280'
              fontSize={12}
            />
            <YAxis 
              stroke='#6b7280'
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar
              dataKey={yAxisKey}
              fill='#3B82F6'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{title}</h3>
        <div className='flex gap-2'>
          {sqlQuery && (
            <TooltipProvider>
              <TooltipUI>
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
              </TooltipUI>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <TooltipUI>
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
                      CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadData('excel')}>
                      Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadData('json')}>
                      JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tải xuống dữ liệu</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>

          <TooltipProvider>
            <TooltipUI>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                    >
                      {chartType === 'bar' && <BarChart3 className='h-4 w-4' />}
                      {chartType === 'line' && <LineChartIcon className='h-4 w-4' />}
                      {chartType === 'pie' && <PieChartIcon className='h-4 w-4' />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setChartType('bar')}>
                      <BarChart3 className='mr-2 h-4 w-4' />
                      Biểu đồ cột
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setChartType('line')}>
                      <LineChartIcon className='mr-2 h-4 w-4' />
                      Biểu đồ đường
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setChartType('pie')}>
                      <PieChartIcon className='mr-2 h-4 w-4' />
                      Biểu đồ tròn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Loại biểu đồ</p>
              </TooltipContent>
            </TooltipUI>
          </TooltipProvider>
        </div>
      </div>

      {showSql && sqlQuery && (
        <div className='relative rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Truy vấn SQL:</span>
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
          <pre className='whitespace-pre-wrap rounded border bg-white p-3 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200'>
            {sqlQuery}
          </pre>
        </div>
      )}

      <div className='h-80 w-full rounded-lg bg-white p-4 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <ResponsiveContainer
          width='100%'
          height='100%'
        >
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataChart;
