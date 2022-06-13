import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { UseAppContext } from '../../context/useContext'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'

function ProfilePageDetails() {
  const [price, setPrice] = useState<number>()
  const { account } = useWeb3React()
  const { sellOrder } = UseFufillOrdersHook()
  const { nftData, display, setDisplay, setNftCollections } = UseAppContext()

  const router = useRouter()
  const query = router.query

  const slug = query?.id?.toString()

  let tokenAddress: string
  let tokenId: string

  const handleChange = (e: any) => {
    e.preventDefault()
    setPrice(e.target.value)
  }
  useEffect(() => {
    setDisplay(false)

    setNftCollections(nftData)
  }, [])

  const handleClick = () => {
    sellOrder(tokenId, tokenAddress, price as number)
  }
  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {nftData?.map(
          (data: any) =>
            slug === data?.asset_contract?.address + data?.token_id && (
              <>
                <div
                  key={data?.asset_contract?.address + data?.token_id}
                  className={styles.cardWrapper}
                >
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
                    <button
                      className={
                        data?.is_presale ? styles.onSaleButton : styles.button
                      }
                      onClick={handleClick}
                    >
                      {data?.is_presale ? 'Item is For Sale' : 'Sell'}
                    </button>
                    <input
                      className={
                        data?.is_presale
                          ? styles.noPriceInput
                          : styles.priceInput
                      }
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
                      <div>Token Type: {data?.asset_contract?.schema_name}</div>

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
