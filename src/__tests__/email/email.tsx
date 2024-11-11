import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function EmailTestPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail: email })
      });
      
      const data = await response.json();
      setResult(data);
      setStatus(data.success ? 'success' : 'error');
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Email Test Page
            </h1>
            <p className="mt-2 text-gray-600">
              Test your email configuration with Mailtrap
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Test Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Test Email
                </>
              )}
            </button>
          </form>

          {status !== 'idle' && (
            <div className={`mt-6 p-4 rounded-lg ${
              status === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-2">
                {status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <p className={`text-sm ${
                  status === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {status === 'success' 
                    ? `Email sent successfully! Message ID: ${result?.messageId}`
                    : `Failed to send email: ${result?.error || 'Unknown error'}`
                  }
                </p>
              </div>
            </div>
   