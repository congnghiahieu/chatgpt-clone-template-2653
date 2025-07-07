import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import Knowledge from './Knowledge';

type Message = {
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

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập câu hỏi',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [...messages, { role: 'user', content } as const];

      setMessages(newMessages);

      // Mock response with sample data visualization
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let assistantMessage: Message;

      // Mock different types of responses based on keywords
      if (content.toLowerCase().includes('biểu đồ') || content.toLowerCase().includes('chart')) {
        assistantMessage = {
          role: 'assistant',
          content: 'Dưới đây là biểu đồ so sánh tốc độ tăng trưởng CASA theo phân khúc:',
          data: {
            type: 'chart',
            chartData: {
              data: [
                { segment: 'Cá nhân', growth2023: 12.5, growth2024: 15.2 },
                { segment: 'SME', growth2023: 8.3, growth2024: 11.7 },
                { segment: 'Corporate', growth2023: 6.1, growth2024: 9.4 },
                { segment: 'Premium', growth2023: 18.2, growth2024: 22.1 },
              ],
              title: 'Tăng trưởng CASA 2023 vs 2024',
              xAxisKey: 'segment',
              yAxisKey: 'growth2024',
              type: 'bar' as const,
            },
          },
        };
      } else if (
        content.toLowerCase().includes('top') ||
        content.toLowerCase().includes('danh sách')
      ) {
        assistantMessage = {
          role: 'assistant',
          content: 'Đây là danh sách 10 khách hàng có số dư tiền gửi VND cao nhất:',
          data: {
            type: 'table',
            tableData: {
              data: [
                {
                  STT: 1,
                  CIF: 'KH001',
                  'Tên khách hàng': 'Nguyễn Văn A',
                  'Số dư (VND)': '15,500,000,000',
                  'Chi nhánh': 'Hà Nội',
                },
                {
                  STT: 2,
                  CIF: 'KH002',
                  'Tên khách hàng': 'Trần Thị B',
                  'Số dư (VND)': '12,800,000,000',
                  'Chi nhánh': 'TP.HCM',
                },
                {
                  STT: 3,
                  CIF: 'KH003',
                  'Tên khách hàng': 'Lê Văn C',
                  'Số dư (VND)': '11,200,000,000',
                  'Chi nhánh': 'Đà Nẵng',
                },
                {
                  STT: 4,
                  CIF: 'KH004',
                  'Tên khách hàng': 'Phạm Thị D',
                  'Số dư (VND)': '9,750,000,000',
                  'Chi nhánh': 'Hà Nội',
                },
                {
                  STT: 5,
                  CIF: 'KH005',
                  'Tên khách hàng': 'Hoàng Văn E',
                  'Số dư (VND)': '8,900,000,000',
                  'Chi nhánh': 'Cần Thơ',
                },
              ],
              columns: ['STT', 'CIF', 'Tên khách hàng', 'Số dư (VND)', 'Chi nhánh'],
              title: 'Top 5 khách hàng có số dư cao nhất',
              sqlQuery: `SELECT TOP 5 cif, customer_name, balance_vnd, branch 
FROM customer_deposits 
WHERE currency = 'VND' AND status = 'ACTIVE'
ORDER BY balance_vnd DESC`,
            },
          },
        };
      } else {
        assistantMessage = {
          role: 'assistant',
          content:
            'Tôi là VPBank Text2SQL Bot. Tôi có thể giúp bạn:\n\n• Truy vấn dữ liệu khách hàng theo phân quyền\n• Hiển thị kết quả dạng bảng, biểu đồ\n• Xuất file Excel, PDF, CSV\n• Trả lời câu hỏi về chỉ tiêu kỹ thuật và nghiệp vụ\n\nVui lòng đặt câu hỏi cụ thể về dữ liệu bạn muốn xem.',
        };
      }

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showKnowledge) {
    return <Knowledge onBack={() => setShowKnowledge(false)} />;
  }

  return (
    <div className='flex h-screen'>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onKnowledgeClick={() => setShowKnowledge(true)}
      />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />

        <div
          className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pb-4 pt-[60px]`}
        >
          {messages.length === 0 ?
            <div className='w-full max-w-3xl space-y-4 px-4'>
              <div>
                <h1 className='mb-8 text-center text-4xl font-semibold'>
                  VPBank Text2SQL Assistant
                </h1>
                <p className='mb-6 text-center text-gray-400'>
                  Hỏi đáp thông minh về dữ liệu ngân hàng với phân quyền theo user
                </p>
                <ChatInput
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
              <ActionButtons />
            </div>
          : <>
              <MessageList messages={messages} />
              <div className='mx-auto w-full max-w-3xl px-4 py-2'>
                <ChatInput
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
              <div className='py-2 text-center text-xs text-gray-500'>
                VPBank Text2SQL có thể có sai sót. Vui lòng kiểm tra thông tin quan trọng.
              </div>
            </>
          }
        </div>
      </main>
    </div>
  );
};

export default Index;
