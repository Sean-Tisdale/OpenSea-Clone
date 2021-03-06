import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from '../../components/UserProfile/userProfileStyles.module.css'
import { UseAppContext } from '../../context/useContext'
import UseGetCollectionHook from '../../lib/Hooks/useGetCollectionDataHook'

function CollectionPage(props: any) {
  //   const router = useRouter()
  //   const query = router.query

  //   const slug = query?.id?.toString()

  const { nftCollections, nftCollectionData } = UseAppContext()
  const { retrieveCollection } = UseGetCollectionHook()

  useEffect(() => {
    nftCollections?.map((data: any) => {
      if (
        props?.props?.token === data?.slug ||
        props?.props?.token === data?.collection?.slug ||
        props?.props?.token === data?.asset?.collection?.slug
      ) {
        retrieveCollection(data)
      }
    })
  }, [])

  return (
    <>
      <NavBar />
      <div className={styles.profileWrapper}>
        {nftCollectionData?.map((data: any) => (
          <div key={data?.token_id} className={styles.cardWrapper}>
            <Link href={`/AssetPage/${data?.token_id}`}>
              <img className={styles.image} src={data?.image_original_url} />
            </Link>
            <div>ID: {data?.token_id}</div>
            <div className={styles.name}>{data?.name}</div>
            <div className={styles.description}>{data?.description}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CollectionPage
