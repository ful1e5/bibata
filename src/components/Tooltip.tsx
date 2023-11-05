import React, { useState } from 'react';

type Props = {
  content: string;
  children: React.ReactElement;
};

const Tooltip: React.FC<Props> = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className='relative inline-block'
      style={{ zIndex: 999 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}>
      {showTooltip && (
        <div className='absolute w-96 top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 py-2 px-4 bg-black text-white rounded-xl shadow'>
          {props.content}
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Tooltip;
