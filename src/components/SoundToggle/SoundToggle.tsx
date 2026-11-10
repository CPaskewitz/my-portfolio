import React, { useEffect, useState } from 'react';
import Icon from '../Icon/Icon';
import { isSoundOn, setSoundOn, subscribeSound } from '../../lib/sound';

/** Opt-in UI sound (off by default). Shares state across every instance. */
const SoundToggle: React.FC<{ className?: string; withLabel?: boolean }> = ({ className = '', withLabel = false }) => {
  const [on, setOn] = useState(isSoundOn);
  useEffect(() => subscribeSound(setOn), []);

  return (
    <button type="button" className={className} aria-pressed={on} onClick={() => setSoundOn(!on)}>
      <Icon name={on ? 'soundOn' : 'soundOff'} size={18} />
      {withLabel ? <span>Sound {on ? 'on' : 'off'}</span> : <span className="visually-hidden">Interface sound</span>}
    </button>
  );
};

export default SoundToggle;
