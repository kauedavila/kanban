import { TaskListMenuProps } from "@/app/types/taskLystTypes";
import { DELETE_TASK_LIST } from "@/services/deleteTaskList";
import { useMutation } from "@apollo/client";

const TaskListMenu = ({
  taskListMenuOpen,
  setTaskListMenuOpen,
  taskListID,
  taskListName,
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
      className={`${taskListMenuOpen ? "flex" : "hidden"} 
      absolute left-0 top-0
       z-[100] items-center py-4
      flex-col w-screen h-screen bg-slate-500 bg-opacity-50 backdrop-blur-sm
      `}
    >
      <div
        className="
        z-[200] bg-white
        w-fit min-w-[50%]
        rounded-md shadow-md box-border py-4 
        "
      >
        <div
          className="
          place-self-center
          w-full h-12 px-4 flex items-baseline justify-between
          "
        >
          <p className="text-lg font-bold mb-4 m-auto">
            {taskListName} - Actions
          </p>
          <button
            className="hover:bg-gray-200 transition duration-200 ease-in-out
            rounded-md
            cursor-pointer select-none
            w-8 h-8 flex justify-center items-center 
            "
            onClick={() => setTaskListMenuOpen(false)}
          >
            x
          </button>
        </div>
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
    </div>
  );
};

export default TaskListMenu;
