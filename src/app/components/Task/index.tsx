interface TaskProps {
  task: {
    id: string;
    attributes: {
      Name: string;
    };
  };
}

const Task = ({ task }: TaskProps) => {
  const { Name } = task.attributes;
  return (
    <div
      className="bg-white flex flex-col 
        shadow-md rounded-md px-4 py-2 w-full box-border
        hover:bg-gray-200 transition duration-200 ease-in-out
        cursor-pointer select-none"
    >
      <p>{Name}</p>
    </div>
  );
};

export default Task;
