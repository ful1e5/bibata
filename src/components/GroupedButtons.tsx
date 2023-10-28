'use client';

interface GroupedButtonsProps {
  list: string[];
  value: string;
  onClick: (v: string) => void;
}

export function GroupedButtons(props: GroupedButtonsProps) {
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

interface SmallGroupedButtonsProps {
  list: number[];
  values: number;
  onClick: (v: number) => void;
}

export function SmallGroupedButtons(props: SmallGroupedButtonsProps) {
  return (
    <div className='flex items-center justify-center'>
      <div className='w-full sm:w-1/2 grid grid-cols-7 sm:grid-cols-8 gap-2 '>
        {props.list.map((t) => (
          <button
            key={t}
            onClick={() => {
              props.onClick(t);
            }}
            disabled={props.values === t}
            className={`${
              props.values === t
                ? 'bg-white/[.08] font-bold text-white/[.8]'
                : 'bg-transparent hover:bg-sky-500/[.2] text-white/[.7] font-normal'
            } rounded-xl border-white/[.08] border text-center`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
