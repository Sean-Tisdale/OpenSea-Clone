import { useState } from 'react'
import { UseAppContext } from '../../context/useContext'
import styles from './sellAssetStyles.module.css'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import { WyvernSchemaName } from 'opensea-js/lib/types'

const SellAsset = () => {
  const [startingPrice, setStartingPrice] = useState<number>()
  const [endPrice, setEndPrice] = useState<number>()
  const [time, setTime] = useState<string>('Select')
  const [timeValue, setTimeValue] = useState<number>()
  const [timedAuction, setTimedAuction] = useState<boolean>(false)

  const { sellDisplay, setSellDisplay, tokenAddress, tokenId, tokenType } =
    UseAppContext()

  const { sellOrder } = UseFufillOrdersHook()

  const handleStartChange = (e: any) => {
    e.preventDefault()
    setStartingPrice(e.target.value)
  }
  const handleEndChange = (e: any) => {
    e.preventDefault()
    setEndPrice(e.target.value)
  }
  const handleClick = async () => {
    if (timedAuction) {
      await sellOrder(
        tokenId,
        tokenAddress,
        tokenType as WyvernSchemaName,
        startingPrice as number,
        endPrice as number,
        timeValue as number
      )
    } else {
      await sellOrder(
        tokenId,
        tokenAddress,
        tokenType as WyvernSchemaName,
        startingPrice as number,
        startingPrice as number,
        timeValue as number
      )
    }
  }

  return (
    <>
      <div className={sellDisplay ? styles.container : styles.hide}>
        <div className={styles.innerBox}>
          <button
            className={styles.closeButton}
            onClick={() => setSellDisplay(!sellDisplay)}
          >
            X
          </button>
          <div className={styles.title}>List item for sale</div>
          <div className={styles.typeSelectWrapper}>
            <div className={styles.typeWrapper}>
              <div
                style={{ borderRight: '1px black solid' }}
                className={timedAuction ? styles.saleType : styles.selectedType}
                onClick={() => setTimedAuction(false)}
              >
                Fixed Price
              </div>
              <div
                className={timedAuction ? styles.selectedType : styles.saleType}
                onClick={() => setTimedAuction(true)}
              >
                Timed Auction
              </div>
            </div>
            <a
              href='https://en.wikipedia.org/wiki/Dutch_auction'
              target='_blank'
              rel='noreferrer'
              className={styles.help}
            >
              ?
            </a>
          </div>

          <div className={styles.auctionInputWrapper}>
            <div className={styles.priceWrapper}>
              <div>
                {timedAuction ? 'Starting Price in ETH' : 'Price in ETH'}
              </div>
              <input
                className={styles.priceInput}
                onChange={handleStartChange}
                placeholder='Amount'
              />
            </div>
            <div
              className={
                timedAuction ? styles.priceWrapper : styles.notSelected
              }
            >
              <div>{timedAuction ? 'Ending Price in ETH' : 'Price in ETH'}</div>
              <input
                className={styles.priceInput}
                onChange={handleEndChange}
                placeholder='Amount'
              />
            </div>
            <div className={styles.durationWrapper}>
              <div>Duration of Sale</div>
              <div className={styles.durationMenu}>
                <div className={styles.dropButton}>{time}</div>

                <div className={styles.timeSelect}>
                  <div onClick={() => (setTime('1 Day'), setTimeValue(24))}>
                    1 Day
                  </div>
                  <div onClick={() => (setTime('3 Days'), setTimeValue(72))}>
                    3 Days
                  </div>
                  <div onClick={() => (setTime('7 Days'), setTimeValue(168))}>
                    7 Days
                  </div>
                  <div onClick={() => (setTime('10 Days'), setTimeValue(240))}>
                    10 Days
                  </div>
                  <div onClick={() => (setTime('30 Days'), setTimeValue(720))}>
                    30 Days
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleClick} className={styles.createListingButton}>
            Create Listing
          </button>
        </div>
      </div>
    </>
  )
}

export default SellAsset
