import { gql, useMutation } from "@apollo/client";

const CREATE_TASK_LIST = gql`
  mutation CreateTaskList($name: String!, $publishedAt: DateTime!) {
    createTaskList(data: { Name: $name, publishedAt: $publishedAt }) {
      data {
        attributes {
          Name
        }
      }
    }
  }
`;

const AddTaskList = () => {
  const [createTaskList, { data, loading, error }] = useMutation(
    CREATE_TASK_LIST,
    {
      refetchQueries: ["GetTaskLists"],
    }
  );

  return (
    <button
      className="
          bg-gray-400 hover:bg-gray-300 active:bg-gray-200 
          transition duration-100 ease-in-out shrink-0 
          text-white shadow-md rounded-md p-4 w-1/4 gap-2
          box-border
          min-h-[125px] h-[fit-content]
          "
      onClick={() => {
        createTaskList({
          variables: {
            name: "New Task List",
            publishedAt: new Date().toISOString(),
          },
        });
      }}
    >
      Add Task List
    </button>
  );
};

export default AddTaskList;
