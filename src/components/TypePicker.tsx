'use client';

interface Props {
  list: string[];
  value: string;
  onClick: (v: string) => void;
}

export function TypePicker(props: Props) {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full sm:w-1/2 bg-black/[0.2] overflow-hidden rounded-3xl border-white/[.08] border'>
        <div className={`p-1 grid grid-cols-2 gap-y-4 gap-1`}>
          {props.list.map((t) => (
            <button
              key={t}
              title={`Bibata ${t}`}
              onClick={() => props.onClick(t)}
              className={`${
                t === props.value
                  ? 'bg-white/[.1] text-white/[.9] font-bold'
                  : 'bg-transparent text-white/[.65] hover:text-white font-normal hover:font-bold'
              } py-4 font-bold text-center rounded-2xl`}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
