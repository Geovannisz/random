import React from 'react';

const StatsWidget = () => {
    // Mock stats
    return (
        <div className="space-y-2">
            <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>CPU</span>
                    <span>45%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded overflow-hidden">
                    <div className="h-full bg-green-500 w-[45%]"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>RAM</span>
                    <span>72%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[72%]"></div>
                </div>
            </div>
        </div>
    )
}

export default StatsWidget;
