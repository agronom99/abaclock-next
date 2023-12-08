// pages/index.js
import Head from 'next/head';
import AbaClock from '../components/AbaClock';
import styles from '../style.css'; // Стилі замініть на шлях до свого файлу style.css

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Abaclock</title>
      </Head>

      <main className={styles.main}>
        <AbaClock />
      </main>

    </div>
  );
}
