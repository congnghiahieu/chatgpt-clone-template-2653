import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      console.log('Vui lòng nhập đầy đủ thông tin đăng nhập');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user info (in real app, this would be JWT token)
      localStorage.setItem('user', JSON.stringify({ username }));

      navigate('/');
    } catch (error) {
      console.log('Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900'>
      <Card className='w-full max-w-md border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>
            VPBank Text2SQL
          </CardTitle>
          <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
            Đăng nhập để sử dụng hệ thống chatbot hỏi đáp dữ liệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleLogin}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label
                htmlFor='username'
                className='text-gray-700 dark:text-gray-300'
              >
                Tên đăng nhập
              </Label>
              <Input
                id='username'
                type='text'
                placeholder='Nhập tên đăng nhập'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className='border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-gray-700 dark:text-gray-300'
              >
                Mật khẩu
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className='border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400'
              />
            </div>
            <Button
              type='submit'
              className='w-full bg-blue-500 font-medium text-white hover:bg-blue-600'
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          <div className='mt-6 text-center text-sm text-gray-500 dark:text-gray-400'>
            <p>Hệ thống chatbot Text2SQL cho VPBank</p>
            <p className='mt-1'>Hỗ trợ truy vấn dữ liệu thông minh với phân quyền</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
