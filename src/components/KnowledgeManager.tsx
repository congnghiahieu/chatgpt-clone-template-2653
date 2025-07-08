
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Trash2, Plus, Download, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import KnowledgeUpload from './KnowledgeUpload';

interface KnowledgeFile {
  id: string;
  name: string;
  type: 'excel' | 'pdf' | 'csv' | 'text';
  uploadDate: string;
  size: string;
  insight: string;
  downloadUrl?: string;
}

const KnowledgeManager = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);
  const [files, setFiles] = useState<KnowledgeFile[]>([
    {
      id: '1',
      name: 'Định nghĩa chỉ tiêu tín dụng.xlsx',
      type: 'excel',
      uploadDate: '2024-12-20',
      size: '2.1 MB',
      insight: 'Tài liệu chứa định nghĩa về 47 chỉ tiêu tín dụng quan trọng, bao gồm dư nợ tín dụng, tỷ lệ nợ xấu, CAR ratio, và các công thức tính toán liên quan. Đặc biệt có phân loại theo Basel III và quy định của NHNN.',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Quy định nghiệp vụ CASA.pdf',
      type: 'pdf',
      uploadDate: '2024-12-18',
      size: '1.5 MB',
      insight: 'Tài liệu quy định chi tiết về sản phẩm CASA (Current Account Saving Account), bao gồm điều kiện mở tài khoản, phí dịch vụ, lãi suất áp dụng, và quy trình xử lý giao dịch. Cập nhật theo Circular 01/2024.',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Danh sách mã chi nhánh.csv',
      type: 'csv',
      uploadDate: '2024-12-15',
      size: '0.3 MB',
      insight: 'Danh sách đầy đủ 127 chi nhánh và phòng giao dịch của VPBank, bao gồm mã chi nhánh, tên chi nhánh, địa chỉ, số điện thoại, và mã vùng miền. Dữ liệu được cập nhật theo cơ cấu tổ chức mới nhất.',
      downloadUrl: '#'
    },
    {
      id: '4',
      name: 'Định nghĩa tỷ lệ an toàn vốn',
      type: 'text',
      uploadDate: '2024-12-10',
      size: '1.2 KB',
      insight: 'Định nghĩa chi tiết về tỷ lệ an toàn vốn (CAR) theo Basel III, bao gồm công thức tính toán, thành phần vốn cấp 1 và cấp 2, và các yêu cầu tối thiểu. Đặc biệt nêu rõ cách xử lý rủi ro tín dụng, rủi ro thị trường và rủi ro hoạt động.',
      downloadUrl: '#'
    },
  ]);

  const getFileIcon = (type: string) => {
    return <FileText className='h-4 w-4' />;
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'excel':
        return 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800';
      case 'pdf':
        return 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800';
      case 'csv':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800';
      case 'text':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700';
    }
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleDownload = (file: KnowledgeFile) => {
    console.log(`Downloading ${file.name}`);
    // Mock download
    const link = document.createElement('a');
    link.href = file.downloadUrl || '#';
    link.download = file.name;
    link.click();
  };

  const toggleInsight = (id: string) => {
    setExpandedInsights(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Knowledge Base đã tải lên
          </h3>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Quản lý các file kiến thức của bạn
          </p>
        </div>
        
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-500 text-white hover:bg-blue-600'>
              <Plus className='mr-2 h-4 w-4' />
              Tải lên Knowledge mới
            </Button>
          </DialogTrigger>
          <DialogContent className='max-h-[80vh] max-w-4xl overflow-y-auto border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'>
            <DialogHeader>
              <DialogTitle className='text-gray-900 dark:text-gray-100'>
                Tải lên Knowledge Base mới
              </DialogTitle>
            </DialogHeader>
            <KnowledgeUpload />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-4'>
        {files.map((file) => (
          <Card key={file.id} className='border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'>
            <CardContent className='p-4'>
              <div className='flex items-start justify-between'>
                <div className='flex items-start gap-3 flex-1'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-700'>
                    {getFileIcon(file.type)}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-medium text-gray-900 dark:text-gray-100 mb-2'>
                      {file.name}
                    </h4>
                    <div className='flex items-center gap-2 mb-3'>
                      <Badge className={getFileTypeColor(file.type)}>
                        {file.type.toUpperCase()}
                      </Badge>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {file.size} • {file.uploadDate}
                      </span>
                    </div>
                    
                    {/* AI Insight */}
                    <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Eye className='h-4 w-4 text-blue-500' />
                        <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>
                          AI phân tích được:
                        </span>
                      </div>
                      <p className={`text-sm text-blue-600 dark:text-blue-400 ${
                        expandedInsights.includes(file.id) ? '' : 'line-clamp-2'
                      }`}>
                        {file.insight}
                      </p>
                      {file.insight.length > 100 && (
                        <button
                          onClick={() => toggleInsight(file.id)}
                          className='text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-1'
                        >
                          {expandedInsights.includes(file.id) ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className='flex items-center gap-2 ml-4'>
                  {file.downloadUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleDownload(file)}
                            className='text-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20'
                          >
                            <Download className='h-4 w-4' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tải xuống</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDelete(file.id)}
                          className='text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xóa</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {files.length === 0 && (
        <div className='text-center py-12'>
          <Upload className='mx-auto h-12 w-12 text-gray-400' />
          <h3 className='mt-2 text-sm font-medium text-gray-900 dark:text-gray-100'>
            Chưa có Knowledge Base nào
          </h3>
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Tải lên file đầu tiên để bắt đầu xây dựng Knowledge Base
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeManager;
