// src/pages/dev/test.tsx
import { useState, useEffect } from 'react';
import { testConnection } from '@/utils/supabase-client';

export default function TestPage() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    async function test() {
      const result = await testConnection();
      if (result.success) {
        setStatus('✅ Connection successful');
      } else {
        // Safely handle the error message
        const errorMessage = result.error instanceof Error 
          ? result.error.message 
          : 'Unknown error occurred';
        setStatus(`❌ Connection failed: ${errorMessage}`);
      }
    }

    test();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <p className="text-lg">{status}</p>
      <p className="text-sm text-gray-500 mt-2">
        Check the browser console for detailed information
      </p>
    </div>
  );
}