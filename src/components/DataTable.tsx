import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FileText, File } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface DataTableProps {
  data: any[];
  columns: string[];
  title?: string;
  sqlQuery?: string;
}

const DataTable = ({ data, columns, title, sqlQuery }: DataTableProps) => {
  const [showSql, setShowSql] = useState(false);

  const downloadData = (format: 'csv' | 'excel' | 'pdf') => {
    // This would integrate with your backend to generate files
    console.log(`Downloading data as ${format}`);
    // Simulate download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${format === 'excel' ? 'xlsx' : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title || 'Kết quả truy vấn'}</h3>
        <div className="flex gap-2">
          {sqlQuery && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSql(!showSql)}
            >
              {showSql ? 'Ẩn SQL' : 'Hiện SQL'}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => downloadData('csv')}>
                <File className="h-4 w-4 mr-2" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadData('excel')}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadData('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showSql && sqlQuery && (
        <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
          <div className="text-gray-400 mb-2">SQL Query:</div>
          <pre className="whitespace-pre-wrap">{sqlQuery}</pre>
        </div>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>
                    {row[column]?.toString() || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            Tổng cộng {data.length} bản ghi
          </TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;