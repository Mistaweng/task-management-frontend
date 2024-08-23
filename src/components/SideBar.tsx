import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, addList, deleteList } from '../features/lists/listsSlice';
import { fetchGroups, addGroup, deleteGroup } from '../features/groups/groupsSlice';
import { AppDispatch, RootState } from '../app/store';
import AddList from '../features/lists/components/AddList';
import AddGroup from '../features/groups/components/AddGroup';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: lists, status: listsStatus, error: listsError } = useSelector((state: RootState) => state.lists);
  const { items: groups, status: groupsStatus, error: groupsError } = useSelector((state: RootState) => state.groups);

  const [isVisible, setIsVisible] = useState<'list' | 'group' | null>(null); 
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchLists());
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleDeleteList = (id: string) => {
    dispatch(deleteList(id));
  };

  const handleDeleteGroup = (id: string) => {
    dispatch(deleteGroup(id));
  };

  const handleAddList = (list: {
    id?: string;
    name: string;
    tasks: string[];
    groupId: string;
    taskIds: string[];
  }) => {
    dispatch(addList(list));
    setInputValue('');
    setIsEditing(false);
    setIsVisible(null);
  };

  const handleSaveListEdit = () => {
    setIsEditing(false);
  };

  const handleAddGroup = (group: {
    name: string;
    lists: string[];
  }) => {
    dispatch(addGroup(group));
    setInputValue('');
    setIsEditing(false);
    setIsVisible(null);
  };

  const handleSaveGroupEdit = () => {
    setIsEditing(false);
  };

  if (listsStatus === 'loading' || groupsStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (listsStatus === 'failed') {
    return <p>Error: {listsError}</p>;
  }

  if (groupsStatus === 'failed') {
    return <p>Error: {groupsError}</p>;
  }

  return (
    <aside className="bg-white my-2 min-h-[98vh] rounded-md px-2 py-6">
      {/* Lists */}
      <div>
        <h2 className="font-bold text-xl text-gray-900">Private</h2>
        <div>
          {lists.map((item) => (
            <div
              key={item.id}
              className="py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 group rounded-2xl px-3"
            >
              <div className="flex space-x-3">
                <div className="text-xl">📝</div>
                <p className="text-base">{item.name}</p>
              </div>
              <div className="bg-gray-100 px-2 group-hover:bg-white py-1 rounded-full">
                {item.tasks.length}
              </div>
              <button
                onClick={() => handleDeleteList(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div
          className="bg-gray-100 rounded-full px-3 my-2 flex justify-between items-center cursor-pointer"
          onClick={() => setIsVisible('list')}
        >
          <h1>➕ Create new list</h1>
          <div className="bg-gray-100 px-2 py-1 rounded-full">L</div>
        </div>
        {isVisible === 'list' && (
          <AddList
            onAddList={handleAddList}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSaveEdit={handleSaveListEdit}
            isEditing={isEditing}
          />
        )}
      </div>
      {/* Groups */}
      <div>
        <h2 className="font-bold text-xl text-gray-900">Group</h2>
        <div className="grid grid-cols-2 gap-0 px-3 py-2">
          {groups.map((item) => (
            <div key={item.id} className="flex flex-col items-center space-y-2">
              <div className="bg-gray-100 h-36 w-36 rounded-md flex items-center justify-center">
              </div>
              <div className="text-center">
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.lists.length} Lists</p>
              </div>
              <button
                onClick={() => handleDeleteGroup(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div
          className="bg-gray-100 rounded-full p-1 my-2 flex justify-between items-center cursor-pointer"
          onClick={() => setIsVisible('group')}
        >
          <h1>➕ Create new group</h1>
          <div className="bg-gray-100 px-2 py-1 rounded-full">G</div>
        </div>
        {isVisible === 'group' && (
          <AddGroup
            onAddGroup={handleAddGroup}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSaveEdit={handleSaveGroupEdit}
            isEditing={isEditing}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
