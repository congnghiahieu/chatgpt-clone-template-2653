
import { useState, useRef } from 'react';
import { Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SessionUploadProps {
  onFileUpload: (files: File[]) => void;
}

const SessionUpload = ({ onFileUpload }: SessionUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Validate file types
    const validFiles = files.filter(file => 
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.xls') || 
      file.name.endsWith('.csv') ||
      file.name.endsWith('.txt')
    );

    if (validFiles.length !== files.length) {
      toast({
        title: 'Lỗi',
        description: 'Chỉ hỗ trợ file Excel, CSV, TXT',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFiles(validFiles);
    onFileUpload(validFiles);
    
    toast({
      title: 'Thành công',
      description: `Đã tải lên ${validFiles.length} file cho session này`,
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileUpload(newFiles);
  };

  return (
    <div className='relative'>
      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept='.xlsx,.xls,.csv,.txt'
        onChange={handleFileSelect}
        className='hidden'
      />
      <Button
        variant='ghost'
        size='sm'
        onClick={() => fileInputRef.current?.click()}
        className='h-8 w-8 p-0'
        title='Upload file cho session này'
      >
        <Paperclip className='h-4 w-4' />
      </Button>
      
      {selectedFiles.length > 0 && (
        <div className='absolute bottom-full left-0 mb-2 min-w-48 rounded-lg border bg-background p-2 shadow-md'>
          <div className='text-xs font-medium text-muted-foreground mb-1'>
            Files trong session:
          </div>
          {selectedFiles.map((file, index) => (
            <div key={index} className='flex items-center justify-between py-1'>
              <span className='text-xs truncate max-w-32'>{file.name}</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => removeFile(index)}
                className='h-4 w-4 p-0'
              >
                <X className='h-3 w-3' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionUpload;
