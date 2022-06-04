import { useRouter } from 'next/router'
import { useRef } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import GetCollections from '../../lib/Hooks/getCollections'
import styles from '../../styles/PageStyles/pageStyles.module.css'

function ContractAssetPage() {
  const router = useRouter()
  const query = router.query

  const token_ID = query?.id?.toString()

  const { nftCollectionData } = UseAppContext()

  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {nftCollectionData?.map(
          (data: any) =>
            token_ID === data?.token_id && (
              <>
                <div key={data?.token_id} className={styles.cardWrapper}>
                  <img className={styles.image} src={data?.image_url} />
                  <div className={styles.name}>{data?.name}</div>
                  <div className={styles.description}>{data?.description}</div>
                </div>
                <div style={{ marginLeft: '190px' }}></div>
                <div className={styles.infoWrapper}>
                  <div>On Sale? {data?.is_presale ? 'Yes' : 'No'}</div>
                  <div>Token ID: {data?.token_id}</div>
                  <div>Contract Address: {data?.asset_contract?.address}</div>
                  <div>Token Type: {data?.asset_contract?.schema_name}</div>
                  <div>Owner: {data?.owner?.address}</div>
                  <div>Collection: {data?.collection?.name}</div>
                  <a
                    href={data?.permalink}
                    target='_blank'
                    className={styles.linkTag}
                  >
                    OpenSea Link
                  </a>
                </div>
              </>
            )
        )}
      </div>
    </>
  )
}

export default ContractAssetPage
