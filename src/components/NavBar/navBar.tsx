import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import React, { useState } from 'react'
import Wallet from '../Wallet/wallet'
import styles from './navBarStyles.module.css'

function NavBar() {
  const { account } = useWeb3React()

  return (
    <div className={styles.navBarWrapper}>
          <Link href="/">
        <button className={styles.navButtons}>Home</button>
        </Link>
        <button className={styles.navButtons}>Explore</button>
        <Link href="/ProfilePage">
        <button className={styles.navButtons}>Profile</button>
        </Link>
        <div className={styles.accountDisplay}>
        <Wallet />
      </div>
    </div>
  )
}

export default NavBar