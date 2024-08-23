import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

interface AddGroupProps {
  onAddGroup: (group: {
    name: string;
    lists: string[];
  }) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSaveEdit: () => void;
  isEditing: boolean;
}

const AddGroup: React.FC<AddGroupProps> = ({ onAddGroup, inputValue, setInputValue, onSaveEdit, isEditing }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [lists, setLists] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing) {
      setIsVisible(true);
    } else {
      setInputValue("");
      setName("");
      setLists([]);
      setIsVisible(false);
    }
  }, [isEditing, setInputValue]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSave = () => {
    if (isEditing) {
      onSaveEdit();
    } else {
      onAddGroup({
        name,
        lists,
      });
    }
  };

  return (
    <div className="md:max-w-[100%] space-y-3">
      <button
        onClick={toggleVisibility}
        className="p-2 bg-blue-500 text-white rounded-lg"
      >
        {isVisible ? "Hide" : "Add Group"}
      </button>
      {isVisible && (
        <div className="bg-white p-4 rounded-lg space-y-3 shadow-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Group name"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <input
            type="text"
            value={lists.join(",")}
            onChange={(e) => setLists(e.target.value.split(","))}
            placeholder="List IDs (comma-separated)"
            className="w-full bg-gray-100 border-none rounded-lg p-2"
          />
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            {isEditing ? "Save Changes" : "Add Group"}
          </button>
        </div>
      )}
    </div>
  );
};

AddGroup.propTypes = {
  onAddGroup: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default AddGroup;

