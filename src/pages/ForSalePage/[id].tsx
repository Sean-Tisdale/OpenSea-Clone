import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { BigNumber, BigNumberish, ethers, providers } from 'ethers'
import { UseMoralisHooks } from '../../lib/Hooks/useMoralisHooks'

function ForSalePageDetails() {
  const router = useRouter()
  const query = router.query

  const slug = query?.id?.toString()

  const { nftSellOrders } = UseAppContext()
  const { getOrders } = UseMoralisHooks()

  let tokenToBuyAddress: string
  let tokenID: string

  const handleClick = async () => {
    await getOrders(tokenToBuyAddress, tokenID)
  }
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
                  <div className={styles.name}>{data?.asset?.name}</div>
                  <div className={styles.description}>
                    {data?.asset?.description}
                  </div>
                </div>
                <div className={styles.sellWrapper}>
                  <button className={styles.buyButton} onClick={handleClick}>
                    Buy Now
                  </button>
                </div>
                <div className={styles.infoWrapper}>
                  <div>
                    Price: {ethers.utils.formatEther(data?.base_price)} ETH
                  </div>
                  <div>Token ID: {(tokenID = data?.asset?.token_id)}</div>
                  <div>
                    Contract Address:
                    {(tokenToBuyAddress = data?.asset?.asset_contract?.address)}
                  </div>
                  <div>
                    Token Type: {data?.asset?.asset_contract?.schema_name}
                  </div>
                  <div>Owner: {data?.asset?.owner?.address}</div>
                  <div>Collection: {data?.asset?.collection?.name}</div>
                  <a
                    href={data?.asset?.permalink}
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

export default ForSalePageDetails
