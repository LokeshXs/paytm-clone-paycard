
import styles from "./loader.module.css";

export default function PageLoader(){

    return (
        <div className={styles["loader"]}>
<div className={styles["loader-square"]}></div>
<div className={styles["loader-square"]}></div>
<div className={styles["loader-square"]}></div>
<div className={styles["loader-square"]}></div>
<div className={styles["loader-square"]}></div>
<div className={styles["loader-square"]}></div>
<div className={styles["loader-square"]}></div>
</div>
    )
}