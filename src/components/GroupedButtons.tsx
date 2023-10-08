interface GroupedButtonsProps {
  list: string[];
  value: string;
  onClick: (v: string) => void;
}

export function GroupedButtons(props: GroupedButtonsProps) {
  const l = props.list.length;
  return (
    <div
      className={`w-1/5 overflow-hidden rounded-xl border-white border grid grid-cols-2 gap-y-3 divide-x-2 divide-white divide-${l}`}>
      {props.list.map((t) => (
        <button
          key={t}
          onClick={() => props.onClick(t)}
          className={`${
            t === props.value
              ? 'bg-green-600 text-black'
              : 'bg-transparent hover:bg-green-500/[.2] text-white'
          } py-4 font-bold text-center`}>
          {t}
        </button>
      ))}
    </div>
  );
}

interface SmallGroupedButtonsProps {
  list: number[];
  values: number[];
  onClick: (v: number[]) => void;
}

export function SmallGroupedButtons(props: SmallGroupedButtonsProps) {
  const l = props.list.length;
  return (
    <div className={`w-1/3 overflow-hidden grid grid-cols-8 gap-2`}>
      {props.list.map((t) => (
        <button
          key={t}
          onClick={() => {
            const l = props.values;
            if (l.includes(t)) {
              const index = l.indexOf(t, 0);
              if (index > -1) {
                l.splice(index, 1);
              }
            } else {
              l.push(t);
            }

            props.onClick(l);
          }}
          className={`${
            props.values.includes(t)
              ? 'bg-sky-600 text-black'
              : 'bg-transparent hover:bg-sky-500/[.2] text-white/[.6]'
          } text-center rounded-xl border-white/[.6] border p-2`}>
          {t}
        </button>
      ))}
    </div>
  );
}
