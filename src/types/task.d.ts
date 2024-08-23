export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    listId: string;
    groupId: string;
    assignedUsers: string[];
    startDate: Date;
    endDate: Date;
    completed: boolean;
  }
  
  export interface TaskState {
    items: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  