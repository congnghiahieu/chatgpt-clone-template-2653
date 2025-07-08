
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import KnowledgeUpload from './KnowledgeUpload';

interface KnowledgeFile {
  id: string;
  name: string;
  type: 'excel' | 'pdf' | 'csv';
  uploadDate: string;
  size: string;
}

const KnowledgeManager = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [files, setFiles] = useState<KnowledgeFile[]>([
    {
      id: '1',
      name: 'Định nghĩa chỉ tiêu tín dụng.xlsx',
      type: 'excel',
      uploadDate: '2024-12-20',
      size: '2.1 MB',
    },
    {
      id: '2',
      name: 'Quy định nghiệp vụ CASA.pdf',
      type: 'pdf',
      uploadDate: '2024-12-18',
      size: '1.5 MB',
    },
    {
      id: '3',
      name: 'Danh sách mã chi nhánh.csv',
      type: 'csv',
      uploadDate: '2024-12-15',
      size: '0.3 MB',
    },
  ]);

  const getFileIcon = (type: string) => {
    return <FileText className='h-4 w-4' />;
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'excel':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'pdf':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'csv':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
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
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-gray-700'>
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 dark:text-gray-100'>
                      {file.name}
                    </h4>
                    <div className='flex items-center gap-2 mt-1'>
                      <Badge className={getFileTypeColor(file.type)}>
                        {file.type.toUpperCase()}
                      </Badge>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {file.size} • {file.uploadDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleDelete(file.id)}
                  className='text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
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
