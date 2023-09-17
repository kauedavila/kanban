import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import Button from "./button";
import InputComponent from "./inputComponent";
import UpdateTaskRelation from "@/services/updateTaskRelations";
import { CREATE_TASK } from "@/services/createTask";
import UpdateTaskListRelations from "@/services/updateTaskListRelations";

type AddTaskProps = {
  addingTask: boolean;
  setAddingTask: (value: boolean) => void;
  taskListID: string;
  refetchTaskList?: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
};

const AddTask = ({
  addingTask,
  setAddingTask,
  taskListID,
  refetchTaskList,
}: AddTaskProps) => {
  const [createTask] = useMutation(CREATE_TASK);

  const handleAddTask = async () => {
    const input = document.getElementById("task input") as HTMLInputElement;
    if (input) {
      const task = input.value;

      try {
        const res = await createTask({
          variables: {
            name: task,
            publishedAt: new Date().toISOString(),
          },
        });

        const taskID = res.data.createTask.data.id as string;

        await UpdateTaskRelation({
          taskID,
          taskListID,
        });

        await UpdateTaskListRelations({
          taskID,
          taskListID,
        }).then(() => {
          if (refetchTaskList) {
            refetchTaskList();
          }
        });

        setAddingTask(false);
        input.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {addingTask ? (
        <div>
          <InputComponent
            id="task input"
            className="px-4 py-4 "
            autoFocus
            placeholder="Insert a title for this task..."
          />
          <div className="flex items-center justify-center w-full gap-4">
            <Button onClick={() => handleAddTask()}>Add task</Button>
            <Button onClick={() => setAddingTask(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between w-full
      hover:bg-gray-200 active:bg-gray-300 transition duration-100 ease-in-out
       rounded-md p-2 mt-2 cursor-pointer select-none"
          onClick={() => setAddingTask(true)}
        >
          <p>+ Add task</p>
        </div>
      )}
    </>
  );
};

export default AddTask;
