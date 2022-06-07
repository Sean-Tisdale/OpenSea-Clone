import Link from 'next/link'
import React, { useRef } from 'react'
import { UseAppContext } from '../../context/useContext'
import GetCollections from '../../lib/Hooks/getCollections'
import styles from './landingPageStyles.module.css'

const LandingPage = () => {
  GetCollections()

  const { nftCollections } = UseAppContext()

  return (
    <>
      <div className={styles.profileWrapper}>
        {nftCollections &&
          nftCollections?.map(
            (data: any) =>
              data?.image_url &&
              data?.primary_asset_contracts?.length === 1 && (
                <Link href={`/HomePage/${data?.slug}`}>
                  <div key={data?.slug} className={styles.cardWrapper}>
                    <img className={styles.image} src={data?.image_url} />
                    <div className={styles.collectionName}>{data?.name}</div>
                    <div className={styles.viewCollection}>
                      Eplore the {data?.name} collection
                    </div>
                  </div>
                </Link>
              )
          )}
      </div>
    </>
  )
}

export default LandingPage
