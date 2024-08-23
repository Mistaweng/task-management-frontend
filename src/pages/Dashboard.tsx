import { CiClock2 } from "react-icons/ci";
import AddTask from "../features/tasks/AddTask";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { fetchTasks, addTask, toggleTaskCompletion, deleteTask, editTask } from "../features/tasks/tasksSlice";
import { AppDispatch } from "../app/store";

interface Task {
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

const Dashboard = () => {
  const today = new Date();
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks, status, error } = useSelector((state: any) => state.tasks);

  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    if (task.title.trim()) {
      dispatch(addTask(task));
    }
  };

  const handleEditTask = (index: number) => {
    setInputValue(tasks[index].title);
    setEditingIndex(index);
    setIsDropdownOpen(null);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const taskId = tasks[editingIndex].id;
      dispatch(editTask({
        id: taskId,
        updatedTask: { title: inputValue },
      }));
      setEditingIndex(null);
      setInputValue("");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const formatDate = (date: any) => {
    if (date) {
      const dateObj = new Date(date);
      return isNaN(dateObj.getTime()) ? 'Invalid date' : dateObj.toLocaleDateString();
    }
    return 'No date available';
  };

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full h-full p-16 relative">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Good Morning, Sullivan! 👋</h1>
          <p className="text-lg text-gray-600">Today, {formattedDate}</p>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="flex space-x-1 bg-white p-2 min-w-28 rounded-lg">
            <div className="flex items-center">
              <div className="bg-gray-100 p-1 rounded-md">
                <MdOutlineKeyboardArrowDown />
              </div>
            </div>
            <div>Today</div>
          </div>
          <div className="p-2 min-w-10 bg-white text-center rounded-lg">=</div>
        </div>
      </div>
      <div className="py-10">
        {tasks.map((task: Task, index: number) => (
          <div
            key={task.id}
            className={`mb-2 p-2 rounded-md bg-white cursor-pointer ${task.completed ? "line-through" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => dispatch(toggleTaskCompletion(task.id))}
                  className="border border-gray-300 w-5 h-5 rounded-md"
                  aria-checked={task.completed}
                  role="checkbox"
                >
                  {task.completed && <span className="text-gray-500">✔️</span>}
                </button>
                <h4>{task.title}</h4>
              </div>
              <div className="flex items-center space-x-1 relative">
                <div className="bg-gray-100 p-2 rounded-lg flex items-center space-x-1">
                  <div>
                    <CiClock2 />
                  </div>
                  <p>{formatDate(task.startDate)} - {formatDate(task.endDate)}</p>
                </div>
                <button
                  onClick={() => setIsDropdownOpen(isDropdownOpen === index ? null : index)}
                  className="p-3 bg-gray-100 rounded-lg"
                  aria-expanded={isDropdownOpen === index}
                  aria-haspopup="true"
                >
                  <SlOptionsVertical size={14} />
                </button>
                {isDropdownOpen === index && (
                  <div className="absolute right-0 top-8 bg-white shadow-md rounded-md w-32 z-10">
                    <div
                      onClick={() => handleEditTask(index)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => dispatch(deleteTask(task.id))}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 left-12 right-0">
        <AddTask
          onAddTask={handleAddTask}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSaveEdit={handleSaveEdit}
          isEditing={editingIndex !== null}
        />
      </div>
    </div>
  );
};

export default Dashboard;
