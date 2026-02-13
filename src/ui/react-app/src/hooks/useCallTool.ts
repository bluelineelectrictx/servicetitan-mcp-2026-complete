import { useState } from 'react';

export function useCallTool() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callTool = async (name: string, args: any = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/mcp/call-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, arguments: args }),
      });

      if (!response.ok) {
        throw new Error(`Tool call failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.isError) {
        throw new Error(result.content[0]?.text || 'Unknown error');
      }

      const text = result.content[0]?.text;
      return text ? JSON.parse(text) : null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callTool, loading, error };
}
