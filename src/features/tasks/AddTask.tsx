import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LuClipboardList } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import Calendar from "../../components/Calender";

interface AddTaskProps {
  onAddTask: (task: {
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
  }) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSaveEdit: () => void;
  isEditing: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask, inputValue, setInputValue, onSaveEdit, isEditing }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [view, setView] = useState("notes");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [listId, setListId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing) {
      setIsVisible(true);
    } else {
      setInputValue("");
      setStartDate(new Date());
      setEndDate(new Date());
      setIsVisible(false);
    }
  }, [isEditing, setInputValue]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSave = () => {
    if (isEditing) {
      onSaveEdit(); 
    } else {
      onAddTask({
        title,
        description,
        status,
        priority,
        listId,
        groupId,
        assignedUsers,
        startDate,
        endDate,
        completed: false,
      });
    }
  };

  return (
    <div className="md:max-w-[40%] space-y-3">
      <button
        onClick={toggleVisibility}
        className="p-2 bg-blue-500 text-white rounded-lg"
      >
        {isVisible ? "Hide" : "Add Task"}
      </button>
      {isVisible && (
        <div className="bg-white p-4 rounded-lg space-y-3 shadow-md">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <div className="flex items-center justify-between space-x-2">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <input
              type="text"
              value={listId}
              onChange={(e) => setListId(e.target.value)}
              placeholder="List ID"
              className="w-full bg-gray-100 border-none rounded-lg p-2"
            />
            <input
              type="text"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              placeholder="Group ID"
              className="w-full bg-gray-100 border-none rounded-lg p-2"
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <input
              type="text"
              value={assignedUsers.join(",")}
              onChange={(e) => setAssignedUsers(e.target.value.split(","))}
              placeholder="Assigned Users (comma-separated)"
              className="w-full bg-gray-100 border-none rounded-lg p-2"
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div
              onClick={() => setView("calendar")}
              className={`p-3 border rounded-lg cursor-pointer ${view === "calendar" ? "bg-black text-white" : "bg-gray-100"}`}
            >
              <SlCalender size={18} />
            </div>
            <div
              onClick={() => setView("notes")}
              className={`p-3 border rounded-lg cursor-pointer ${view === "notes" ? "bg-black text-white" : "bg-gray-100"}`}
            >
              <LuClipboardList size={18} />
            </div>
          </div>
          {view === "notes" ? (
            <textarea
              placeholder="Add notes"
              className="border-none bg-gray-100 w-full h-36 rounded-md p-2"
            />
          ) : (
            <Calendar setStartDate={setStartDate} setEndDate={setEndDate} />
          )}
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            {isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      )}
    </div>
  );
};

AddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddTask;
