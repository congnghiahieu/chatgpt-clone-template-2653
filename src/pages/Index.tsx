
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import MessageList from '@/components/MessageList';

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
      sqlQuery?: string;
    };
  };
  isStreaming?: boolean;
  isLoading?: boolean;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Enhanced mock chat sessions with comprehensive data
  const mockChatSessions: Record<string, Message[]> = {
    chat1: [
      { role: 'user', content: 'Cho tôi xem top 10 khách hàng có số dư cao nhất' },
      {
        role: 'assistant',
        content:
          'Tôi sẽ truy vấn dữ liệu để tìm 10 khách hàng có số dư tiền gửi VND cao nhất trong hệ thống.',
        data: {
          type: 'table',
          tableData: {
            data: Array.from({ length: 150 }, (_, i) => ({
              STT: i + 1,
              CIF: `KH${String(i + 1).padStart(3, '0')}`,
              'Tên khách hàng': `Khách hàng ${i + 1}`,
              'Số dư (VND)': `${(15500000000 - i * 100000000).toLocaleString()}`,
              'Chi nhánh': ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'][i % 5],
            })),
            columns: ['STT', 'CIF', 'Tên khách hàng', 'Số dư (VND)', 'Chi nhánh'],
            title: 'Danh sách khách hàng có số dư cao nhất',
            sqlQuery:
              'SELECT TOP 150 cif, customer_name, balance_vnd, branch FROM customer_deposits ORDER BY balance_vnd DESC',
          },
        },
      },
    ],
    chat2: [
      { role: 'user', content: 'Báo cáo tăng trưởng CASA' },
      {
        role: 'assistant',
        content:
          'Dưới đây là báo cáo tăng trưởng CASA (Current Account Saving Account) trong 6 tháng qua:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { month: 'T7', growth: 12.5, amount: 1250 },
              { month: 'T8', growth: 15.2, amount: 1440 },
              { month: 'T9', growth: 18.7, amount: 1710 },
              { month: 'T10', growth: 16.3, amount: 1988 },
              { month: 'T11', growth: 19.8, amount: 2381 },
              { month: 'T12', growth: 22.1, amount: 2907 },
            ],
            title: 'Tăng trưởng CASA theo tháng (%)',
            xAxisKey: 'month',
            yAxisKey: 'growth',
            type: 'line' as const,
          },
        },
      },
      { role: 'user', content: 'Phân tích chi tiết hơn về xu hướng này' },
      {
        role: 'assistant',
        content:
          '**Phân tích xu hướng tăng trưởng CASA:**\n\n• **Tăng trưởng ổn định**: Tỷ lệ tăng trưởng duy trì ở mức 12-22% qua các tháng\n• **Đỉnh cao tháng 12**: Đạt 22.1% do chiến dịch khuyến mãi cuối năm\n• **Dự báo**: Xu hướng tích cực sẽ tiếp tục trong Q1/2025\n• **Khuyến nghị**: Tập trung vào khách hàng SME để đẩy mạnh tăng trưởng',
      },
    ],
    chat3: [
      { role: 'user', content: 'Phân tích dư nợ tín dụng theo chi nhánh' },
      {
        role: 'assistant',
        content: 'Tôi sẽ phân tích dư nợ tín dụng của các chi nhánh để đưa ra báo cáo tổng quan.',
      },
      { role: 'user', content: 'Cho tôi xem dạng bảng trước' },
      {
        role: 'assistant',
        content: 'Đây là báo cáo dư nợ tín dụng chi tiết theo từng chi nhánh:',
        data: {
          type: 'table',
          tableData: {
            data: [
              {
                'Chi nhánh': 'Hà Nội',
                'Dư nợ (tỷ VND)': '850.5',
                'Số KH': '1,250',
                'Tỷ lệ nợ xấu (%)': '1.2',
              },
              {
                'Chi nhánh': 'TP.HCM',
                'Dư nợ (tỷ VND)': '1,120.8',
                'Số KH': '1,680',
                'Tỷ lệ nợ xấu (%)': '0.8',
              },
              {
                'Chi nhánh': 'Đà Nẵng',
                'Dư nợ (tỷ VND)': '420.3',
                'Số KH': '580',
                'Tỷ lệ nợ xấu (%)': '1.5',
              },
              {
                'Chi nhánh': 'Cần Thơ',
                'Dư nợ (tỷ VND)': '380.2',
                'Số KH': '520',
                'Tỷ lệ nợ xấu (%)': '2.1',
              },
            ],
            columns: ['Chi nhánh', 'Dư nợ (tỷ VND)', 'Số KH', 'Tỷ lệ nợ xấu (%)'],
            title: 'Báo cáo dư nợ tín dụng theo chi nhánh',
            sqlQuery:
              'SELECT branch, SUM(credit_balance) as total_credit, COUNT(customer_id) as customer_count, AVG(npl_ratio) as avg_npl FROM credit_portfolio GROUP BY branch ORDER BY total_credit DESC',
          },
        },
      },
      { role: 'user', content: 'Bây giờ cho tôi xem dạng biểu đồ' },
      {
        role: 'assistant',
        content: 'Đây là biểu đồ trực quan hóa dư nợ tín dụng theo chi nhánh:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { branch: 'TP.HCM', amount: 1120.8 },
              { branch: 'Hà Nội', amount: 850.5 },
              { branch: 'Đà Nẵng', amount: 420.3 },
              { branch: 'Cần Thơ', amount: 380.2 },
            ],
            title: 'Dư nợ tín dụng theo chi nhánh (tỷ VND)',
            xAxisKey: 'branch',
            yAxisKey: 'amount',
            type: 'bar' as const,
          },
        },
      },
      { role: 'user', content: 'Chi nhánh nào có hiệu quả tốt nhất?' },
      {
        role: 'assistant',
        content:
          'Dựa trên phân tích dữ liệu:\n\n**Chi nhánh TP.HCM** có hiệu quả tốt nhất với:\n• Dư nợ cao nhất: 1,120.8 tỷ VND\n• Tỷ lệ nợ xấu thấp: chỉ 0.8%\n• Số lượng khách hàng đông: 1,680 KH\n\n**Chi nhánh Hà Nội** đứng thứ 2 với dư nợ 850.5 tỷ VND và tỷ lệ nợ xấu 1.2%.\n\n**Khuyến nghị**: Cần tăng cường hỗ trợ cho chi nhánh Cần Thơ do tỷ lệ nợ xấu cao (2.1%).',
      },
    ],
    chat4: [
      { role: 'user', content: 'Thống kê khách hàng mới' },
      {
        role: 'assistant',
        content: 'Đây là thống kê khách hàng mới trong 6 tháng qua:',
        data: {
          type: 'table',
          tableData: {
            data: [
              {
                Tháng: 'Tháng 7',
                'Khách hàng mới': '1,240',
                'Cá nhân': '980',
                'Doanh nghiệp': '260',
                'Tỷ lệ tăng trưởng': '8.5%',
              },
              {
                Tháng: 'Tháng 8',
                'Khách hàng mới': '1,356',
                'Cá nhân': '1,100',
                'Doanh nghiệp': '256',
                'Tỷ lệ tăng trưởng': '9.3%',
              },
              {
                Tháng: 'Tháng 9',
                'Khách hàng mới': '1,489',
                'Cá nhân': '1,205',
                'Doanh nghiệp': '284',
                'Tỷ lệ tăng trưởng': '9.8%',
              },
              {
                Tháng: 'Tháng 10',
                'Khách hàng mới': '1,567',
                'Cá nhân': '1,278',
                'Doanh nghiệp': '289',
                'Tỷ lệ tăng trưởng': '5.2%',
              },
              {
                Tháng: 'Tháng 11',
                'Khách hàng mới': '1,723',
                'Cá nhân': '1,389',
                'Doanh nghiệp': '334',
                'Tỷ lệ tăng trưởng': '10.0%',
              },
              {
                Tháng: 'Tháng 12',
                'Khách hàng mới': '1,892',
                'Cá nhân': '1,501',
                'Doanh nghiệp': '391',
                'Tỷ lệ tăng trưởng': '9.8%',
              },
            ],
            columns: ['Tháng', 'Khách hàng mới', 'Cá nhân', 'Doanh nghiệp', 'Tỷ lệ tăng trưởng'],
            title: 'Thống kê khách hàng mới theo tháng',
            sqlQuery:
              'SELECT MONTH(created_date) as month, COUNT(*) as new_customers, SUM(CASE WHEN customer_type = "Individual" THEN 1 ELSE 0 END) as individual, SUM(CASE WHEN customer_type = "Corporate" THEN 1 ELSE 0 END) as corporate FROM customers WHERE created_date >= DATEADD(month, -6, GETDATE()) GROUP BY MONTH(created_date)',
          },
        },
      },
      { role: 'user', content: 'Vẽ biểu đồ xu hướng tăng trưởng' },
      {
        role: 'assistant',
        content: 'Biểu đồ xu hướng tăng trưởng khách hàng mới:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { month: 'T7', total: 1240, individual: 980, corporate: 260 },
              { month: 'T8', total: 1356, individual: 1100, corporate: 256 },
              { month: 'T9', total: 1489, individual: 1205, corporate: 284 },
              { month: 'T10', total: 1567, individual: 1278, corporate: 289 },
              { month: 'T11', total: 1723, individual: 1389, corporate: 334 },
              { month: 'T12', total: 1892, individual: 1501, corporate: 391 },
            ],
            title: 'Xu hướng khách hàng mới',
            xAxisKey: 'month',
            yAxisKey: 'total',
            type: 'line' as const,
          },
        },
      },
    ],
    chat5: [
      { role: 'user', content: 'So sánh hiệu suất kinh doanh' },
      {
        role: 'assistant',
        content: 'Đây là báo cáo so sánh hiệu suất kinh doanh giữa các chi nhánh trong Q4/2024:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { branch: 'TP.HCM', revenue: 45.2, profit: 12.8, roi: 28.3 },
              { branch: 'Hà Nội', revenue: 38.7, profit: 10.5, roi: 27.1 },
              { branch: 'Đà Nẵng', revenue: 23.1, profit: 6.2, roi: 26.8 },
              { branch: 'Cần Thơ', revenue: 19.4, profit: 4.9, roi: 25.3 },
              { branch: 'Hải Phòng', revenue: 16.8, profit: 4.1, roi: 24.4 },
            ],
            title: 'So sánh doanh thu theo chi nhánh (tỷ VND)',
            xAxisKey: 'branch',
            yAxisKey: 'revenue',
            type: 'bar' as const,
          },
        },
      },
      { role: 'user', content: 'Phân tích chi tiết về ROI' },
      {
        role: 'assistant',
        content:
          '**Phân tích ROI (Return on Investment):**\n\n• **TP.HCM**: 28.3% - Dẫn đầu về hiệu quả đầu tư\n• **Hà Nội**: 27.1% - Ổn định, tiềm năng tăng trưởng cao\n• **Đà Nẵng**: 26.8% - Hiệu quả tốt với thị trường quy mô vừa\n• **Cần Thơ**: 25.3% - Cần cải thiện chiến lược đầu tư\n• **Hải Phòng**: 24.4% - Cần xem xét lại mô hình kinh doanh',
      },
    ],
  };

  const handleSendMessage = async (message: string, options?: string[]) => {
    if (!message.trim()) return;

    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    // Show loading state
    setIsLoading(true);
    const loadingMessage: Message = { 
      role: 'assistant', 
      content: '', 
      isLoading: true 
    };
    setMessages(prev => [...prev, loadingMessage]);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Remove loading message and add streaming response
    setMessages(prev => prev.slice(0, -1));
    
    const assistantMessage: Message = { 
      role: 'assistant', 
      content: 'Tôi đang xử lý yêu cầu của bạn và sẽ trả về kết quả chi tiết ngay sau đây...', 
      isStreaming: true 
    };
    setMessages(prev => [...prev, assistantMessage]);

    // Simulate streaming completion
    setTimeout(() => {
      setMessages(prev => 
        prev.map((msg, index) => 
          index === prev.length - 1 
            ? { ...msg, isStreaming: false, content: 'Đây là câu trả lời chi tiết cho câu hỏi của bạn.' }
            : msg
        )
      );
      setIsLoading(false);
    }, 3000);
  };

  const loadChatSession = (chatId: string) => {
    const sessionMessages = mockChatSessions[chatId] || [];
    setMessages(sessionMessages);
    setCurrentChatId(chatId);
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLoadChat={loadChatSession}
        onNewChat={startNewChat}
        currentChatId={currentChatId}
      />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <ChatHeader />
        <div className="flex-1 overflow-hidden">
          <MessageList messages={messages} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;
