import { DELETE_TASK_LIST } from "@/services/deleteTaskList";
import { useMutation } from "@apollo/client";

type TaskListMenuProps = {
  taskListMenuOpen: boolean;
  setTaskListMenuOpen: (taskListMenuOpen: boolean) => void;
  taskListID: string;
  refetchTaskList?: () => void;
};

const TaskListMenu = ({
  taskListMenuOpen,
  setTaskListMenuOpen,
  taskListID,
  refetchTaskList,
}: TaskListMenuProps) => {
  const menuItems = [
    {
      name: "Delete list",
      action: () => handleDeleteTaskList(),
    },
  ];

  const [deleteTask] = useMutation(DELETE_TASK_LIST);

  const handleDeleteTaskList = async () => {
    if (confirm("Are you sure you want to delete this list?") === false) return;

    try {
      await deleteTask({
        variables: {
          id: taskListID,
        },
      }).then(() => {
        if (refetchTaskList) {
          refetchTaskList();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${
        taskListMenuOpen ? "flex" : "hidden"
      } absolute right-0 top-0 mt-4 mr-4
      flex-col w-40 h-40 bg-white rounded-md shadow-md  box-border
      `}
    >
      <button
        className="hover:bg-gray-200 transition duration-200 ease-in-out
        rounded-md
        cursor-pointer select-none
        w-8 h-8 flex  justify-center items-center absolute top-0 right-0
        "
        onClick={() => setTaskListMenuOpen(false)}
      >
        x
      </button>
      {menuItems.map((item, k) => (
        <p
          key={k}
          className="hover:bg-gray-200 transition duration-200 ease-in-out
          cursor-pointer select-none px-4 w-full
          "
          onClick={() => (setTaskListMenuOpen(false), item.action())}
        >
          {item.name}
        </p>
      ))}
    </div>
  );
};

export default TaskListMenu;
