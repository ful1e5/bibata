type Props = {
  disabled?: boolean;
  onClick: (p: 'x11' | 'win') => void;
};

export const DownloadSubButtons: React.FC<Props> = (props) => {
  return (
    <div className='p-4 grid grid-flow-row gap-4 diviide-y-2 divide-white/[.1] text-left'>
      <button
        disabled={props.disabled}
        className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
        onClick={() => props.onClick('x11')}>
        XCursors (.tar.gz)
      </button>
      <button
        disabled={props.disabled}
        className='bg-white/[.1] rounded-xl p-4 text-left font-bold'
        onClick={() => props.onClick('win')}>
        Windows (.zip)
      </button>
    </div>
  );
};
