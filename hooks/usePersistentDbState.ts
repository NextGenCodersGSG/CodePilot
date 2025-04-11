import { useEffect, useState } from "react";

export function usePersistentDbState<T>(
  initialValue: T,
  fetchFn: () => Promise<T>,
  saveFn: (data: T) => Promise<void>
): [T, React.Dispatch<React.SetStateAction<T>>, boolean, Error | null] {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initial fetch from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFn]);

  // Save to database when data changes
  const updateData: React.Dispatch<React.SetStateAction<T>> = (newValue) => {
    const updatedValue = typeof newValue === 'function' 
      ? (newValue as Function)(data) 
      : newValue;
    
    setData(updatedValue);
    
    // Save to DB
    saveFn(updatedValue).catch(err => {
      setError(err instanceof Error ? err : new Error('Failed to save data'));
    });
  };

  return [data, updateData, loading, error];
}

