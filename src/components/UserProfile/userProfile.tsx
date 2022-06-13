import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import React from 'react'
import { UseAppContext } from '../../context/useContext'
import UseGetUserData from '../../lib/Hooks/useGetUserData'
import NavBar from '../NavBar/navBar'
import styles from './userProfileStyles.module.css'

function UserProfile() {
  const { account } = useWeb3React()

  UseGetUserData()

  const { nftData } = UseAppContext()

  return (
    <>
      <NavBar />
      <div className={styles.profileWrapper}>
        {account &&
          nftData?.map((data: any) => (
            <div
              key={data?.asset_contract?.address + data?.token_id}
              className={styles.cardWrapper}
            >
              <Link
                href={`/ProfilePage/${
                  data?.asset_contract?.address + data?.token_id
                }`}
              >
                <img className={styles.image} src={data?.image_url} />
              </Link>
              <div className={styles.name}>{data?.name}</div>
              <div className={styles.description}>{data?.description}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default UserProfile
