import React, { useRef, useState } from 'react';
import { mockTasks } from '../../data/mockData';
import { TaskList } from './components/TaskList';
import { TimelineHeader } from './components/TimelineHeader';
import { Timeline } from './components/Timeline';
import { ContextMenu } from '../../components/ContextMenu';
import { TaskModal } from '../../components/TaskModal';
import type { Task } from '../../types/gantt';

const COLUMN_WIDTH = 50;
const ROW_HEIGHT = 40;

export const GanttChart: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; task: Task } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Simple date range for demo - in real app this would be dynamic
  const startDate = '2025-12-29';
  const endDate = '2026-01-31';

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (headerRef.current) {
      headerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleAddTask = () => {
    setEditingTask(undefined); // New task mode
    setIsModalOpen(true);
  };

  const handleContextMenu = (e: React.MouseEvent, task: Task) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, task });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleEditTask = () => {
    if (contextMenu) {
      setEditingTask(contextMenu.task);
      setIsModalOpen(true);
    }
  };

  const handleAddSubtask = () => {
    if (contextMenu) {
      const parentTask = contextMenu.task;
      const newSubtask: Task = {
        id: `sub-${Date.now()}`,
        parentId: parentTask.id,
        name: '新子任务',
        type: 'task',
        startDate: parentTask.startDate,
        endDate: parentTask.endDate,
        progress: 0,
      };
      
      // Find index of parent to insert after (simplified logic, ideally should find last child)
      const parentIndex = tasks.findIndex(t => t.id === parentTask.id);
      const newTasks = [...tasks];
      newTasks.splice(parentIndex + 1, 0, newSubtask);
      
      setTasks(newTasks);
    }
  };

  const handleDeleteTask = () => {
    if (contextMenu) {
      const taskToDelete = contextMenu.task;
      // Delete task and its children
      // const idsToDelete = new Set([taskToDelete.id]);
      
      // Simple recursive finder for children (flattened list makes this tricky, but let's do a multi-pass or just filter)
      // For a flat list, we can just filter out anything that has an ancestor in the delete set.
      // But for now, let's just delete direct children for simplicity or do a proper tree traversal if needed.
      // Let's just filter out the task itself for now to be safe and simple.
      
      setTasks(tasks.filter(t => t.id !== taskToDelete.id && t.parentId !== taskToDelete.id));
    }
  };

  // Wrapper for modal save to handle "New Task" vs "Edit Task"
  const onModalSave = (taskData: Task) => {
      if (editingTask) {
          // Editing existing task
          const newTasks = tasks.map(t => t.id === taskData.id ? taskData : t);
          setTasks(newTasks);
      } else {
          // Creating new task
          const newTask: Task = {
              ...taskData,
              id: `new-${Date.now()}`,
              startDate: taskData.startDate || startDate,
              endDate: taskData.endDate || startDate,
              progress: taskData.progress || 0,
              type: taskData.type || 'task'
          };
          setTasks([...tasks, newTask]);
      }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">项目进度</h2>
        <div className="space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">日</button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">周</button>
            <button 
              onClick={handleAddTask}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              添加任务
            </button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Task List */}
        <TaskList 
            tasks={tasks} 
            rowHeight={ROW_HEIGHT} 
            onContextMenu={handleContextMenu}
        />

        {/* Right Panel: Timeline */}
        <div className="flex-1 flex flex-col overflow-hidden relative border-l border-gray-200">
          {/* Header (Syncs scroll with body) */}
          <div 
            ref={headerRef} 
            className="overflow-hidden bg-gray-50"
          >
            <TimelineHeader 
              startDate={startDate} 
              endDate={endDate} 
              columnWidth={COLUMN_WIDTH} 
            />
          </div>

          {/* Body (Scrollable) */}
          <div 
            ref={bodyRef}
            className="flex-1 overflow-auto"
            onScroll={handleScroll}
          >
            <Timeline 
              tasks={tasks} 
              startDate={startDate} 
              endDate={endDate} 
              columnWidth={COLUMN_WIDTH} 
              rowHeight={ROW_HEIGHT} 
              onContextMenu={handleContextMenu}
            />
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          options={[
            { label: '编辑任务', onClick: handleEditTask },
            { label: '添加子任务', onClick: handleAddSubtask },
            { label: '删除任务', onClick: handleDeleteTask, className: 'text-red-600' },
          ]}
        />
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onModalSave}
        task={editingTask}
      />
    </div>
  );
};
