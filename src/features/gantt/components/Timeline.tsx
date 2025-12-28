import React from 'react';
import type { Task } from '../../../types/gantt';
import { getDaysRange } from '../../../utils/dateUtils';

interface TimelineProps {
  tasks: Task[];
  startDate: string;
  endDate: string;
  columnWidth: number;
  rowHeight: number;
  onContextMenu: (e: React.MouseEvent, task: Task) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ tasks, startDate, endDate, columnWidth, rowHeight, onContextMenu }) => {
  const days = getDaysRange(startDate, endDate);
  const projectStart = new Date(startDate).getTime();

  const getTaskStyle = (task: Task) => {
    const taskStart = new Date(task.startDate).getTime();
    const taskEnd = new Date(task.endDate).getTime();
    
    // Calculate offset in days
    const dayDiff = (taskStart - projectStart) / (1000 * 60 * 60 * 24);
    const duration = (taskEnd - taskStart) / (1000 * 60 * 60 * 24); // +1 to include end date? Usually Gantt charts are inclusive.

    return {
      left: dayDiff * columnWidth,
      width: Math.max(duration * columnWidth, columnWidth / 2), // Minimum width
    };
  };

  return (
    <div className="relative" style={{ width: days.length * columnWidth, height: tasks.length * rowHeight }}>
      {/* Grid Lines */}
      <div className="absolute inset-0 flex pointer-events-none">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="flex-shrink-0 border-r border-gray-100 h-full"
            style={{ width: columnWidth }}
          />
        ))}
      </div>

      {/* Task Bars */}
      {tasks.map((task, index) => {
        const style = getTaskStyle(task);
        return (
          <div
            key={task.id}
            className="absolute flex items-center"
            style={{
              top: index * rowHeight,
              height: rowHeight,
              left: 0,
              right: 0,
            }}
          >
            <div
              className={`h-6 rounded shadow-sm relative group cursor-pointer ${
                task.type === 'group' ? 'bg-blue-500' : 
                task.type === 'milestone' ? 'bg-yellow-400 rotate-45 w-4 h-4 !rounded-none' : 'bg-emerald-500'
              }`}
              style={{
                left: style.left + (task.type === 'milestone' ? 12 : 4), // Adjust for padding/centering
                width: task.type === 'milestone' ? undefined : style.width,
              }}
              onContextMenu={(e) => onContextMenu(e, task)}
            >
               {/* Progress Bar */}
               {task.type !== 'milestone' && (
                <div 
                  className="h-full bg-black/20 rounded-l" 
                  style={{ width: `${task.progress}%` }}
                />
               )}
               
               {/* Tooltip or Label */}
               <div className="absolute left-full ml-2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-white px-2 py-1 rounded shadow border border-gray-200">
                 {task.name} ({task.progress}%)
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
