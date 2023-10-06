import { ChangeEvent } from 'react';

interface NavbarProps {
  list: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function DropdownSelection(props: NavbarProps) {
  return (
    <div className='inline-block relative w-40 m-2'>
      <select
        className='block appearance-none w-full bg-black border-2 border-gray-400 hover:border-blue-500 px-4 py-2 pr-8 rounded-xl focus:outline-none focus:shadow-outline'
        value={props.value}
        onChange={(e) => props.onChange(e)}>
        {props.list.map((t) => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>

      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        <svg
          className='fill-current h-4 w-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </div>
    </div>
  );
}
