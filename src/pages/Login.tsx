import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập đầy đủ thông tin đăng nhập',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user info (in real app, this would be JWT token)
      localStorage.setItem('user', JSON.stringify({ username }));

      toast({
        title: 'Đăng nhập thành công',
        description: `Chào mừng ${username}!`,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Lỗi đăng nhập',
        description: 'Tên đăng nhập hoặc mật khẩu không đúng',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-center text-2xl font-bold'>VPBank Text2SQL</CardTitle>
          <CardDescription className='text-center'>
            Đăng nhập để sử dụng hệ thống chatbot hỏi đáp dữ liệu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleLogin}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label htmlFor='username'>Tên đăng nhập</Label>
              <Input
                id='username'
                type='text'
                placeholder='Nhập tên đăng nhập'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Mật khẩu</Label>
              <Input
                id='password'
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          <div className='mt-6 text-center text-sm text-muted-foreground'>
            <p>Hệ thống chatbot Text2SQL cho VPBank</p>
            <p className='mt-1'>Hỗ trợ truy vấn dữ liệu thông minh với phân quyền</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
