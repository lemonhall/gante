export interface Task {
  id: string;
  name: string;
  type: 'task' | 'milestone' | 'group';
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
  parentId?: string;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
