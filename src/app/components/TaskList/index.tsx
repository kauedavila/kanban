"use client";

import { useState } from "react";
import InputComponent from "./inputComponent";
import AddTask from "./addTask";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import { RENAME_TASK_LIST } from "@/services/renameTaskList";

type TaskListProps = {
  taskListID: string;
  taskListName: string;
  tasks?: {
    id: string;
    attributes: {
      Name: string;
    };
  }[];
  refetchTaskList?: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
};

const TaskList = ({
  taskListID,
  taskListName,
  tasks,
  refetchTaskList,
}: TaskListProps) => {
  const [addingTask, setAddingTask] = useState(false);
  const [renameTaskList] = useMutation(RENAME_TASK_LIST);

  return (
    <div className="bg-gray-100 flex flex-col shadow-md rounded-md p-4 w-1/4 shrink-0  gap-2 box-border min-h-[125px] h-full">
      <div className="flex items-center justify-between w-full">
        <InputComponent
          id="tasklistName"
          type="text"
          autoComplete="off"
          className="cursor-pointer focus:cursor-text"
          defaultValue={taskListName}
          onBlur={async (e) => {
            const newName = e.target.value;
            try {
              await renameTaskList({
                variables: {
                  id: taskListID,
                  name: newName,
                },
              }).then(() => {
                if (refetchTaskList) {
                  refetchTaskList();
                }
              });
            } catch (err) {
              console.log(err);
            }
          }}
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
      <AddTask
        addingTask={addingTask}
        setAddingTask={setAddingTask}
        taskListID={taskListID}
        refetchTaskList={refetchTaskList}
      />
    </div>
  );
};

export default TaskList;
