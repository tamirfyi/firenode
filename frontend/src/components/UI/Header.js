import styles from './Header.module.css';

const Header = (props) => {
  return (
    <div className={styles.header}>
      <h1>Firenode</h1>

      {!props.hide && (
        <button className={styles.toggle} onClick={props.toggleMap}>
          {props.show ? 'Configure' : 'Show Map'}
        </button>
      )}
    </div>
  );
};

export default Header;
