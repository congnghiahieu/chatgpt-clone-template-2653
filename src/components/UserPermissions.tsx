import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Building, Users, Database, CheckCircle } from 'lucide-react';

interface UserPermissionsProps {
  username: string;
}

const UserPermissions = ({ username }: UserPermissionsProps) => {
  // Mock user permissions - in real app, this would come from your backend
  const getUserPermissions = (username: string) => {
    const mockPermissions = {
      admin: {
        role: 'Quản trị viên',
        branch: 'Tất cả chi nhánh',
        dataAccess: ['Khách hàng cá nhân', 'Khách hàng doanh nghiệp', 'Dữ liệu tổng hợp'],
        level: 'Toàn hệ thống',
        color: 'bg-purple-500',
      },
      'hn.director': {
        role: 'Giám đốc chi nhánh',
        branch: 'Hà Nội',
        dataAccess: ['Khách hàng cá nhân HN', 'Khách hàng doanh nghiệp HN'],
        level: 'Chi nhánh',
        color: 'bg-blue-500',
      },
      'hn.rm.retail': {
        role: 'Retail RM',
        branch: 'Hà Nội',
        dataAccess: ['Khách hàng cá nhân HN'],
        level: 'Phòng ban',
        color: 'bg-green-500',
      },
    };

    return (
      mockPermissions[username as keyof typeof mockPermissions] || {
        role: 'Nhân viên',
        branch: 'Hà Nội',
        dataAccess: ['Dữ liệu cơ bản'],
        level: 'Cá nhân',
        color: 'bg-gray-500',
      }
    );
  };

  const permissions = getUserPermissions(username);

  return (
    <Card className='mb-4 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300'>
          <div className={`rounded-full p-1.5 ${permissions.color}`}>
            <Shield className='h-3 w-3 text-white' />
          </div>
          Quyền truy cập dữ liệu
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 pt-0'>
        <div className='grid grid-cols-1 gap-3'>
          <div className='flex items-center justify-between rounded-lg bg-white/50 p-2.5 dark:bg-slate-800/50'>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-blue-500' />
              <span className='text-sm font-medium'>Vai trò</span>
            </div>
            <Badge
              variant='secondary'
              className='bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            >
              {permissions.role}
            </Badge>
          </div>

          <div className='flex items-center justify-between rounded-lg bg-white/50 p-2.5 dark:bg-slate-800/50'>
            <div className='flex items-center gap-2'>
              <Building className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium'>Chi nhánh</span>
            </div>
            <Badge
              variant='secondary'
              className='bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            >
              {permissions.branch}
            </Badge>
          </div>

          <div className='flex items-center justify-between rounded-lg bg-white/50 p-2.5 dark:bg-slate-800/50'>
            <div className='flex items-center gap-2'>
              <Database className='h-4 w-4 text-purple-500' />
              <span className='text-sm font-medium'>Phạm vi</span>
            </div>
            <Badge
              variant='secondary'
              className='bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
            >
              {permissions.level}
            </Badge>
          </div>
        </div>

        <div className='rounded-lg bg-white/50 p-2.5 dark:bg-slate-800/50'>
          <div className='mb-2 flex items-center gap-2'>
            <CheckCircle className='h-4 w-4 text-emerald-500' />
            <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
              Dữ liệu được phép truy cập
            </span>
          </div>
          <div className='flex flex-wrap gap-1.5'>
            {permissions.dataAccess.map((access, index) => (
              <Badge
                key={index}
                variant='outline'
                className='border-emerald-200 bg-emerald-50 text-xs text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300'
              >
                {access}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPermissions;
