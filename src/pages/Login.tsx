
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
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/');
    } catch (error) {
      // Handle error silently as requested
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register logic
    console.log('Register functionality - mock implementation');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock forgot password logic
    console.log('Forgot password functionality - mock implementation');
  };

  if (showRegister) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800'>
        <Card className='w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Đăng ký tài khoản
            </CardTitle>
            <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
              Tạo tài khoản mới cho VPBank Text2SQL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='fullname' className='text-gray-700 dark:text-gray-300'>
                  Họ và tên
                </Label>
                <Input
                  id='fullname'
                  type='text'
                  placeholder='Nhập họ tên đầy đủ'
                  className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-gray-700 dark:text-gray-300'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Nhập email'
                  className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='username' className='text-gray-700 dark:text-gray-300'>
                  Tên đăng nhập
                </Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='Nhập tên đăng nhập'
                  className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password' className='text-gray-700 dark:text-gray-300'>
                  Mật khẩu
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Nhập mật khẩu'
                  className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
                />
              </div>
              <Button type='submit' className='w-full bg-blue-500 font-medium text-white hover:bg-blue-600'>
                Đăng ký
              </Button>
            </form>

            <div className='mt-6 text-center'>
              <button
                onClick={() => setShowRegister(false)}
                className='text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
              >
                Quay lại đăng nhập
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800'>
        <Card className='w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Quên mật khẩu
            </CardTitle>
            <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
              Nhập email để nhận hướng dẫn khôi phục mật khẩu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-gray-700 dark:text-gray-300'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Nhập email của bạn'
                  className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
                />
              </div>
              <Button type='submit' className='w-full bg-blue-500 font-medium text-white hover:bg-blue-600'>
                Gửi hướng dẫn khôi phục
              </Button>
            </form>

            <div className='mt-6 text-center'>
              <button
                onClick={() => setShowForgotPassword(false)}
                className='text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
              >
                Quay lại đăng nhập
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800'>
      <Card className='w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>
            VPBank Text2SQL
          </CardTitle>
          <CardDescription className='text-center text-gray-600 dark:text-gray-400'>
            Đăng nhập để sử dụng hệ thống chatbot hỏi đáp dữ liệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username' className='text-gray-700 dark:text-gray-300'>
                Tên đăng nhập
              </Label>
              <Input
                id='username'
                type='text'
                placeholder='Nhập tên đăng nhập'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-gray-700 dark:text-gray-300'>
                Mật khẩu
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className='border-gray-200 bg-white/50 dark:border-gray-600 dark:bg-gray-700/50'
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

          <div className='mt-6 flex justify-between text-sm'>
            <button
              onClick={() => setShowRegister(true)}
              className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
            >
              Đăng ký
            </button>
            <button
              onClick={() => setShowForgotPassword(true)}
              className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
            >
              Quên mật khẩu?
            </button>
          </div>

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
