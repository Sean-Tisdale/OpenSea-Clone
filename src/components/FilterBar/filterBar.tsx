import { useEffect, useState } from 'react'
import { UseAppContext } from '../../context/useContext'
import UseRetrieveOrdersHook from '../../lib/Hooks/useRetrieveOrdersHook'
import { ethers } from 'ethers'
import styles from './filterBarStyles.module.css'

const FilterBar = () => {
  const [display, setDisplay] = useState<boolean>(false)
  const [minPrice, setMinPrice] = useState<any>()
  const [maxPrice, setMaxPrice] = useState<any>()

  const {
    nftSellOrders,
    setNftSellOrders,
    filteredData,
    setFilterCollection,
    filterCollection,
  } = UseAppContext()

  const { openSeaOrders } = UseRetrieveOrdersHook()

  const handleMinChange = (e: any) => {
    e.preventDefault()
    setMinPrice(e.target.value)
  }

  const handleMaxChange = (e: any) => {
    e.preventDefault()
    setMaxPrice(e.target.value)
  }

  const handleCollectionClick = (e: any) => {
    nftSellOrders?.map((data: any) => {
      if (e.target.innerText === data?.asset?.collection?.name) {
        filteredData?.push(data)
      }
    })
    setNftSellOrders(filteredData)
    setFilterCollection(!filterCollection)
  }

  const handlePriceClick = () => {
    nftSellOrders?.map((data: any) => {
      if (
        (ethers.utils.formatEther(data?.base_price) as any) >= minPrice &&
        (ethers.utils.formatEther(data?.base_price) as any) <= maxPrice
      ) {
        filteredData?.push(data)
      }
    })
    setNftSellOrders(filteredData)
    setFilterCollection(!filterCollection)
  }

  const handleFilterReset = () => {
    openSeaOrders()
  }
  const handleStatusClick = (e: any) => {
    if (e.target.innerText === 'Buy Now') {
      nftSellOrders?.map((data: any) => {
        if (data?.sale_kind === 0) {
          filteredData?.push(data)
        }
      })

      setNftSellOrders(filteredData)
      setFilterCollection(!filterCollection)
    } else if (e.target.innerText === 'On Auction') {
      nftSellOrders?.map((data: any) => {
        if (data?.sale_kind === 1) {
          filteredData?.push(data)
        }
      })
      setNftSellOrders(filteredData)
      setFilterCollection(!filterCollection)
    }
  }
  return (
    <>
      <div className={styles.filterWrapper}>
        <div
          className={
            display ? styles.filterHeaderWrapper : styles.filterHeaderWrapper1
          }
          onClick={() => setDisplay(!display)}
        >
          Filters
          <div className={display ? 'none' : styles.arrow}>^</div>
        </div>

        <div className={display ? styles.filters : styles.filtersHidden}>
          <div>
            <h1>Status</h1>
            <div className={styles.collectionNames} onClick={handleStatusClick}>
              Buy Now
            </div>
            <div className={styles.collectionNames} onClick={handleStatusClick}>
              On Auction
            </div>

            <div className={styles.collectionNames} onClick={handleFilterReset}>
              Reset Filters
            </div>
          </div>
          <div>
            <h1>Price</h1>
            <body>
              ETH
              <input placeholder='Min' onChange={handleMinChange} />
              to
              <input placeholder='Max' onChange={handleMaxChange} />
              <button className={styles.button} onClick={handlePriceClick}>
                APPLY
              </button>
            </body>
          </div>
          <div>
            <h1>Collections</h1>
            {nftSellOrders?.map((data: any) => (
              <div
                className={styles.collectionNames}
                onClick={handleCollectionClick}
              >
                {data?.asset?.collection?.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterBar
