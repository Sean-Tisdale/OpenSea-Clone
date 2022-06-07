import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { ethers } from 'ethers'
import { UseMoralisHooks } from '../../lib/Hooks/useMoralisHooks'

function ForSalePageDetails() {
  const router = useRouter()
  const query = router.query

  const slug = query?.id?.toString()

  const { nftSellOrders, display, setDisplay } = UseAppContext()
  const { getOrders } = UseMoralisHooks()

  let tokenToBuyAddress: string
  let tokenID: string

  const handleClick = async () => {
    await getOrders(tokenToBuyAddress, tokenID)
  }

  useEffect(() => {
    setDisplay(false)
  }, [])

  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {nftSellOrders?.map(
          (data: any) =>
            slug ===
              data?.asset?.asset_contract?.address + data?.asset?.token_id && (
              <>
                <div key={slug} className={styles.cardWrapper}>
                  <img className={styles.image} src={data?.asset?.image_url} />

                  <div>
                    <div className={styles.descriptionHeader}>Description</div>
                    <div className={styles.description}>
                      {data?.asset?.description}
                    </div>
                  </div>
                </div>
                <div className={styles.infoWrapper}>
                  <div className={styles.infoTopWrapper}>
                    <div className={styles.collection}>
                      {data?.asset?.collection?.name}
                      <span className={styles.checkmark}></span>
                    </div>
                    <div className={styles.name}>{data?.asset?.name}</div>
                    <div className={styles.ownerWrapper}>
                      <div>Owned by &nbsp;</div>
                      <div className={styles.ownerAddress}>
                        {data?.asset?.owner?.address?.substring(0, 4)}...
                        {data?.asset?.owner?.address?.substring(
                          data?.asset?.owner?.address?.length - 4
                        )}
                        &nbsp;
                        <span className={styles.checkmark}></span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <div>
                      Price: {ethers.utils.formatEther(data?.base_price)} ETH
                    </div>
                    <button className={styles.button} onClick={handleClick}>
                      Buy Now
                    </button>
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
                        {(tokenID = data?.asset?.token_id)}
                      </div>
                      <div style={{ display: 'none' }}>
                        {
                          (tokenToBuyAddress =
                            data?.asset?.asset_contract?.address)
                        }
                      </div>
                      <div>
                        Contract Address:&nbsp;
                        {data?.asset?.asset_contract?.address.substring(0, 4)}
                        ...
                        {data?.asset?.asset_contract?.address?.substring(
                          data?.asset?.asset_contract?.address?.length - 4
                        )}
                      </div>
                      <div>
                        Token Type: {data?.asset?.asset_contract?.schema_name}
                      </div>

                      <a
                        href={data?.asset?.permalink}
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

export default ForSalePageDetails
