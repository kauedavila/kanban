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

  const [deleteTaskList] = useMutation(DELETE_TASK_LIST);

  const handleDeleteTaskList = async () => {
    if (confirm("Are you sure you want to delete this list?") === false) return;

    try {
      await deleteTaskList({
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
      } absolute left-[88%] top-14
      flex-col w-full bg-white rounded-md shadow-md  box-border
      py-4 
      `}
    >
      <button
        className="hover:bg-gray-200 transition duration-200 ease-in-out
        rounded-md
        cursor-pointer select-none
        w-8 h-8 flex justify-center items-center absolute top-4 right-4
        "
        onClick={() => setTaskListMenuOpen(false)}
      >
        x
      </button>
      <p
        className="text-lg font-bold mb-4
        place-self-center
        "
      >
        List Actions
      </p>
      {menuItems.map((item, k) => (
        <p
          key={k}
          className="hover:bg-gray-200 transition duration-200 ease-in-out
          cursor-pointer select-none w-full h-8 px-4 flex items-center
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
