"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { useQuery } from "@apollo/client";
import AddTaskList from "./components/TaskList/addTaskList";
import { GET_TASK_LISTS } from "@/services/getTaskList";

type TaskListStateProps = {
  id: string;
  attributes: {
    Name: string;
    tasks: {
      data: {
        id: string;
        attributes: {
          Name: string;
        };
      }[];
    };
  };
}[];

export default function Home() {
  const { data, loading, refetch } = useQuery(GET_TASK_LISTS);
  const [taskLists, setTaskLists] = useState<TaskListStateProps>([]);

  useEffect(() => {
    setTaskLists(data?.taskLists?.data);
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <main
          className="
        flex flex-row p-4 gap-4 h-screen
        flex-nowrap overflow-x-auto
        "
        >
          {taskLists?.map((taskList, k) => (
            <TaskList
              key={k}
              refetchTaskList={refetch}
              taskListID={taskList.id}
              taskListName={taskList.attributes.Name}
              tasks={taskList.attributes.tasks?.data}
            />
          ))}

          <AddTaskList />
        </main>
      )}
    </>
  );
}
