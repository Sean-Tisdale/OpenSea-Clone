import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import Link from 'next/link'
import { ethers } from 'ethers'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import { WyvernSchemaName } from 'opensea-js/lib/types'

function ContractAssetPage() {
  const [offerAmount, setOfferAmount] = useState<number>()

  const router = useRouter()
  const query = router?.query

  const token_ID = query?.id?.toString()

  const { nftCollectionData, display, setDisplay } = UseAppContext()

  const data = UseFufillOrdersHook()
  const order = data?.getOrders
  const offer = data?.createOffer
  let tokenType: WyvernSchemaName
  let tokenToBuyAddress: string
  let tokenID: string

  const handleClick = async (e: any) => {
    if (e.target.innerText === 'Make Offer') {
      await offer?.(
        tokenID,
        tokenToBuyAddress,
        tokenType,
        offerAmount as number
      )
    } else if (e.target.innerText === 'Buy Now') {
      await order?.(tokenToBuyAddress, tokenID)
    }
  }
  const handleChange = (e: any) => {
    e.preventDefault()
    setOfferAmount(e.target.value)
  }
  useEffect(() => {
    setDisplay(false)
  }, [])
  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {nftCollectionData &&
          nftCollectionData?.map(
            (data: any) =>
              token_ID === data?.token_id && (
                <>
                  <div key={data?.token_id} className={styles.cardWrapper}>
                    <img className={styles.image} src={data?.image_url} />

                    <div>
                      <div className={styles.descriptionHeader}>
                        Description
                      </div>
                      <div className={styles.description}>
                        {data?.description}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoWrapper}>
                    <div className={styles.infoTopWrapper}>
                      <Link href={`/CollectionPage/${data?.collection?.slug}`}>
                        <div className={styles.collection}>
                          {data?.collection?.name}
                          <span className={styles.checkmark}></span>
                        </div>
                      </Link>
                      <div className={styles.name}>{data?.name}</div>
                      <div className={styles.ownerWrapper}>
                        <div>Owned by &nbsp;</div>

                        <a
                          // href={`https://etherscan.io/address/${data?.owner?.address}`}
                          // target='_blank'
                          // rel='noreferrer'
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
                      {data?.sell_orders === null &&
                      data?.seaport_sell_orders === null ? (
                        <>
                          <button
                            className={styles.button}
                            onClick={handleClick}
                          >
                            Make Offer
                          </button>
                          <input
                            className={styles.priceInput}
                            onChange={handleChange}
                            placeholder='Amount'
                          />
                        </>
                      ) : (
                        <>
                          <div>
                            Price: {ethers.utils.formatEther(data?.base_price)}{' '}
                            ETH
                          </div>
                          <button
                            className={styles.button}
                            onClick={handleClick}
                          >
                            Buy Now
                          </button>
                          <button
                            className={styles.button}
                            onClick={handleClick}
                          >
                            Make Offer
                          </button>
                          <input
                            className={styles.priceInput}
                            onChange={handleChange}
                            placeholder='Amount'
                          />
                        </>
                      )}
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
                          display
                            ? styles.detailsInfo
                            : styles.detailsInfoHidden
                        }
                      >
                        <div>
                          Token ID:
                          {(tokenID = data?.token_id)}
                        </div>
                        <div style={{ display: 'none' }}>
                          {(tokenToBuyAddress = data?.asset_contract?.address)}
                        </div>
                        <div style={{ display: 'none' }}>
                          {(tokenToBuyAddress = data?.asset_contract?.address)}
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
                          Token Type: {data?.asset_contract?.schema_name}
                        </div>
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
