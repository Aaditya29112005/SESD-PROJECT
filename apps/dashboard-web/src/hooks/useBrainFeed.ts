import { useState, useEffect } from 'react';

export const useBrainFeed = () => {
  const [brainEvents, setBrainEvents] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/brain/live-actions');
        const data = await response.json();
        if (data.actions && data.actions.length > 0) {
          setBrainEvents(prev => [...data.actions, ...prev].slice(0, 5));
        }
      } catch (e) { /* Brain not running locally — demo mode */ }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { brainEvents, clearEvents: () => setBrainEvents([]) };
};
