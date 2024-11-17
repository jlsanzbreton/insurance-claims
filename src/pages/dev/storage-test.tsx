// src/pages/dev/storage-test.tsx
import { useState } from 'react';
import { testStorageSetup } from '../../utils/storage-tests';

interface TestResult {
  success: boolean;
  message?: string;
  error?: string;
  step?: string;
}

export default function StorageTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const runTests = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const testResult = await testStorageSetup();
      setResult(testResult);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Storage Tests</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <button
            onClick={runTests}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Running Tests...' : 'Run Storage Tests'}
          </button>

          {result && (
            <div className={`mt-6 p-4 rounded-lg ${
              result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {result.success ? (
                <p>✅ {result.message}</p>
              ) : (
                <div>
                  <p>❌ Error during {result.step} step:</p>
                  <p className="mt-1 font-mono text-sm">{result.error}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Test Results Log:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
              Check browser console (F12) for detailed logs
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}