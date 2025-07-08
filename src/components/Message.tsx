import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';
import DataTable from './DataTable';
import DataChart from './DataChart';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
  data?: {
    type: 'table' | 'chart';
    tableData?: {
      data: any[];
      columns: string[];
      title?: string;
      sqlQuery?: string;
    };
    chartData?: {
      data: any[];
      title: string;
      xAxisKey: string;
      yAxisKey: string;
      type?: 'bar' | 'line' | 'pie';
    };
  };
};

const Message = ({ role, content, data }: MessageProps) => {
  return (
    <div className='py-6'>
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-4 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div
            className={`${role === 'user' ? 'inline-block rounded-[20px] bg-slate-200 px-4 py-2 text-slate-800 dark:bg-slate-700 dark:text-slate-200' : ''}`}
          >
            {content}
          </div>

          {/* Render data visualizations for assistant messages */}
          {role === 'assistant' && data && (
            <div className='mt-4'>
              {data.type === 'table' && data.tableData && <DataTable {...data.tableData} />}
              {data.type === 'chart' && data.chartData && <DataChart {...data.chartData} />}
            </div>
          )}

          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </div>
  );
};

export default Message;
