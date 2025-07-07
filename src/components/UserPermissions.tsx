import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Building, Users, Database } from 'lucide-react';

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
      },
      'hn.director': {
        role: 'Giám đốc chi nhánh',
        branch: 'Hà Nội',
        dataAccess: ['Khách hàng cá nhân HN', 'Khách hàng doanh nghiệp HN'],
        level: 'Chi nhánh',
      },
      'hn.rm.retail': {
        role: 'Retail RM',
        branch: 'Hà Nội',
        dataAccess: ['Khách hàng cá nhân HN'],
        level: 'Phòng ban',
      },
    };

    return (
      mockPermissions[username as keyof typeof mockPermissions] || {
        role: 'Nhân viên',
        branch: 'Hà Nội',
        dataAccess: ['Dữ liệu cơ bản'],
        level: 'Cá nhân',
      }
    );
  };

  const permissions = getUserPermissions(username);

  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-sm'>
          <Shield className='h-4 w-4' />
          Quyền truy cập dữ liệu
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-blue-500' />
          <span className='text-sm'>{permissions.role}</span>
        </div>

        <div className='flex items-center gap-2'>
          <Building className='h-4 w-4 text-green-500' />
          <span className='text-sm'>{permissions.branch}</span>
        </div>

        <div className='flex items-center gap-2'>
          <Database className='h-4 w-4 text-purple-500' />
          <span className='text-sm'>{permissions.level}</span>
        </div>

        <div>
          <p className='mb-2 text-xs text-gray-500'>Dữ liệu được phép truy cập:</p>
          <div className='flex flex-wrap gap-1'>
            {permissions.dataAccess.map((access, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='text-xs'
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
