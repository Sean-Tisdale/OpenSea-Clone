import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import React, { useState } from 'react'
import Wallet from '../Wallet/wallet'
import styles from './navBarStyles.module.css'

function NavBar() {
  const { account } = useWeb3React()

  return (
    <div className={styles.navBarWrapper}>
      <Link href='/'>
        <div className={styles.navButtons}>Home</div>
      </Link>
      <Link href='/ForSalePage'>
        <div className={styles.navButtons}>On Sale</div>
      </Link>
      <Link href='/ProfilePage'>
        <div className={styles.navButtons}>Profile</div>
      </Link>
      <div className={styles.accountDisplay}>
        <Wallet />
      </div>
    </div>
  )
}

export default NavBar
