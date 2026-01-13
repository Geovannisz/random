import React from 'react';
import { useWidgets } from '../context/WidgetContext';

const NoteWidget = ({ widgetId }) => {
  const { widgets, updateWidgetData } = useWidgets();
  const widget = widgets.find(w => w.id === widgetId);

  return (
    <textarea
      className="w-full h-24 bg-gray-700 text-white text-sm p-2 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder="Type a note..."
      value={widget?.data?.text || ''}
      onChange={(e) => updateWidgetData(widgetId, { text: e.target.value })}
    />
  );
};

export default NoteWidget;
