import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import NavBar from '../../components/NavBar/navBar'
import GetCollections from '../../lib/Hooks/getCollections'
import styles from '../../components/UserProfile/userProfileStyles.module.css'
import { UseAppContext } from '../../context/useContext'

function CollectionDetails() {
  const router = useRouter()
  const query = router.query

  const slug = query?.slug?.toString()

  const { nftCollectionData } = UseAppContext()

  console.log(nftCollectionData)
  return (
    <>
      <NavBar />
      <div className={styles.profileWrapper}>
        {nftCollectionData?.map(
          (data: any) =>
            slug === data?.slug && (
              <div key={data?.tokenId} className={styles.cardWrapper}>
                <Link href={`/AssetPage/${data?.tokenId}`}>
                  <img className={styles.image} src={data?.image} />
                </Link>
                <div className={styles.name}>{data?.name}</div>
                <div className={styles.description}>{data?.description}</div>
              </div>
            )
        )}
      </div>
    </>
  )
}

export default CollectionDetails
