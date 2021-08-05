import Head from 'next/head'
import Image from 'next/image'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>hello blog</h1>
    </div>
  )
}
