import Link from 'next/link'
import { UseAppContext } from '../../context/useContext'
import UseRetrieveOrdersHook from '../../lib/Hooks/useRetrieveOrdersHook'
import styles from '../UserProfile/userProfileStyles.module.css'

const OnSalePage = () => {
  const { nftSellOrders } = UseAppContext()

  UseRetrieveOrdersHook()

  return (
    <>
      <div className={styles.profileWrapper}>
        {nftSellOrders?.map((data: any) => (
          <div
            key={data?.asset?.asset_contract?.address + data?.asset?.token_id}
            className={styles.cardWrapper}
          >
            <Link
              href={`/ForSalePage/${
                data?.asset?.asset_contract?.address + data?.asset?.token_id
              }`}
            >
              <img className={styles.image} src={data?.asset?.image_url} />
            </Link>
            <div className={styles.name}>{data?.asset?.name}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default OnSalePage
