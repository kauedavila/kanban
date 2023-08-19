"use client";

import { useState } from "react";
import InputComponent from "./inputComponent";
import AddTask from "./addtask";

type TaskListProps = {
  taskID?: string;
  taskListName?: string;
  tasks?: {
    id: string;
    attributes: {
      Name: string;
    };
  }[];
};

const TaskList = ({ taskID, taskListName, tasks }: TaskListProps) => {
  const [addingTask, setAddingTask] = useState(false);

  return (
    <div className="bg-gray-100 flex flex-col shadow-md rounded-md p-4 w-1/4 shrink-0  gap-2 box-border min-h-[125px] h-full">
      <div className="flex items-center justify-between w-full">
        <InputComponent
          id="tasklistName"
          type="text"
          autoComplete="off"
          className="cursor-pointer focus:cursor-text"
          defaultValue={taskListName}
        />
        <p className="ml-2">...</p>
      </div>

      {tasks?.map((task, k) => (
        <div
          key={k}
          className="bg-white flex flex-col 
        shadow-md rounded-md p-4 w-full box-border
        hover:bg-gray-200 transition duration-200 ease-in-out
        cursor-pointer select-none
       "
        >
          <p>{task.attributes.Name}</p>
        </div>
      ))}
      <AddTask addingTask={addingTask} setAddingTask={setAddingTask} />
    </div>
  );
};

export default TaskList;
