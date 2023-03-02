import EmptyImageFrame from '@/assets/EmptyImageFrame';
import styles from '@/styles/CustomizeDashboard.module.css';

function CustomizeDashboard() {
  return (
    <div className={styles.body}>
      <div className={styles.Container}>
        <div className={styles.Banner}>
          <div>
            <h1 className={styles.Heading}>Customize your dashboard!</h1>
            <h3 className={styles.Subheading}>
              what are you interested in seeing on your home page?
            </h3>
          </div>
          <button className={styles.Skip}>skip &gt;</button>
        </div>
        <div>
          <ul className={styles.WidgetContainer}>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
            <li className={styles.Widget}>
              <EmptyImageFrame />
              <p className={styles.WidgetName}>Widget/Section</p>
            </li>
          </ul>
        </div>
      </div>
      <button className={styles.Done}>Done</button>
    </div>
  );
}

export default CustomizeDashboard;
