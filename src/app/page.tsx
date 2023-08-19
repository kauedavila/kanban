"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_TASK_LISTS = gql`
  query TaskLists {
    taskLists {
      data {
        id
        attributes {
          Name
          tasks {
            data {
              id
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

const ADD_TASK_LIST = gql`
  mutation AddTaskList($name: String!) {
    createTaskList(name: $name) {
      id
      attributes {
        Name
      }
    }
  }
`;

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
  const { data, loading } = useQuery(GET_TASK_LISTS);
  const [taskLists, setTaskLists] = useState<TaskListStateProps>([]);
  const [addTaskList] = useMutation(ADD_TASK_LIST, {
    refetchQueries: [{ query: GET_TASK_LISTS }],
  });

  useEffect(() => {
    setTaskLists(data?.taskLists?.data);
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="text-white">Carregando</div>
      ) : (
        <main
          className="
        flex flex-row p-4 gap-4 h-full
        flex-nowrap overflow-x-auto
        "
        >
          {taskLists?.map((taskList, k) => (
            <TaskList
              key={k}
              taskID={taskList.id}
              taskListName={taskList.attributes.Name}
              tasks={taskList.attributes.tasks?.data}
            />
          ))}

          <button
            className="
          bg-gray-400 hover:bg-gray-300 active:bg-gray-200 
          transition duration-100 ease-in-out shrink-0 
          text-white shadow-md rounded-md p-4 w-96  gap-2
          box-border
          min-h-[125px] h-[fit-content]
          "
            onClick={() =>
              addTaskList({
                variables: { Name: "Lista" },
              })
            }
          >
            Add Task List
          </button>
        </main>
      )}
    </>
  );
}
