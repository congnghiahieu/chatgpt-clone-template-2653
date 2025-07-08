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
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

interface DataChartProps {
  data: any[];
  title: string;
  xAxisKey: string;
  yAxisKey: string;
  type?: 'bar' | 'line' | 'pie';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DataChart = ({ data, title, xAxisKey, yAxisKey, type = 'bar' }: DataChartProps) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>(type);

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey={yAxisKey}
              stroke='#8884d8'
              strokeWidth={2}
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
              outerRadius={80}
              fill='#8884d8'
              dataKey={yAxisKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={yAxisKey}
              fill='#8884d8'
            />
          </BarChart>
        );
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{title}</h3>
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

      <div className='h-80 w-full rounded-lg bg-slate-50 p-4 dark:bg-slate-800'>
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
