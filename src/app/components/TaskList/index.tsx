"use client";
import { useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";

type TaskListProps = {
  tasklistName?: string;
};

const TaskList = ({ tasklistName = "Lista de tarefas" }: TaskListProps) => {
  const [addingTask, setAddingTask] = useState(false);
  const [taskList, setTaskList] = useState<string[]>([]);

  useEffect(() => {
    const tasklistNameElement = document.getElementById("tasklistName");
    if (tasklistNameElement) {
      tasklistNameElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          tasklistNameElement.blur();
        }
      });
    }
  }, []);

  const handleAddTask = () => {
    const input = document.getElementById("task input") as HTMLInputElement;
    if (input) {
      const task = input.value;
      if (task) {
        setTaskList([...taskList, task]);
        setAddingTask(false);
        input.value = "";
      }
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col shadow-md rounded-md p-4 w-96 shrink-0  gap-2 box-border min-h-[125px] h-full">
      <div className="flex items-center justify-between w-full">
        <Input
          id="tasklistName"
          type="text"
          autoComplete="off"
          className="cursor-pointer focus:cursor-text"
          defaultValue={tasklistName}
        />
        <p className="ml-2">...</p>
      </div>

      {taskList.map((task, k) => (
        <div
          key={k}
          className="bg-white flex flex-col 
        shadow-md rounded-md p-4 w-full box-border
        hover:bg-gray-200 transition duration-200 ease-in-out
        cursor-pointer select-none
       "
        >
          <p>{task}</p>
        </div>
      ))}
      {addingTask ? (
        <div>
          <Input
            id="task input"
            className="px-4 py-4 "
            autoFocus
            placeholder="Insira um título para este cartão..."
          />
          <div className="flex items-center justify-center w-full gap-4">
            <Button onClick={() => handleAddTask()}>Adicionar cartão</Button>
            <Button onClick={() => setAddingTask(false)}>Cancelar</Button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between w-full
      hover:bg-gray-200 active:bg-gray-300 transition duration-100 ease-in-out
       rounded-md p-2 mt-2 cursor-pointer select-none"
          onClick={() => setAddingTask(true)}
        >
          <p>+ Adicionar um cartão</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
