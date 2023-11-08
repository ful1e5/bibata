type Props = {
  message: string;
};

export const CursorsError: React.FC<Props> = (props) => {
  return (
    <div className='container mx-auto px-4 h-72 flex items-center justify-center'>
      <p className='text-2xl font-bold'>{props.message}</p>
    </div>
  );
};
