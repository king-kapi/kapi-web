import styles from '@/src/styles/Searchbar.module.css';
import { Icon } from '@iconify/react';

export default function SearchBar() {
  return (
    <div className={styles.SearchBarContainer}>
      <form className={styles.SearchBar}>
        <Icon icon="ic:baseline-search" color="#464646" className={styles.SearchBar_logo} />
        <input />
      </form>
      <Icon icon="mingcute:settings-2-line" className={styles.SearchBar_filter} />
    </div>
  )
}
