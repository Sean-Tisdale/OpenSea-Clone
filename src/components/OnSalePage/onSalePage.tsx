import Link from 'next/link'
import { UseAppContext } from '../../context/useContext'
import UseRetrieveOrdersHook from '../../lib/Hooks/useRetrieveOrdersHook'
import styles from '../UserProfile/userProfileStyles.module.css'
import FilterBar from '../../components/FilterBar/filterBar'
import { ethers } from 'ethers'
import { useEffect } from 'react'

const OnSalePage = () => {
  const { nftSellOrders, filterCollection } = UseAppContext()

  // const data = UseRetrieveOrdersHook()
  // const order = data?.openSeaOrders
  // useEffect(() => {
  //   order?.()
  // }, [])

  return (
    <>
      <FilterBar />
      <div className={styles.profileWrapper}>
        {filterCollection
          ? nftSellOrders?.map((data: any) => (
              <div
                key={
                  data?.asset?.asset_contract?.address +
                  data?.asset?.token_id +
                  data?.id
                }
                className={styles.cardWrapper}
              >
                <Link
                  href={`/ForSalePage/${
                    data?.asset?.asset_contract?.address +
                    data?.asset?.token_id +
                    data?.id
                  }`}
                >
                  <img className={styles.image} src={data?.asset?.image_url} />
                </Link>
                <div className={styles.name}>{data?.asset?.name}</div>
                <div className={styles.name}>
                  Price:{' '}
                  {data?.base_price
                    ? ethers.utils.formatEther(data?.base_price) + 'ETH'
                    : 'null'}
                </div>
              </div>
            ))
          : nftSellOrders?.map((data: any) => (
              <div
                key={
                  data?.asset?.asset_contract?.address +
                  data?.asset?.token_id +
                  data?.id
                }
                className={styles.cardWrapper}
              >
                <Link
                  href={`/ForSalePage/${
                    data?.asset?.asset_contract?.address +
                    data?.asset?.token_id +
                    data?.id
                  }`}
                >
                  <img className={styles.image} src={data?.asset?.image_url} />
                </Link>
                <div className={styles.name}>{data?.asset?.name}</div>
                <div className={styles.name}>
                  Price:{' '}
                  {data?.base_price
                    ? ethers.utils.formatEther(data?.base_price) + 'ETH'
                    : 'null'}
                </div>
              </div>
            ))}
      </div>
    </>
  )
}

export default OnSalePage
