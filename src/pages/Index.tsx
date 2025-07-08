import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import MessageList from '@/components/MessageList';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

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

  // Enhanced mock chat sessions with comprehensive data
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
    chat2: [
      { role: 'user', content: 'Báo cáo tăng trưởng CASA' },
      {
        role: 'assistant',
        content: 'Dưới đây là báo cáo tăng trưởng CASA (Current Account Saving Account) trong 6 tháng qua:',
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
        content: '**Phân tích xu hướng tăng trưởng CASA:**\n\n• **Tăng trưởng ổn định**: Tỷ lệ tăng trưởng duy trì ở mức 12-22% qua các tháng\n• **Đỉnh cao tháng 12**: Đạt 22.1% do chiến dịch khuyến mãi cuối năm\n• **Dự báo**: Xu hướng tích cực sẽ tiếp tục trong Q1/2025\n• **Khuyến nghị**: Tập trung vào khách hàng SME để đẩy mạnh tăng trưởng',
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
    chat4: [
      { role: 'user', content: 'Thống kê khách hàng mới' },
      {
        role: 'assistant',
        content: 'Đây là thống kê khách hàng mới trong 6 tháng qua:',
        data: {
          type: 'table',
          tableData: {
            data: [
              { 'Tháng': 'Tháng 7', 'Khách hàng mới': '1,240', 'Cá nhân': '980', 'Doanh nghiệp': '260', 'Tỷ lệ tăng trưởng': '8.5%' },
              { 'Tháng': 'Tháng 8', 'Khách hàng mới': '1,356', 'Cá nhân': '1,100', 'Doanh nghiệp': '256', 'Tỷ lệ tăng trưởng': '9.3%' },
              { 'Tháng': 'Tháng 9', 'Khách hàng mới': '1,489', 'Cá nhân': '1,205', 'Doanh nghiệp': '284', 'Tỷ lệ tăng trưởng': '9.8%' },
              { 'Tháng': 'Tháng 10', 'Khách hàng mới': '1,567', 'Cá nhân': '1,278', 'Doanh nghiệp': '289', 'Tỷ lệ tăng trưởng': '5.2%' },
              { 'Tháng': 'Tháng 11', 'Khách hàng mới': '1,723', 'Cá nhân': '1,389', 'Doanh nghiệp': '334', 'Tỷ lệ tăng trưởng': '10.0%' },
              { 'Tháng': 'Tháng 12', 'Khách hàng mới': '1,892', 'Cá nhân': '1,501', 'Doanh nghiệp': '391', 'Tỷ lệ tăng trưởng': '9.8%' },
            ],
            columns: ['Tháng', 'Khách hàng mới', 'Cá nhân', 'Doanh nghiệp', 'Tỷ lệ tăng trưởng'],
            title: 'Thống kê khách hàng mới theo tháng',
            sqlQuery: 'SELECT MONTH(created_date) as month, COUNT(*) as new_customers, SUM(CASE WHEN customer_type = "Individual" THEN 1 ELSE 0 END) as individual, SUM(CASE WHEN customer_type = "Corporate" THEN 1 ELSE 0 END) as corporate FROM customers WHERE created_date >= DATEADD(month, -6, GETDATE()) GROUP BY MONTH(created_date)',
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
        content: '**Phân tích ROI (Return on Investment):**\n\n• **TP.HCM**: 28.3% - Dẫn đầu về hiệu quả đầu tư\n• **Hà Nội**: 27.1% - Ổn định, tiềm năng tăng trưởng\n• **Đà Nẵng**: 26.8% - Tốt cho quy mô chi nhánh\n• **Cần Thơ**: 25.3% - Cần cải thiện chiến lược\n• **Hải Phòng**: 24.4% - Yêu cầu xem xét lại hoạt động\n\n**Khuyến nghị**: Áp dụng mô hình thành công từ TP.HCM cho các chi nhánh khác.',
      },
    ],
    chat6: [
      { role: 'user', content: 'Báo cáo rủi ro tín dụng' },
      {
        role: 'assistant',
        content: 'Báo cáo tổng quan về rủi ro tín dụng trong hệ thống:',
        data: {
          type: 'table',
          tableData: {
            data: [
              { 'Loại hình': 'Tín dụng cá nhân', 'Tổng dư nợ (tỷ)': '2,450.5', 'Nợ xấu (tỷ)': '29.4', 'Tỷ lệ nợ xấu': '1.2%', 'Mức độ rủi ro': 'Thấp' },
              { 'Loại hình': 'SME', 'Tổng dư nợ (tỷ)': '1,890.3', 'Nợ xấu (tỷ)': '37.8', 'Tỷ lệ nợ xấu': '2.0%', 'Mức độ rủi ro': 'Trung bình' },
              { 'Loại hình': 'Corporate', 'Tổng dư nợ (tỷ)': '3,200.7', 'Nợ xấu (tỷ)': '32.0', 'Tỷ lệ nợ xấu': '1.0%', 'Mức độ rủi ro': 'Thấp' },
              { 'Loại hình': 'Thẻ tín dụng', 'Tổng dư nợ (tỷ)': '856.2', 'Nợ xấu (tỷ)': '25.7', 'Tỷ lệ nợ xấu': '3.0%', 'Mức độ rủi ro': 'Cao' },
            ],
            columns: ['Loại hình', 'Tổng dư nợ (tỷ)', 'Nợ xấu (tỷ)', 'Tỷ lệ nợ xấu', 'Mức độ rủi ro'],
            title: 'Phân tích rủi ro tín dụng theo sản phẩm',
            sqlQuery: 'SELECT product_type, SUM(outstanding_balance) as total_balance, SUM(npl_balance) as npl_balance, AVG(npl_ratio) as avg_npl_ratio FROM credit_risk_report GROUP BY product_type ORDER BY total_balance DESC',
          },
        },
      },
      { role: 'user', content: 'Biểu đồ phân bổ rủi ro' },
      {
        role: 'assistant',
        content: 'Biểu đồ phân bổ rủi ro tín dụng:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { type: 'Corporate', balance: 3200.7, risk: 1.0 },
              { type: 'Cá nhân', balance: 2450.5, risk: 1.2 },
              { type: 'SME', balance: 1890.3, risk: 2.0 },
              { type: 'Thẻ tín dụng', balance: 856.2, risk: 3.0 },
            ],
            title: 'Phân bổ dư nợ và rủi ro theo sản phẩm',
            xAxisKey: 'type',
            yAxisKey: 'balance',
            type: 'pie' as const,
          },
        },
      },
    ],
    chat7: [
      { role: 'user', content: 'Dashboard tổng quan ngân hàng' },
      {
        role: 'assistant',
        content: '**DASHBOARD TỔNG QUAN VPBank - Tháng 12/2024**\n\n🏦 **Tổng tài sản**: 582.4 tỷ VND (+5.2% so với tháng trước)\n💰 **Tổng dư nợ tín dụng**: 456.8 tỷ VND (+3.8%)\n📊 **Tỷ lệ nợ xấu**: 1.45% (trong giới hạn cho phép)\n🎯 **ROA**: 1.8% | **ROE**: 15.2%\n👥 **Tổng khách hàng**: 8.2 triệu (+2.1%)',
      },
      { role: 'user', content: 'Cho tôi xem biểu đồ tổng quan' },
      {
        role: 'assistant',
        content: 'Biểu đồ tổng quan các chỉ tiêu chính:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { metric: 'Tổng tài sản', value: 582.4, target: 600.0 },
              { metric: 'Dư nợ tín dụng', value: 456.8, target: 470.0 },
              { metric: 'Tiền gửi', value: 485.2, target: 500.0 },
              { metric: 'Lợi nhuận', value: 12.8, target: 15.0 },
            ],
            title: 'Chỉ tiêu chính vs Mục tiêu (tỷ VND)',
            xAxisKey: 'metric',
            yAxisKey: 'value',
            type: 'bar' as const,
          },
        },
      },
    ],
    chat8: [
      { role: 'user', content: 'Phân tích xu hướng tiền gửi' },
      {
        role: 'assistant',
        content: 'Phân tích xu hướng tiền gửi khách hàng trong 12 tháng qua:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { month: 'T1', casa: 120.5, term: 180.2, total: 300.7 },
              { month: 'T2', casa: 125.3, term: 185.4, total: 310.7 },
              { month: 'T3', casa: 130.8, term: 190.1, total: 320.9 },
              { month: 'T4', casa: 135.2, term: 195.8, total: 331.0 },
              { month: 'T5', casa: 140.1, term: 201.2, total: 341.3 },
              { month: 'T6', casa: 145.6, term: 206.9, total: 352.5 },
              { month: 'T7', casa: 150.2, term: 212.3, total: 362.5 },
              { month: 'T8', casa: 155.8, term: 218.7, total: 374.5 },
              { month: 'T9', casa: 161.4, term: 225.1, total: 386.5 },
              { month: 'T10', casa: 167.2, term: 231.8, total: 399.0 },
              { month: 'T11', casa: 173.5, term: 238.4, total: 411.9 },
              { month: 'T12', casa: 180.1, term: 245.2, total: 425.3 },
            ],
            title: 'Xu hướng tiền gửi 12 tháng (tỷ VND)',
            xAxisKey: 'month',
            yAxisKey: 'total',
            type: 'line' as const,
          },
        },
      },
      { role: 'user', content: 'Phân tích chi tiết CASA vs Term Deposit' },
      {
        role: 'assistant',
        content: '**Phân tích so sánh CASA vs Term Deposit:**\n\n📈 **CASA (Không kỳ hạn)**:\n• Tăng trưởng: 49.6% (từ 120.5 → 180.1 tỷ)\n• Tỷ trọng: 42.4% tổng tiền gửi\n• Xu hướng: Tăng đều đặn, phản ánh tính thanh khoản cao\n\n📊 **Term Deposit (Có kỳ hạn)**:\n• Tăng trưởng: 36.1% (từ 180.2 → 245.2 tỷ)\n• Tỷ trọng: 57.6% tổng tiền gửi\n• Xu hướng: Tăng ổn định, cho thấy niềm tin của khách hàng\n\n💡 **Kết luận**: Cơ cấu tiền gửi cân bằng, CASA tăng nhanh hơn giúp giảm chi phí vốn.',
      },
    ],
    chat9: [
      { role: 'user', content: 'Báo cáo chất lượng tài sản' },
      {
        role: 'assistant',
        content: 'Báo cáo chất lượng tài sản theo phân loại Basel III:',
        data: {
          type: 'table',
          tableData: {
            data: [
              { 'Nhóm nợ': 'Nhóm 1 (Chuẩn)', 'Dư nợ (tỷ)': '7,234.5', 'Tỷ trọng': '89.2%', 'Tỷ lệ trích lập': '0.5%', 'Dự phòng (tỷ)': '36.2' },
              { 'Nhóm nợ': 'Nhóm 2 (Cần chú ý)', 'Dư nợ (tỷ)': '543.2', 'Tỷ trọng': '6.7%', 'Tỷ lệ trích lập': '5.0%', 'Dự phòng (tỷ)': '27.2' },
              { 'Nhóm nợ': 'Nhóm 3 (Dưới chuẩn)', 'Dư nợ (tỷ)': '198.7', 'Tỷ trọng': '2.4%', 'Tỷ lệ trích lập': '20.0%', 'Dự phòng (tỷ)': '39.7' },
              { 'Nhóm nợ': 'Nhóm 4 (Nghi ngờ)', 'Dư nợ (tỷ)': '89.3', 'Tỷ trọng': '1.1%', 'Tỷ lệ trích lập': '50.0%', 'Dự phòng (tỷ)': '44.7' },
              { 'Nhóm nợ': 'Nhóm 5 (Có khả năng mất vốn)', 'Dư nợ (tỷ)': '45.8', 'Tỷ trọng': '0.6%', 'Tỷ lệ trích lập': '100.0%', 'Dự phòng (tỷ)': '45.8' },
            ],
            columns: ['Nhóm nợ', 'Dư nợ (tỷ)', 'Tỷ trọng', 'Tỷ lệ trích lập', 'Dự phòng (tỷ)'],
            title: 'Phân loại chất lượng tài sản',
            sqlQuery: 'SELECT debt_group, SUM(outstanding_balance) as balance, SUM(outstanding_balance) * 100.0 / (SELECT SUM(outstanding_balance) FROM loan_classification) as percentage, AVG(provision_rate) as avg_provision_rate, SUM(provision_amount) as total_provision FROM loan_classification GROUP BY debt_group ORDER BY debt_group',
          },
        },
      },
      { role: 'user', content: 'Biểu đồ phân bổ chất lượng tài sản' },
      {
        role: 'assistant',
        content: 'Biểu đồ phân bổ chất lượng tài sản:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { group: 'Nhóm 1', balance: 7234.5, percentage: 89.2 },
              { group: 'Nhóm 2', balance: 543.2, percentage: 6.7 },
              { group: 'Nhóm 3', balance: 198.7, percentage: 2.4 },
              { group: 'Nhóm 4', balance: 89.3, percentage: 1.1 },
              { group: 'Nhóm 5', balance: 45.8, percentage: 0.6 },
            ],
            title: 'Phân bổ chất lượng tài sản (%)',
            xAxisKey: 'group',
            yAxisKey: 'percentage',
            type: 'pie' as const,
          },
        },
      },
    ],
    chat10: [
      { role: 'user', content: 'Thống kê sản phẩm dịch vụ' },
      {
        role: 'assistant',
        content: 'Thống kê hiệu quả các sản phẩm dịch vụ trong Q4/2024:',
        data: {
          type: 'table',
          tableData: {
            data: [
              { 'Sản phẩm': 'Tín dụng cá nhân', 'Doanh thu (tỷ)': '45.2', 'Khách hàng': '125,000', 'Tăng trưởng': '12.5%', 'Xếp hạng': '1' },
              { 'Sản phẩm': 'Thẻ tín dụng', 'Doanh thu (tỷ)': '23.8', 'Khách hàng': '89,000', 'Tăng trưởng': '18.3%', 'Xếp hạng': '2' },
              { 'Sản phẩm': 'Bảo hiểm', 'Doanh thu (tỷ)': '18.5', 'Khách hàng': '67,000', 'Tăng trưởng': '25.7%', 'Xếp hạng': '3' },
              { 'Sản phẩm': 'Forex & Đầu tư', 'Doanh thu (tỷ)': '15.2', 'Khách hàng': '23,000', 'Tăng trưởng': '8.9%', 'Xếp hạng': '4' },
              { 'Sản phẩm': 'Dịch vụ thanh toán', 'Doanh thu (tỷ)': '12.1', 'Khách hàng': '156,000', 'Tăng trưởng': '15.2%', 'Xếp hạng': '5' },
            ],
            columns: ['Sản phẩm', 'Doanh thu (tỷ)', 'Khách hàng', 'Tăng trưởng', 'Xếp hạng'],
            title: 'Thống kê hiệu quả sản phẩm dịch vụ',
            sqlQuery: 'SELECT product_name, SUM(revenue) as total_revenue, COUNT(DISTINCT customer_id) as customer_count, ((SUM(revenue) - LAG(SUM(revenue), 4) OVER (PARTITION BY product_name ORDER BY quarter)) / LAG(SUM(revenue), 4) OVER (PARTITION BY product_name ORDER BY quarter)) * 100 as growth_rate FROM product_performance WHERE quarter = "Q4_2024" GROUP BY product_name ORDER BY total_revenue DESC',
          },
        },
      },
      { role: 'user', content: 'Sản phẩm nào có tiềm năng nhất?' },
      {
        role: 'assistant',
        content: '**Phân tích tiềm năng sản phẩm:**\n\n🏆 **Bảo hiểm** - Tiềm năng cao nhất:\n• Tăng trưởng mạnh: 25.7%\n• Thị trường chưa bão hòa\n• Margin cao, chi phí vận hành thấp\n\n🎯 **Thẻ tín dụng** - Tiềm năng tốt:\n• Tăng trưởng 18.3%, xu hướng thanh toán không tiền mặt\n• Doanh thu ổn định từ phí và lãi suất\n\n💡 **Khuyến nghị**:\n1. Đẩy mạnh sản phẩm bảo hiểm\n2. Tăng đầu tư vào thẻ tín dụng\n3. Cải thiện dịch vụ thanh toán số',
      },
    ],
    chat11: [
      { role: 'user', content: 'Phân tích khách hàng VIP' },
      {
        role: 'assistant',
        content: 'Phân tích chi tiết về khách hàng VIP của VPBank:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { segment: 'Diamond', count: 1250, revenue: 89.5, avg_balance: 71.6 },
              { segment: 'Platinum', count: 3400, revenue: 156.8, avg_balance: 46.1 },
              { segment: 'Gold', count: 8900, revenue: 234.2, avg_balance: 26.3 },
              { segment: 'Silver', count: 15600, revenue: 187.5, avg_balance: 12.0 },
            ],
            title: 'Phân bổ khách hàng VIP theo phân khúc',
            xAxisKey: 'segment',
            yAxisKey: 'count',
            type: 'bar' as const,
          },
        },
      },
      { role: 'user', content: 'Tỷ lệ đóng góp doanh thu của từng nhóm' },
      {
        role: 'assistant',
        content: 'Phân tích đóng góp doanh thu từ khách hàng VIP:',
        data: {
          type: 'chart',
          chartData: {
            data: [
              { segment: 'Diamond', revenue: 89.5, percentage: 13.4 },
              { segment: 'Platinum', revenue: 156.8, percentage: 23.4 },
              { segment: 'Gold', revenue: 234.2, percentage: 35.0 },
              { segment: 'Silver', revenue: 187.5, percentage: 28.2 },
            ],
            title: 'Đóng góp doanh thu theo phân khúc VIP (%)',
            xAxisKey: 'segment',
            yAxisKey: 'percentage',
            type: 'pie' as const,
          },
        },
      },
      { role: 'user', content: 'Chiến lược phát triển khách hàng VIP' },
      {
        role: 'assistant',
        content: '**CHIẾN LƯỢC PHÁT TRIỂN KHÁCH HÀNG VIP**\n\n🎯 **Mục tiêu 2025**:\n• Tăng 20% khách hàng Diamond (từ 1,250 → 1,500)\n• Nâng cao giá trị giao dịch trung bình 15%\n\n💎 **Chiến lược Diamond**:\n• Dịch vụ Private Banking cao cấp\n• Tư vấn đầu tư cá nhân hóa\n• Ưu đãi độc quyền về lãi suất và phí\n\n🔄 **Conversion Strategy**:\n• Platinum → Diamond: Focus wealth management\n• Gold → Platinum: Đa dạng hóa sản phẩm\n• Silver → Gold: Tăng cường cross-selling\n\n📊 **KPI theo dõi**:\n• Customer Lifetime Value (CLV)\n• Net Promoter Score (NPS)\n• Revenue per VIP customer',
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
