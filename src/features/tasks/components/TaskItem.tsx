import React from "react";
import { Task } from "../../../types/task";
interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className={`mb-2 p-2 rounded-md bg-white ${task.completed ? "line-through" : ""}`}>
      <div className="flex items-center justify-between">
        <h4>{task.title}</h4>
      </div>
    </div>
  );
};

export default TaskItem;
