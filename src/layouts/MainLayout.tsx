import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">甘特图项目</h1>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};
