"use client";

import { useState } from "react";
import InputComponent from "./inputComponent";
import AddTask from "./addTask";
import { useMutation } from "@apollo/client";
import { RENAME_TASK_LIST } from "@/services/renameTaskList";
import TaskListMenu from "./taskListMenu";
import Task from "../Task";
import { TaskListProps } from "@/app/types/taskLystTypes";

const TaskList = ({
  taskListID,
  taskListName,
  tasks,
  refetchTaskList,
}: TaskListProps) => {
  const [addingTask, setAddingTask] = useState(false);
  const [renameTaskList] = useMutation(RENAME_TASK_LIST);
  const [taskListMenuOpen, setTaskListMenuOpen] = useState(false);

  return (
    <div className=" bg-gray-100 flex flex-col shadow-md rounded-md p-4 w-1/5 gap-2 box-border min-h-[125px] h-[fit-content] ">
      <div className=" flex items-center justify-between w-full">
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

        <button
          className="ml-2 hover:bg-gray-200 transition duration-200 ease-in-out
        rounded-md cursor-pointer select-none w-8 h-8 flex  justify-center
        "
          onClick={() => setTaskListMenuOpen(!taskListMenuOpen)}
        >
          ...
        </button>

        <TaskListMenu
          taskListID={taskListID}
          taskListName={taskListName}
          refetchTaskList={refetchTaskList}
          taskListMenuOpen={taskListMenuOpen}
          setTaskListMenuOpen={setTaskListMenuOpen}
        />
      </div>

      {tasks?.map((task, k) => (
        <Task
          key={k}
          task={task}
          taskListID={taskListID}
          refetchTaskList={refetchTaskList}
        />
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
