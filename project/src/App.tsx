import React, { useState } from 'react';
import InitialForm from './components/InitialForm';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'loading' | 'dashboard'>('form');
  const [user, setUser] = useState<User | null>(null);

  const handleFormSubmit = (userData: User) => {
    setUser(userData);
    setCurrentView('loading');
  };

  const handleLoadingComplete = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'form') {
    return <InitialForm onSubmit={handleFormSubmit} />;
  }

  if (currentView === 'loading' && user) {
    return <LoadingScreen user={user} onComplete={handleLoadingComplete} />;
  }

  if (currentView === 'dashboard' && user) {
    return <Dashboard user={user} />;
  }

  return null;
}

export default App;