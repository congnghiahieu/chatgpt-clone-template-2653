import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import KnowledgeUpload from '@/components/KnowledgeUpload';

interface KnowledgeProps {
  onBack: () => void;
}

const Knowledge = ({ onBack }: KnowledgeProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại chat
        </Button>
        <h1 className="text-xl font-semibold">Quản lý Knowledge Base</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Định nghĩa khái niệm nghiệp vụ</h2>
            <p className="text-gray-600">
              Thêm các định nghĩa khái niệm từ bên ngoài để bot có thể hiểu và trả lời các câu hỏi phức tạp hơn.
              Ví dụ: "Dư nợ tín dụng thông thường" = "Dư nợ tín dụng món vay" + "Dư nợ tín dụng thấu chi"
            </p>
          </div>
          
          <KnowledgeUpload />
        </div>
      </div>
    </div>
  );
};

export default Knowledge;