import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/admin');
        } catch (error) {
            toast({
                title: 'Login Failed',
                description: 'Invalid username or password.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>
                    <Button onClick={handleLogin} className="w-full">
                        Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
