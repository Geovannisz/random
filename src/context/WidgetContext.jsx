import React, { createContext, useContext, useState, useEffect } from 'react';

const WidgetContext = createContext();

export const useWidgets = () => useContext(WidgetContext);

const initialWidgets = [
  { id: 'clock', type: 'clock', title: 'Clock', mode: 'grid', x: 0, y: 0, z: 10 },
  { id: 'note', type: 'note', title: 'Quick Note', mode: 'grid', x: 50, y: 50, z: 10, data: { text: '' } },
  { id: 'stats', type: 'stats', title: 'System Stats', mode: 'grid', x: 100, y: 100, z: 10 },
];

export const WidgetProvider = ({ children }) => {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem('user_widgets');
    return saved ? JSON.parse(saved) : initialWidgets;
  });

  useEffect(() => {
    localStorage.setItem('user_widgets', JSON.stringify(widgets));
  }, [widgets]);

  // Actions
  const updateWidgetMode = (id, newMode) => {
    setWidgets(prev => prev.map(w =>
      w.id === id ? { ...w, mode: newMode } : w
    ));
  };

  const updateWidgetPosition = (id, x, y) => {
    setWidgets(prev => prev.map(w =>
      w.id === id ? { ...w, x, y } : w
    ));
  };

  const updateWidgetData = (id, data) => {
      setWidgets(prev => prev.map(w =>
        w.id === id ? { ...w, data: { ...w.data, ...data } } : w
      ));
  }

  // Helper to bring floating widget to front
  const bringToFront = (id) => {
      setWidgets(prev => {
          const maxZ = Math.max(...prev.map(w => w.z || 0));
          return prev.map(w => w.id === id ? { ...w, z: maxZ + 1 } : w);
      });
  }

  return (
    <WidgetContext.Provider value={{ widgets, updateWidgetMode, updateWidgetPosition, updateWidgetData, bringToFront }}>
      {children}
    </WidgetContext.Provider>
  );
};
