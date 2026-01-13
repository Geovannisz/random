import React from 'react';
import { useWidgets } from '../context/WidgetContext';
import WidgetWrapper from '../components/WidgetWrapper';
import ClockWidget from '../components/ClockWidget';
import NoteWidget from '../components/NoteWidget';
import StatsWidget from '../components/StatsWidget';

const WIDGET_COMPONENTS = {
  clock: ClockWidget,
  note: NoteWidget,
  stats: StatsWidget
};

const WidgetsPage = () => {
  const { widgets } = useWidgets();

  // Filter for grid mode widgets only
  const gridWidgets = widgets.filter(w => w.mode === 'grid');

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-white">Your Dashboard</h2>
      <p className="text-gray-400 mb-8">Pin widgets to the top or float them to use across pages.</p>

      {gridWidgets.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border-2 border-dashed border-gray-800 rounded-lg">
              All widgets are currently pinned or floating.
          </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridWidgets.map(widget => {
                const Component = WIDGET_COMPONENTS[widget.type];
                return (
                <div key={widget.id} className="h-48">
                    <WidgetWrapper widget={widget}>
                        <Component widgetId={widget.id} />
                    </WidgetWrapper>
                </div>
                );
            })}
          </div>
      )}
    </div>
  );
};

export default WidgetsPage;
