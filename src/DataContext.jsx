import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAllData } from './api';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchAllData()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <DataContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

export function useTranslation(section) {
  const { data } = useData();
  return data?.translations?.[section] || null;
}

export function t(section, lang) {
  // Helper to get translation for a section
  const { data } = useData();
  if (!data?.translations?.[section]) return null;
  return data.translations[section][lang] || data.translations[section].ar;
}

export default DataContext;