import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import Link from 'next/link'

function ContractAssetPage() {
  const router = useRouter()
  const query = router.query

  const token_ID = query?.id?.toString()

  const { nftCollectionData, display, setDisplay } = UseAppContext()

  useEffect(() => {
    setDisplay(false)
  }, [])
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

                  <div>
                    <div className={styles.descriptionHeader}>Description</div>
                    <div className={styles.description}>
                      {data?.description}
                    </div>
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <div className={styles.infoTopWrapper}>
                    <Link href={`/HomePage/${data?.collection?.slug}`}>
                      <div className={styles.collection}>
                        {data?.collection?.name}
                        <span className={styles.checkmark}></span>
                      </div>
                    </Link>
                    <div className={styles.name}>{data?.name}</div>
                    <div className={styles.ownerWrapper}>
                      <div>Owned by &nbsp;</div>

                      <a
                        href={`https://etherscan.io/address/${data?.owner?.address}`}
                        target='_blank'
                        className={styles.ownerAddress}
                      >
                        {data?.owner?.address?.substring(0, 4)}...
                        {data?.owner?.address?.substring(
                          data?.owner?.address?.length - 4
                        )}
                        &nbsp;
                        <span className={styles.checkmark}></span>
                      </a>
                    </div>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <a
                      href={data?.permalink}
                      target='_blank'
                      className={styles.collection}
                    >
                      View on OpenSea
                    </a>
                  </div>
                  <div>
                    <div
                      className={
                        display ? styles.detailsHeader : styles.detailsHeader1
                      }
                      onClick={() => setDisplay(!display)}
                    >
                      Details
                      <div className={display ? 'none' : styles.arrow}>^</div>
                    </div>
                    <div
                      className={
                        display ? styles.detailsInfo : styles.detailsInfoHidden
                      }
                    >
                      <div>Token ID: {data?.token_id}</div>
                      <div>
                        Contract Address:&nbsp;
                        {data?.asset_contract?.address.substring(0, 4)}
                        ...
                        {data?.asset_contract?.address?.substring(
                          data?.asset_contract?.address?.length - 4
                        )}
                      </div>
                      <div>Token Type: {data?.asset_contract?.schema_name}</div>
                    </div>
                  </div>
                </div>
              </>
            )
        )}
      </div>
    </>
  )
}

export default ContractAssetPage
