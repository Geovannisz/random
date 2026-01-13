import React from 'react';
import Draggable from 'react-draggable';
import { Pin, X, Move, Maximize2, Minimize2 } from 'lucide-react';
import { useWidgets } from '../context/WidgetContext';

const WidgetWrapper = ({ widget, children }) => {
  const { updateWidgetMode, updateWidgetPosition, bringToFront } = useWidgets();

  // Local state for dragging to prevent excessive re-renders/writes to context during drag
  // We only sync to context onStop

  if (widget.mode === 'grid') {
    return (
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 h-full flex flex-col relative group">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-300">{widget.title}</h3>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => updateWidgetMode(widget.id, 'pinned')}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-blue-400"
                    title="Pin to Top"
                >
                    <Pin size={16} />
                </button>
                <button
                    onClick={() => updateWidgetMode(widget.id, 'floating')}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-green-400"
                    title="Float / Free Move"
                >
                    <Maximize2 size={16} />
                </button>
            </div>
        </div>
        <div className="flex-1 overflow-auto">
            {children}
        </div>
      </div>
    );
  }

  if (widget.mode === 'pinned') {
    return (
        <div className="bg-gray-800 rounded-lg px-4 py-2 shadow-md border border-gray-700 flex items-center gap-4 min-w-[200px]">
             <div className="flex-1">
                {children}
             </div>
             <div className="flex gap-1 border-l border-gray-700 pl-2">
                <button
                    onClick={() => updateWidgetMode(widget.id, 'grid')}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400"
                    title="Return to Grid"
                >
                    <X size={14} />
                </button>
                 <button
                    onClick={() => updateWidgetMode(widget.id, 'floating')}
                    className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-green-400"
                    title="Float"
                >
                    <Maximize2 size={14} />
                </button>
             </div>
        </div>
    );
  }

  if (widget.mode === 'floating') {
    return (
      <Draggable
        defaultPosition={{ x: widget.x, y: widget.y }}
        onStop={(e, data) => updateWidgetPosition(widget.id, data.x, data.y)}
        onStart={() => bringToFront(widget.id)}
        handle=".drag-handle"
        bounds="parent"
      >
        <div
            className="absolute bg-gray-800 rounded-lg shadow-2xl border border-gray-600 w-64 pointer-events-auto flex flex-col"
            style={{ zIndex: widget.z }}
        >
          <div className="drag-handle bg-gray-700 p-2 rounded-t-lg cursor-move flex justify-between items-center">
             <span className="text-sm font-bold text-gray-300 select-none flex items-center gap-2">
                <Move size={14} /> {widget.title}
             </span>
             <div className="flex gap-1">
                 <button
                    onClick={() => updateWidgetMode(widget.id, 'pinned')}
                    className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-blue-400"
                    title="Pin"
                >
                    <Pin size={14} />
                </button>
                <button
                    onClick={() => updateWidgetMode(widget.id, 'grid')}
                    className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-red-400"
                    title="Close to Grid"
                >
                    <Minimize2 size={14} />
                </button>
             </div>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </Draggable>
    );
  }

  return null;
};

export default WidgetWrapper;
