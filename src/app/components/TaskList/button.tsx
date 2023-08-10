interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className=" 
              active:bg-cyan-600 hover:bg-cyan-500 bg-cyan-400 transition duration-100 ease-in-out
               text-white rounded-md p-2 mt-2 cursor-pointer select-none w-full "
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
