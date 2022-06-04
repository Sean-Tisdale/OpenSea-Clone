import { useRouter } from 'next/router'
import { useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { useWeb3React } from '@web3-react/core'
import { UseAppContext } from '../../context/useContext'
import { UseMoralisHooks } from '../../lib/Hooks/useMoralisHooks'

function ProfilePageDetails() {
  const [price, setPrice] = useState<number>()

  const { sellOrder } = UseMoralisHooks()

  const { nftData } = UseAppContext()

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
                  <div className={styles.name}>{data?.name}</div>
                  <div className={styles.description}>{data?.description}</div>
                </div>
                <div className={styles.sellWrapper}>
                  <button className={styles.sellButton} onClick={handleClick}>
                    Sell
                  </button>
                  <input
                    className={styles.priceInput}
                    onChange={handleChange}
                    placeholder='Price'
                  />
                </div>
                <div className={styles.infoWrapper}>
                  <div>On Sale? {data?.is_presale ? 'Yes' : 'No'}</div>
                  <div>Token ID: {(tokenId = data?.token_id)}</div>
                  <div>
                    Contract Address:{' '}
                    {(tokenAddress = data?.asset_contract?.address)}
                  </div>
                  <div>
                    Token Type:{' '}
                    {(tokenType = data?.asset_contract?.schema_name)}
                  </div>
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

export default ProfilePageDetails
