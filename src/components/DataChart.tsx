
import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Download, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DataChartProps {
  data: any[];
  title: string;
  xAxisKey: string;
  yAxisKey: string;
  type?: 'bar' | 'line' | 'pie';
  sqlQuery?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DataChart = ({ data, title, xAxisKey, yAxisKey, type = 'bar', sqlQuery }: DataChartProps) => {
  const [showSQL, setShowSQL] = useState(false);

  const downloadChart = () => {
    console.log('Tải xuống biểu đồ');
  };

  const renderChart = () => {
    const commonProps = {
      height: 400,
      data,
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#333' }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px'
              }}
              formatter={(value) => {
                // Translate common English terms to Vietnamese
                const translations: { [key: string]: string } = {
                  'amount': 'Số tiền',
                  'count': 'Số lượng',
                  'total': 'Tổng cộng',
                  'value': 'Giá trị',
                  'percentage': 'Phần trăm',
                  'revenue': 'Doanh thu',
                  'profit': 'Lợi nhuận'
                };
                return translations[value.toLowerCase()] || value;
              }}
            />
            <Line
              type='monotone'
              dataKey={yAxisKey}
              stroke='#2563eb'
              strokeWidth={2}
              dot={{ fill: '#2563eb', r: 4 }}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              outerRadius={150}
              fill='#8884d8'
              dataKey={yAxisKey}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
              formatter={(value, name) => {
                // Translate tooltip labels
                const translations: { [key: string]: string } = {
                  'amount': 'Số tiền',
                  'count': 'Số lượng',
                  'total': 'Tổng cộng',
                  'value': 'Giá trị',
                  'percentage': 'Phần trăm',
                  'revenue': 'Doanh thu',
                  'profit': 'Lợi nhuận'
                };
                const translatedName = translations[name?.toString().toLowerCase() || ''] || name;
                return [value, translatedName];
              }}
            />
          </PieChart>
        );

      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#333' }}
              formatter={(value, name) => {
                // Translate tooltip labels
                const translations: { [key: string]: string } = {
                  'amount': 'Số tiền',
                  'count': 'Số lượng',
                  'total': 'Tổng cộng',
                  'value': 'Giá trị',
                  'percentage': 'Phần trăm',
                  'revenue': 'Doanh thu',
                  'profit': 'Lợi nhuận'
                };
                const translatedName = translations[name?.toString().toLowerCase() || ''] || name;
                return [value, translatedName];
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px'
              }}
              formatter={(value) => {
                // Translate common English terms to Vietnamese
                const translations: { [key: string]: string } = {
                  'amount': 'Số tiền',
                  'count': 'Số lượng',
                  'total': 'Tổng cộng',
                  'value': 'Giá trị',
                  'percentage': 'Phần trăm',
                  'revenue': 'Doanh thu',
                  'profit': 'Lợi nhuận'
                };
                return translations[value.toLowerCase()] || value;
              }}
            />
            <Bar
              dataKey={yAxisKey}
              fill='#2563eb'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
    }
  };

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
        <div className='flex items-center gap-2'>
          {sqlQuery && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Dialog open={showSQL} onOpenChange={setShowSQL}>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 w-8 p-0'
                      >
                        <Code className='h-4 w-4' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-3xl'>
                      <DialogHeader>
                        <DialogTitle>Câu truy vấn SQL</DialogTitle>
                      </DialogHeader>
                      <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                        <pre className='whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200'>
                          {sqlQuery}
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xem câu SQL</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={downloadChart}
                  className='h-8 w-8 p-0'
                >
                  <Download className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tải xuống</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DataChart;
