import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileSpreadsheet, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeRule {
  id: string;
  concept: string;
  definition: string;
  formula: string;
}

const KnowledgeUpload = () => {
  const [rules, setRules] = useState<KnowledgeRule[]>([]);
  const [newRule, setNewRule] = useState({ concept: '', definition: '', formula: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: 'Lỗi',
        description: 'Chỉ hỗ trợ file Excel (.xlsx, .xls)',
        variant: 'destructive',
      });
      return;
    }

    // Simulate file processing
    toast({
      title: 'Thành công',
      description: `Đã tải lên file ${file.name} thành công. Đang xử lý...`,
    });

    // In real implementation, this would parse Excel and extract knowledge rules
    setTimeout(() => {
      const mockRules: KnowledgeRule[] = [
        {
          id: '1',
          concept: 'Dư nợ tín dụng thông thường',
          definition: 'Tổng dư nợ tín dụng không bao gồm thẻ tín dụng',
          formula: 'dư nợ tín dụng món vay + dư nợ tín dụng thấu chi',
        },
      ];
      setRules((prev) => [...prev, ...mockRules]);
      toast({
        title: 'Hoàn thành',
        description: 'Đã import thành công các định nghĩa từ file Excel',
      });
    }, 2000);
  };

  const addRule = () => {
    if (!newRule.concept || !newRule.definition) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập đầy đủ thông tin',
        variant: 'destructive',
      });
      return;
    }

    const rule: KnowledgeRule = {
      id: Date.now().toString(),
      concept: newRule.concept,
      definition: newRule.definition,
      formula: newRule.formula,
    };

    setRules((prev) => [...prev, rule]);
    setNewRule({ concept: '', definition: '', formula: '' });
    toast({
      title: 'Thành công',
      description: 'Đã thêm định nghĩa mới',
    });
  };

  const removeRule = (id: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Upload className='h-5 w-5' />
            Quản lý Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <Label>Upload file Excel định nghĩa</Label>
            <div className='mt-2 flex gap-2'>
              <Input
                ref={fileInputRef}
                type='file'
                accept='.xlsx,.xls'
                onChange={handleFileUpload}
                className='hidden'
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant='outline'
                className='flex-1'
              >
                <FileSpreadsheet className='mr-2 h-4 w-4' />
                Chọn file Excel
              </Button>
            </div>
            <p className='mt-1 text-sm text-gray-500'>
              File Excel cần có các cột: Khái niệm, Định nghĩa, Công thức
            </p>
          </div>

          <div className='border-t pt-4'>
            <Label>Hoặc thêm định nghĩa thủ công</Label>
            <div className='mt-2 grid gap-3'>
              <Input
                placeholder='Tên khái niệm (VD: Dư nợ tín dụng thông thường)'
                value={newRule.concept}
                onChange={(e) => setNewRule((prev) => ({ ...prev, concept: e.target.value }))}
              />
              <Textarea
                placeholder='Định nghĩa chi tiết'
                value={newRule.definition}
                onChange={(e) => setNewRule((prev) => ({ ...prev, definition: e.target.value }))}
              />
              <Input
                placeholder='Công thức tính (tuỳ chọn)'
                value={newRule.formula}
                onChange={(e) => setNewRule((prev) => ({ ...prev, formula: e.target.value }))}
              />
              <Button
                onClick={addRule}
                className='flex items-center gap-2'
              >
                <Plus className='h-4 w-4' />
                Thêm định nghĩa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {rules.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Danh sách định nghĩa đã có ({rules.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className='rounded-lg border p-3'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-medium text-blue-600'>{rule.concept}</h4>
                      <p className='mt-1 text-sm text-gray-600'>{rule.definition}</p>
                      {rule.formula && (
                        <p className='mt-1 text-sm text-green-600'>
                          <strong>Công thức:</strong> {rule.formula}
                        </p>
                      )}
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => removeRule(rule.id)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeUpload;
