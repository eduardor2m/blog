import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.scss'
import logo from '../../../public/image/logo.svg';

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/" passHref>
          <div className={styles.logo}>
            <div className={styles.img}>
                <Image src={logo} alt="Logo" layout="fill"/>
            </div>
            <div>
              <p>Blog Do Programador</p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}