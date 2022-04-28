import styles from './MapStats.module.css';

const MapStats = (props) => {
  return (
    <div className={styles.allStats}>
      <div className={styles.statGroup}>
        <h3>Nodes</h3>
        <p className={styles.smaller}>3 Detection</p>
        <p className={styles.smaller}>2 Sink</p>
        <p className={styles.smaller}>1 Base</p>
      </div>
      <div className={styles.statGroup}>
        <h3>Threshold</h3>
        <p className={styles.smaller}>40°C</p>
        <p className={styles.smaller}>10%</p>
        <p className={styles.smaller}>5ppm</p>
      </div>
      <div className={styles.statGroup}>
        <h3>Tolerance</h3>
        <p className={styles.smaller}>± 20°C</p>
        <p className={styles.smaller}>± 2%</p>
        <p className={styles.smaller}>± 1ppm</p>
      </div>
    </div>
  );
};

export default MapStats;
