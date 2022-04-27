import styles from './LoadingInfo.module.css';

const LoadingInfo = () => {
  return (
    <div className={styles.loading}>
      <p className={styles.loadingMessage}>
        Retrieving sensors and building visualization
      </p>
    </div>
  );
};

export default LoadingInfo;
