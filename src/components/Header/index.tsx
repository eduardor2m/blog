import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.scss'
import logo from '../../../public/image/logo.svg';
import { useMenu } from '../../hooks/useMenu';
import { FiMenu, FiX } from 'react-icons/fi';

export function Header() {

  const {handleCloseMenu, handleOpenMenu, menu} = useMenu();

  return (
    <>
    {menu ? 
      <div className={styles.menu}>
        <button className={styles.buttonClose} onClick={() => handleCloseMenu()}>
          <FiX/>
        </button>
        <div className={styles.links}>
          <div>
            <button className={styles.buttonLink} onClick={() => handleCloseMenu()}>
              <Link href="/author" passHref>
                <a>Posts</a>
              </Link>
            </button>
          </div>
          <div>
            <button className={styles.buttonLink} onClick={() => handleCloseMenu()}>
            <Link href="/" passHref>
              <a>Mais relevantes</a>
            </Link>
            </button>
          </div>
          <div>
            <button className={styles.buttonLink} onClick={() => handleCloseMenu()}>
            <Link href="/" passHref>
              <a>Ultimos publicados</a>
            </Link>
            </button>
          </div>
        </div>
      </div> 
    : null}
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
         <div className={styles.links}>
          <button className={styles.buttonOpen} onClick={() => handleOpenMenu()}>
            <FiMenu/>
          </button>
        </div>


      </div>

    </header>

  </>
  )
}