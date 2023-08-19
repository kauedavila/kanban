import Button from "./button";
import InputComponent from "./inputComponent";

type AddTaskProps = {
  addingTask: boolean;
  setAddingTask: (value: boolean) => void;
};

const AddTask = ({ addingTask, setAddingTask }: AddTaskProps) => {
  const handleAddTask = () => {
    const input = document.getElementById("task input") as HTMLInputElement;
    if (input) {
      const task = input.value;
      if (task) {
        setAddingTask(false);
        input.value = "";
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
            placeholder="Insira um título para este cartão..."
          />
          <div className="flex items-center justify-center w-full gap-4">
            <Button onClick={() => handleAddTask()}>Adicionar cartão</Button>
            <Button onClick={() => setAddingTask(false)}>Cancelar</Button>
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
