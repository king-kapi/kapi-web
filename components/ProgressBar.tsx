import { useState } from 'react';
import styles from '../styles/ProgressBar.module.css';
import Icon, {Icons} from './Icon';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: Number
}

export default function ProgressBar({progress, ...props}:ProgressBarProps) {
  return (
    <div {...props} className={styles.ProgressBarContainer}>
      <Icon icon={Icons['FLAG']} className={styles.Flag}></Icon>
      <div className={[styles.EmptyBar, 'bg-pressedGrey'].join(' ')}>
        <div style={{width: `${progress}%`}} className={[styles.ProgressBar, 'bg-PressedGrey'].join(' ')}></div>
      </div>
      <div className={styles.Levels}>
        <span className={styles.Start}>Lv. 1</span>
        <span className={styles.End}>Lv. 2</span>
      </div>
    </div>
  );
}
