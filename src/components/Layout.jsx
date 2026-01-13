import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useWidgets } from '../context/WidgetContext';
import WidgetWrapper from './WidgetWrapper';
import ClockWidget from './ClockWidget';
import NoteWidget from './NoteWidget';
import StatsWidget from './StatsWidget';
const WIDGET_COMPONENTS = {
    clock: ClockWidget,
    note: NoteWidget,
    stats: StatsWidget
};

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const { widgets } = useWidgets();

  if (!user) return <Outlet />; // Should be handled by PrivateRoute, but fail-safe here

  const pinnedWidgets = widgets.filter(w => w.mode === 'pinned');
  const floatingWidgets = widgets.filter(w => w.mode === 'floating');

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar for Pinned Widgets */}
        <div id="pinned-widgets-area" className="bg-gray-900 border-b border-gray-800 p-2 min-h-[60px] flex items-center gap-4 overflow-x-auto">
             {pinnedWidgets.length === 0 && <div className="text-xs text-gray-500 italic px-4">Pinned widgets appear here</div>}
             {pinnedWidgets.map(widget => {
                 const Component = WIDGET_COMPONENTS[widget.type];
                 return (
                     <WidgetWrapper key={widget.id} widget={widget}>
                         <Component widgetId={widget.id} />
                     </WidgetWrapper>
                 )
             })}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 relative" id="main-content-area">
          <Outlet />

          {/* Floating Widgets Layer */}
          {/* using Portal to ensure they are on top of everything within this container, or just render here */}
          {floatingWidgets.map(widget => {
                const Component = WIDGET_COMPONENTS[widget.type];
                return (
                    <WidgetWrapper key={widget.id} widget={widget}>
                        <Component widgetId={widget.id} />
                    </WidgetWrapper>
                )
          })}
        </main>
      </div>
    </div>
  );
};

export default Layout;
