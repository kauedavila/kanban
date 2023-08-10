"use client";
import { useState } from "react";
import TaskList from "./components/TaskList";

export default function Home() {
  const [taskLists, setTaskLists] = useState<
    { name: string; tasks: string[] }[]
  >([]);

  const addTaskList = () => {
    setTaskLists([
      ...taskLists,
      {
        name: "Lista de tarefas",
        tasks: [],
      },
    ]);
  };

  return (
    <main
      className="
        flex flex-row p-4 gap-4 h-full
        flex-nowrap overflow-x-auto
        "
    >
      {taskLists.map((taskList, k) => (
        <TaskList key={k} tasklistName={taskList.name} />
      ))}
      <button
        className="
          bg-gray-400 hover:bg-gray-300 active:bg-gray-200 
          transition duration-100 ease-in-out shrink-0 
          text-white shadow-md rounded-md p-4 w-96  gap-2
          box-border
          min-h-[125px] h-[fit-content]
          "
        onClick={addTaskList}
      >
        Add Task List
      </button>
    </main>
  );
}
