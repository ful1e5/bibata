'use client';

interface GroupedButtonsProps {
  list: string[];
  value: string;
  onClick: (v: string) => void;
}

export function GroupedButtons(props: GroupedButtonsProps) {
  const l = props.list.length;
  return (
    <div
      className={`w-1/2 overflow-hidden rounded-xl border-white/[.08] border grid grid-cols-2 gap-y-4 divide-x-2 divide-white/[.08] divide-${l}`}>
      {props.list.map((t) => (
        <button
          key={t}
          onClick={() => props.onClick(t)}
          className={`${
            t === props.value
              ? 'bg-white/[.1] text-white/[0.9] font-bold'
              : 'bg-transparent text-white/[0.75] hover:bg-white/[.05] hover:text-white/[.8] font-normal'
          } py-4 font-bold  text-center`}>
          {t}
        </button>
      ))}
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
    <div
      className={`w-1/2 overflow-hidden grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2`}>
      {props.list.map((t) => (
        <button
          key={t}
          onClick={() => {
            props.onClick(t);
          }}
          className={`${
            props.values == t
              ? 'bg-white/[.08] font-bold text-white/[.8]'
              : 'bg-transparent hover:bg-sky-500/[.2] text-white/[.7] font-normal'
          } rounded-xl border-white/[.08] border  text-center`}>
          {t}
        </button>
      ))}
    </div>
  );
}
