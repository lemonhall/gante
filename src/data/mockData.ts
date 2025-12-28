import type { Project, Task } from '../types/gantt';

const today = new Date();
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
};

const startDate = today.toISOString().split('T')[0];

export const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Project Planning',
    type: 'group',
    startDate: startDate,
    endDate: addDays(today, 10),
    progress: 60,
  },
  {
    id: '1-1',
    parentId: '1',
    name: 'Requirements Analysis',
    type: 'task',
    startDate: startDate,
    endDate: addDays(today, 3),
    progress: 100,
  },
  {
    id: '1-2',
    parentId: '1',
    name: 'Design Phase',
    type: 'task',
    startDate: addDays(today, 3),
    endDate: addDays(today, 7),
    progress: 40,
    dependencies: ['1-1'],
  },
  {
    id: '1-3',
    parentId: '1',
    name: 'Milestone: Design Approved',
    type: 'milestone',
    startDate: addDays(today, 7),
    endDate: addDays(today, 7),
    progress: 0,
    dependencies: ['1-2'],
  },
  {
    id: '2',
    name: 'Development',
    type: 'group',
    startDate: addDays(today, 8),
    endDate: addDays(today, 20),
    progress: 10,
  },
  {
    id: '2-1',
    parentId: '2',
    name: 'Frontend Implementation',
    type: 'task',
    startDate: addDays(today, 8),
    endDate: addDays(today, 15),
    progress: 20,
    dependencies: ['1-3'],
  },
  {
    id: '2-2',
    parentId: '2',
    name: 'Backend API',
    type: 'task',
    startDate: addDays(today, 8),
    endDate: addDays(today, 18),
    progress: 10,
    dependencies: ['1-3'],
  },
  {
    id: '2-3',
    parentId: '2',
    name: 'Integration Testing',
    type: 'task',
    startDate: addDays(today, 15),
    endDate: addDays(today, 20),
    progress: 0,
    dependencies: ['2-1', '2-2'],
  },
];

export const mockProject: Project = {
  id: 'p1',
  name: 'Website Redesign',
  tasks: mockTasks,
};
