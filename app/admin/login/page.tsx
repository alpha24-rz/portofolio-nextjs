// app/admin/login/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react'; // 1. Tambahkan Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// 2. Pisahkan komponen yang menggunakan useSearchParams()
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Sekarang aman di dalam Suspense

  useEffect(() => {
    if (searchParams.get('logout') === 'true') {
      setMessage('You have been logged out successfully.');
    }
    if (searchParams.get('expired') === 'true') {
      setMessage('Your session has expired. Please login again.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        const redirectTo = searchParams.get('redirect') || '/admin/projects';
        router.push(redirectTo);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please check your connection and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Admin Portal
        </CardTitle>
        <p className="text-gray-500 text-sm">
          Portfolio Management System
        </p>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">
              {message}
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Authenticating...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Need help? Contact administrator
            <br />
            <span className="text-blue-600">admin@portfolio.com</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// 3. Komponen utama dengan Suspense boundary
export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading login form...</p>
            </div>
          </CardContent>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}