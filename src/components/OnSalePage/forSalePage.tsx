import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import Link from 'next/link'
import { WyvernSchemaName } from 'opensea-js/lib/types'

function ForSalePage(props: any) {
  const [offerAmount, setOfferAmount] = useState<number>()

  const { nftSellOrders, display, setDisplay, setNftCollections } =
    UseAppContext()

  const data = UseFufillOrdersHook()
  const order = data?.getOrders
  const offer = data?.createOffer
  let tokenType: WyvernSchemaName
  let tokenToBuyAddress: string
  let tokenID: string

  const handleClick = async (e: any) => {
    if (e?.target?.innerText === 'Make Offer') {
      await offer?.(
        tokenID,
        tokenToBuyAddress,
        tokenType,
        offerAmount as number
      )
    } else if (e?.target?.innerText === 'Buy Now') {
      await order?.(tokenToBuyAddress, tokenID)
    }
  }
  const handleChange = (e: any) => {
    e.preventDefault()
    setOfferAmount(e?.target?.value)
  }

  useEffect(() => {
    setDisplay(false)
    setNftCollections(nftSellOrders)
  }, [])

  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {nftSellOrders &&
          nftSellOrders?.map(
            (data: any) =>
              props?.props?.token ===
                data?.asset?.asset_contract?.address +
                  data?.asset?.token_id +
                  data?.id && (
                <>
                  <div key={props?.props?.token} className={styles.cardWrapper}>
                    <img
                      className={styles.image}
                      src={data?.asset?.image_url}
                      alt='no image'
                    />

                    <div>
                      <div className={styles.descriptionHeader}>
                        Description
                      </div>
                      <div className={styles.description}>
                        {data?.asset?.description}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoWrapper}>
                    <div className={styles.infoTopWrapper}>
                      <Link
                        href={`/CollectionPage/${data?.asset?.collection?.slug}`}
                      >
                        <div className={styles.collection}>
                          {data?.asset?.collection?.name}
                          <span className={styles.checkmark}></span>
                        </div>
                      </Link>
                      <div className={styles.name}>{data?.asset?.name}</div>
                      <div className={styles.ownerWrapper}>
                        <div>Owned by &nbsp;</div>
                        <a
                          href={`https://etherscan.io/address/${data?.asset?.owner?.address}`}
                          target='_blank'
                          rel='noreferrer'
                          className={styles.ownerAddress}
                        >
                          {data?.asset?.owner?.address?.substring(0, 4)}...
                          {data?.asset?.owner?.address?.substring(
                            data?.asset?.owner?.address?.length - 4
                          )}
                          &nbsp;
                          <span className={styles.checkmark}></span>
                        </a>
                      </div>
                    </div>
                    <div className={styles.buttonWrapper}>
                      <div>
                        {/* Price: {ethers?.utils.formatEther(data?.base_price)} ETH */}
                      </div>
                      <button className={styles.button} onClick={handleClick}>
                        Buy Now
                      </button>
                      <button className={styles.button} onClick={handleClick}>
                        Make Offer
                      </button>
                      <input
                        className={styles.priceInput}
                        onChange={handleChange}
                        placeholder='Amount'
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
                          display
                            ? styles.detailsInfo
                            : styles.detailsInfoHidden
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
                          rel='noreferrer'
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
export default ForSalePage
