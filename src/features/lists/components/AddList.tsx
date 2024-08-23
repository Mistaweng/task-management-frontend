import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

interface AddListProps {
  onAddList: (list: {
    id?: string;
    name: string;
    tasks: string[];
    groupId: string;
    taskIds: string[];
  }) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSaveEdit: () => void;
  isEditing: boolean;
}

const AddList: React.FC<AddListProps> = ({ onAddList, inputValue, setInputValue, onSaveEdit, isEditing }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [taskIds, setTaskIds] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing) {
      setIsVisible(true);
    } else {
      setInputValue("");
      setName("");
      setGroupId("");
      setTaskIds([]);
      setIsVisible(false);
    }
  }, [isEditing, setInputValue]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSave = () => {
    if (isEditing) {
      onSaveEdit(); 
    } else {
      onAddList({
        name,
        tasks: [], 
        groupId,
        taskIds,
      });
    }
  };

  return (
    <div className="md:max-w-[100%] space-y-3">
      <button
        onClick={toggleVisibility}
        className="p-2 bg-blue-500 text-white rounded-lg"
      >
        {isVisible ? "Hide" : "Add List"}
      </button>
      {isVisible && (
        <div className="bg-white p-4 rounded-lg space-y-3 shadow-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="List name"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            placeholder="Group ID"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <input
            type="text"
            value={taskIds.join(",")}
            onChange={(e) => setTaskIds(e.target.value.split(","))}
            placeholder="Task IDs (comma-separated)"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            {isEditing ? "Save Changes" : "Add List"}
          </button>
        </div>
      )}
    </div>
  );
};

AddList.propTypes = {
  onAddList: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddList;
