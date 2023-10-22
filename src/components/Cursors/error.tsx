type CursorsErrorProps = {
  status: number;
  error: string;
};

export const CursorsError: React.FC<CursorsErrorProps> = (props) => {
  return (
    <div className='container mx-auto px-4 h-72 flex items-center justify-center'>
      <div className='text-2xl font-bold'>
        Error ({props.status}): {props.error}
      </div>
    </div>
  );
};
