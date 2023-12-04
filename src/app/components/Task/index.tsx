import { TaskProps } from "@/app/types/tasksTypes";

const Task = ({ task }: TaskProps) => {
  const { Name } = task.attributes;
  return (
    <div
      id={task.id}
      className="
        flex items-center justify-between
      bg-white 
        shadow-md rounded-md px-4 py-2 w-full box-border
        hover:bg-gray-200 transition duration-200 ease-in-out 
        cursor-pointer select-none group
       "
    >
      <p>{Name}</p>
      <button
        className="ml-2
        hover:bg-gray-300 transition duration-200 ease-in-out
        rounded-md
        cursor-pointer select-none
        w-8 h-8 flex  justify-center
        group-hover:opacity-100 opacity-0
        "
      >
        ...
      </button>
    </div>
  );
};

export default Task;
