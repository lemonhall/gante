# Gantt Chart Data Model

This document outlines the data structures used in the Gantt Chart application.

## 1. Project

Represents the overall project container.

```typescript
interface Project {
  id: string;
  name: string;
  startDate: string; // ISO 8601 Date string
  endDate?: string; // ISO 8601 Date string
  description?: string;
  settings: ProjectSettings;
}

interface ProjectSettings {
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  workingHours: {
    start: string; // "09:00"
    end: string; // "17:00"
  };
}
```

## 2. Task

Represents a single unit of work in the Gantt chart.

```typescript
interface Task {
  id: string;
  projectId: string;
  name: string;
  type: 'task' | 'milestone' | 'group';
  
  // Scheduling
  startDate: string; // ISO 8601 Date string
  endDate: string; // ISO 8601 Date string
  duration: number; // In hours or days depending on granularity
  progress: number; // 0 to 100
  
  // Hierarchy
  parentId?: string; // For nested tasks (subtasks)
  
  // Dependencies
  dependencies: string[]; // Array of Task IDs that this task depends on
  
  // Assignment
  assigneeIds: string[]; // Array of Resource IDs
  
  // Visuals
  color?: string;
  isExpanded?: boolean; // For group tasks
}
```

## 3. Resource

Represents a person or asset assigned to tasks.

```typescript
interface Resource {
  id: string;
  name: string;
  role?: string;
  avatarUrl?: string;
}
```

## 4. Dependency

(Optional explicit type if simple ID array is insufficient)

```typescript
interface Dependency {
  id: string;
  sourceTaskId: string;
  targetTaskId: string;
  type: 'FS' | 'SS' | 'FF' | 'SF'; // Finish-to-Start, Start-to-Start, etc.
  lag?: number; // Delay in time units
}
```

## 5. View Configuration

State for the Gantt chart UI.

```typescript
interface ViewConfig {
  zoomLevel: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  startDate: string; // Viewport start
  endDate: string; // Viewport end
  showDependencies: boolean;
  showCriticalPath: boolean;
}
```
