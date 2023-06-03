import styles from "@/styles/loading.module.sass";
export default function Loading() {
  return (
    <div className={styles.main}>
      <div className={styles.loader}></div>
      <h1 className={styles.loadText}>Cargando</h1>
    </div>
  )
}