interface TaskProps {
  task: {
    id: string;
    attributes: {
      Name: string;
    };
  };
}

const Task = ({ task }: TaskProps) => {
  return (
    <div
      className="bg-white flex flex-col 
        shadow-md rounded-md p-4 w-full box-border
        hover:bg-gray-200 transition duration-200 ease-in-out
        cursor-pointer select-none
       "
    >
      <p>{task.attributes.Name}</p>
    </div>
  );
};

export default Task;
