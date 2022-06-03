import { useRouter } from 'next/router'
import { useRef } from 'react'
import NavBar from '../../components/NavBar/navBar'
import GetCollections from '../../lib/Hooks/getCollections'
import styles from '../../styles/PageStyles/pageStyles.module.css'

function ContractAssetPage() {
  const router = useRouter()
  const query = router.query

  const token_ID = query?.collectionAssets?.toString()

  const nftData = GetCollections()
  const state = useRef(nftData)
  const currentNFT: any[] = []

  //   state?.current?.map((data: any) => {
  //     console.log(data, 'data to find token id')
  //     if (token_ID === data?.tokenId) {
  //       return currentNFT.push(data)
  //     }
  //})
  return (
    <>
      <NavBar />
      <div className={styles.nftPageWrapper}>
        {currentNFT?.map((data: any) => (
          <>
            <div className={styles.cardWrapper}>
              <img className={styles.image} src={data?.image} />
              <div className={styles.name}>{data?.name}</div>
              <div className={styles.description}>{data?.description}</div>
            </div>
            <div className={styles.sellWrapper}>
              {/* <button className={styles.sellButton} onClick={handleClick} >Sell</button> */}
              <input
                className={styles.priceInput}
                //    onChange={handleChange}
                placeholder='Price'
              />
            </div>
            <div className={styles.infoWrapper}>
              <div>On Sale? {data?.onSale ? 'Yes' : 'No'}</div>
              <div>Token ID: {data?.tokenId}</div>
              <div>Contract Address: {data?.contractAddress}</div>
              <div>Token Type: {data?.tokenType}</div>
              <div>Owner: {data?.owner}</div>
              <div>Collection: {data?.collectionName}</div>
              <a
                href={data?.openSeaLink}
                target='_blank'
                className={styles.linkTag}
              >
                OpenSea Link
              </a>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default ContractAssetPage
