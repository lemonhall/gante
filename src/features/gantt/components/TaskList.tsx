import React from 'react';
import type { Task } from '../../../types/gantt';

interface TaskListProps {
  tasks: Task[];
  rowHeight: number;
  onContextMenu: (e: React.MouseEvent, task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, rowHeight, onContextMenu }) => {
  return (
    <div className="border-r border-gray-200 bg-white flex-shrink-0 w-64 overflow-hidden flex flex-col">
      <div className="h-10 border-b border-gray-200 bg-gray-50 font-semibold text-xs text-gray-500 flex items-center px-4">
        任务名称
      </div>
      <div className="flex-1 overflow-hidden">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border-b border-gray-100 flex items-center px-4 text-sm text-gray-700 truncate hover:bg-gray-50 transition-colors cursor-pointer"
            style={{ height: rowHeight }}
            title={task.name}
            onContextMenu={(e) => onContextMenu(e, task)}
          >
            <span style={{ paddingLeft: task.parentId ? '20px' : '0px' }}>
              {task.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
