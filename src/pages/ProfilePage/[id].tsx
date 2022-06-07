import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { UseAppContext } from '../../context/useContext'
import { UseMoralisHooks } from '../../lib/Hooks/useMoralisHooks'

function ProfilePageDetails() {
  const [price, setPrice] = useState<number>()

  const { sellOrder } = UseMoralisHooks()

  const { nftData, display, setDisplay } = UseAppContext()

  const router = useRouter()
  const query = router.query

  const token_id = query?.id?.toString()

  let tokenAddress: string
  let tokenId: string
  let tokenType: string

  const handleChange = (e: any) => {
    e.preventDefault()
    setPrice(e.target.value)
  }
  useEffect(() => {
    setDisplay(false)
  }, [])

  const handleClick = async () => {
    await sellOrder(tokenAddress, tokenId, tokenType, price)
  }

  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {nftData?.map(
          (data: any) =>
            token_id === data?.token_id && (
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
                    <div className={styles.collection}>
                      {data?.collection?.name}
                      <span className={styles.checkmark}></span>
                    </div>
                    <div className={styles.name}>{data?.name}</div>
                    <div className={styles.ownerWrapper}>
                      <div>Owned by &nbsp;</div>
                      <div className={styles.ownerAddress}>
                        {data?.owner?.address?.substring(0, 4)}...
                        {data?.owner?.address?.substring(
                          data?.owner?.address?.length - 4
                        )}
                        &nbsp;
                        <span className={styles.checkmark}></span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button className={styles.button} onClick={handleClick}>
                      Sell
                    </button>
                    <input
                      className={styles.priceInput}
                      onChange={handleChange}
                      placeholder='Price'
                    />
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
                      <div>
                        Token ID:&nbsp;
                        {(tokenId = data?.token_id)}
                      </div>
                      <div style={{ display: 'none' }}>
                        {(tokenAddress = data?.asset_contract?.address)}
                      </div>
                      <div>
                        Contract Address:&nbsp;
                        {data?.asset_contract?.address.substring(0, 4)}
                        ...
                        {data?.asset_contract?.address?.substring(
                          data?.asset_contract?.address?.length - 4
                        )}
                      </div>
                      <div>
                        Token Type:{' '}
                        {(tokenType = data?.asset_contract?.schema_name)}
                      </div>

                      <a
                        href={data?.permalink}
                        target='_blank'
                        className={styles.linkTag}
                      >
                        OpenSea Link
                      </a>
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

export default ProfilePageDetails
