interface GroupedButtonsProps {
  list: string[];
  value: string;
  onClick: (v: string) => void;
}

export default function GroupedButtons(props: GroupedButtonsProps) {
  return (
    <div
      className={`w-1/3 overflow-hidden rounded-xl border-white border grid grid-cols-2 gap-y-5 divide-x-2 divide-white divide-${props.list.length}`}>
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
