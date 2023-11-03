import { LIB_VERSION } from '@root/version';

type Props = {
  disabled?: boolean;
  onClick: (p: 'x11' | 'win') => void;
};

export const DownloadSubButtons: React.FC<Props> = (props) => {
  return (
    <div className='inline-flex flex-col justify-center items-center p-2 bg-black/[.2]'>
      <div className='p-4 grid grid-flow-col gap-4 diviide-y-2 divide-white/[.1] text-left'>
        <button
          disabled={props.disabled}
          className='inline-flex flex-col justify-center items-center bg-white/[.1] rounded-xl p-4 text-center'
          onClick={() => props.onClick('x11')}>
          XCursors (.tar.gz)
        </button>
        <button
          disabled={props.disabled}
          className='inline-flex flex-col justify-center items-center bg-white/[.1] rounded-xl p-4 text-center'
          onClick={() => props.onClick('win')}>
          Windows Cursors (.zip)
        </button>
      </div>
      <p className='opacity-20 font-bold'>v{LIB_VERSION}</p>
    </div>
  );
};
