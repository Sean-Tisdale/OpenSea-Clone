import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { UseAppContext } from '../../context/useContext'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { ethers } from 'ethers'
import SellAsset from '../../components/SellAsset/sellAsset'
import { WyvernSchemaName } from 'opensea-js/lib/types'

function ProfilePageDetails() {
  const {
    nftData,
    display,
    setDisplay,
    setNftCollections,
    sellDisplay,
    setSellDisplay,
    setTokenAddress,
    setTokenId,
    setTokenType,
  } = UseAppContext()

  const router = useRouter()
  const query = router.query

  const slug = query?.id?.toString()

  let tokenContractAddress: string
  let tokenID: string
  let tokenTYPE: WyvernSchemaName
  useEffect(() => {
    setDisplay(false)
    setNftCollections(nftData)
    setTokenAddress(tokenContractAddress)
    setTokenId(tokenID)
    setTokenType(tokenTYPE)
  }, [])

  return (
    <>
      <SellAsset />
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
                        href={`https://etherscan.io/address/${data?.owner?.address}`}
                        target='_blank'
                        rel='noreferrer'
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
                      <div
                        className={styles.onSaleButton}
                        onClick={() => setSellDisplay(!sellDisplay)}
                      >
                        Sell Asset
                      </div>
                    ) : (
                      <>
                        <a
                          href={data?.permalink}
                          target='_blank'
                          rel='noreferrer'
                          className={styles.collection}
                        >
                          Item is For Sale
                        </a>
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
                        display ? styles.detailsInfo : styles.detailsInfoHidden
                      }
                    >
                      <div>
                        Token ID:&nbsp;
                        {data?.token_id?.substring(0, 4)}
                        {data?.token_id?.length > 8
                          ? '...' +
                            data?.token_id?.substring(
                              data?.token_id?.length - 4
                            )
                          : null}
                      </div>
                      <div style={{ display: 'none' }}>
                        {(tokenContractAddress = data?.asset_contract?.address)}
                        {(tokenID = data?.token_id)}
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
                        Token Type:{' '}
                        {(tokenTYPE = data?.asset_contract?.schema_name)}
                      </div>

                      <a
                        href={data?.permalink}
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

export default ProfilePageDetails
