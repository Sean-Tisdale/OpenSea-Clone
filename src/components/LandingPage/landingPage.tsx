import Link from 'next/link'
import React, { useRef } from 'react'
import { UseAppContext } from '../../context/useContext'
import GetCollections from '../../lib/Hooks/getCollections'
import styles from './landingPageStyles.module.css'

const LandingPage = () => {
  GetCollections()

  const { nftCollectionData } = UseAppContext()

  return (
    <>
      <div className={styles.profileWrapper}>
        {nftCollectionData &&
          nftCollectionData?.map(
            (data: any) =>
              data?.image_url && (
                <Link href={`/HomePage/${data?.slug}`}>
                  <div key={data?.slug} className={styles.cardWrapper}>
                    <img className={styles.image} src={data?.image_url} />
                    <div className={styles.text}>{data?.name}</div>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  )
}

export default LandingPage
