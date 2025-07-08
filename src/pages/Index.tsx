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
    };
  };
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Enhanced mock chat sessions with more realistic conversations
  const mockChatSessions: Record<string, Message[]> = {
    chat1: [
      { role: 'user', content: 'Cho tôi xem top 10 khách hàng có số dư cao nhất' },
      {
        role: 'assistant',
        content: 'Tôi sẽ truy vấn dữ liệu để tìm 10 khách hàng có số dư tiền gửi VND cao nhất trong hệ thống.',
        data: {
          type: 'table',
          tableData: {
            data: [
              { STT: 1, CIF: 'KH001', 'Tên khách hàng': 'Nguyễn Văn A', 'Số dư (VND)': '15,500,000,000', 'Chi nhánh': 'Hà Nội' },
              { STT: 2, CIF: 'KH002', 'Tên khách hàng': 'Trần Thị B', 'Số dư (VND)': '12,800,000,000', 'Chi nhánh': 'TP.HCM' },
              { STT: 3, CIF: 'KH003', 'Tên khách hàng': 'Lê Văn C', 'Số dư (VND)': '11,200,000,000', 'Chi nhánh': 'Đà Nẵng' },
              { STT: 4, CIF: 'KH004', 'Tên khách hàng': 'Phạm Thị D', 'Số dư (VND)': '9,750,000,000', 'Chi nhánh': 'Hà Nội' },
              { STT: 5, CIF: 'KH005', 'Tên khách hàng': 'Hoàng Văn E', 'Số dư (VND)': '8,900,000,000', 'Chi nhánh': 'Cần Thơ' },
            ],
            columns: ['STT', 'CIF', 'Tên khách hàng', 'Số dư (VND)', 'Chi nhánh'],
            title: 'Top 10 khách hàng có số dư cao nhất',
            sqlQuery: 'SELECT TOP 10 cif, customer_name, balance_vnd, branch FROM customer_deposits ORDER BY balance_vnd DESC',
          },
        },
      },
      { role: 'user', content: 'Có thể vẽ biểu đồ so sánh theo chi nhánh được không?' },
      {
        role: 'assistant',
        content: 'Tất nhiên! Tôi sẽ tạo biểu đồ thống kê số dư theo chi nhánh để bạn dễ so sánh.',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { branch: 'Hà Nội', totalBalance: 25250 },
              { branch: 'TP.HCM', totalBalance: 12800 },
              { branch: 'Đà Nẵng', totalBalance: 11200 },
              { branch: 'Cần Thơ', totalBalance: 8900 },
            ],
            title: 'Tổng số dư theo chi nhánh (tỷ VND)',
            xAxisKey: 'branch',
            yAxisKey: 'totalBalance',
            type: 'bar' as const,
          },
        },
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
              { 'Chi nhánh': 'Hà Nội', 'Dư nợ (tỷ VND)': '850.5', 'Số KH': '1,250', 'Tỷ lệ nợ xấu (%)': '1.2' },
              { 'Chi nhánh': 'TP.HCM', 'Dư nợ (tỷ VND)': '1,120.8', 'Số KH': '1,680', 'Tỷ lệ nợ xấu (%)': '0.8' },
              { 'Chi nhánh': 'Đà Nẵng', 'Dư nợ (tỷ VND)': '420.3', 'Số KH': '580', 'Tỷ lệ nợ xấu (%)': '1.5' },
              { 'Chi nhánh': 'Cần Thơ', 'Dư nợ (tỷ VND)': '380.2', 'Số KH': '520', 'Tỷ lệ nợ xấu (%)': '2.1' },
            ],
            columns: ['Chi nhánh', 'Dư nợ (tỷ VND)', 'Số KH', 'Tỷ lệ nợ xấu (%)'],
            title: 'Báo cáo dư nợ tín dụng theo chi nhánh',
            sqlQuery: 'SELECT branch, SUM(credit_balance) as total_credit, COUNT(customer_id) as customer_count, AVG(npl_ratio) as avg_npl FROM credit_portfolio GROUP BY branch ORDER BY total_credit DESC',
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
        content: 'Dựa trên phân tích dữ liệu:\n\n**Chi nhánh TP.HCM** có hiệu quả tốt nhất với:\n• Dư nợ cao nhất: 1,120.8 tỷ VND\n• Tỷ lệ nợ xấu thấp: chỉ 0.8%\n• Số lượng khách hàng đông: 1,680 KH\n\n**Chi nhánh Hà Nội** đứng thứ 2 với dư nợ 850.5 tỷ VND và tỷ lệ nợ xấu 1.2%.\n\n**Khuyến nghị**: Cần tăng cường hỗ trợ cho chi nhánh Cần Thơ do tỷ lệ nợ xấu cao (2.1%).',
      },
    ],
    chat2: [
      { role: 'user', content: 'Báo cáo tăng trưởng CASA' },
      {
        role: 'assistant',
        content: 'Dưới đây là biểu đồ tăng trưởng CASA:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { month: 'T1', growth: 12.5 },
              { month: 'T2', growth: 15.2 },
              { month: 'T3', growth: 18.7 },
            ],
            title: 'Tăng trưởng CASA theo tháng',
            xAxisKey: 'month',
            yAxisKey: 'growth',
            type: 'bar' as const,
          },
        },
      },
    ],
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const newMessages = [...messages, { role: 'user', content } as const];
      setMessages(newMessages);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      let assistantMessage: Message = {
        role: 'assistant',
        content: 'Xin chào! Tôi là VPBank Text2SQL Assistant - hệ thống trợ lý thông minh được phát triển riêng cho VPBank.\n\n🏦 **Về hệ thống của chúng tôi:**\n• Kết nối trực tiếp với Data Lake và Data Warehouse của VPBank\n• Hỗ trợ phân quyền dữ liệu theo vai trò và chi nhánh\n• Tích hợp AI để hiểu ngôn ngữ tự nhiên và chuyển đổi thành SQL\n\n💡 **Tôi có thể giúp bạn:**\n• Truy vấn dữ liệu khách hàng, giao dịch, sản phẩm theo phân quyền\n• Tạo báo cáo dạng bảng, biểu đồ trực quan\n• Xuất dữ liệu định dạng Excel, PDF, CSV\n• Phân tích chỉ tiêu kỹ thuật và nghiệp vụ\n• Trả lời câu hỏi về quy định, định nghĩa ngành ngân hàng\n\n🔐 **Bảo mật & Phân quyền:**\nMỗi truy vấn được kiểm soát nghiêm ngặt theo quyền hạn của bạn. Bạn chỉ có thể truy cập dữ liệu thuộc phạm vi được phép.\n\nHãy đặt câu hỏi cụ thể về dữ liệu bạn muốn xem, ví dụ:\n"Top 10 khách hàng VIP của chi nhánh"\n"Biểu đồ tăng trưởng CASA quý này"\n"Báo cáo nợ xấu theo sản phẩm"',
      };

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
            'Tôi là VPBank Text2SQL Assistant. Tôi có thể giúp bạn:\n\n• Truy vấn dữ liệu khách hàng theo phân quyền\n• Hiển thị kết quả dạng bảng, biểu đồ\n• Xuất file Excel, PDF, CSV\n• Trả lời câu hỏi về chỉ tiêu kỹ thuật và nghiệp vụ\n\nVui lòng đặt câu hỏi cụ thể về dữ liệu bạn muốn xem.',
        };
      }

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = (chatId: string) => {
    setCurrentChatId(chatId);
    const chatMessages = mockChatSessions[chatId] || [];
    setMessages(chatMessages);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  return (
    <div className='flex h-screen bg-white dark:bg-gray-900'>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <ChatHeader isSidebarOpen={isSidebarOpen} />

        <div
          className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pb-4 pt-[60px]`}
        >
          {messages.length === 0 ?
            <div className='w-full max-w-3xl space-y-4 px-4'>
              <div>
                <h1 className='mb-8 text-center text-4xl font-semibold text-gray-900 dark:text-gray-100'>
                  VPBank Text2SQL Assistant
                </h1>
                <p className='mb-6 text-center text-gray-600 dark:text-gray-400'>
                  Hỏi đáp thông minh về dữ liệu ngân hàng với phân quyền theo user
                </p>
                <ChatInput
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          : <>
              <MessageList messages={messages} />
              <div className='mx-auto w-full max-w-3xl px-4 py-2'>
                <ChatInput
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </div>
              <div className='py-2 text-center text-xs text-gray-500 dark:text-gray-400'>
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
