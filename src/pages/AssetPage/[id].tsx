import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import Link from 'next/link'
import { ethers } from 'ethers'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import { WyvernSchemaName } from 'opensea-js/lib/types'
import AssetPage from '../../components/AssetPage/assetPage'

function ContractAssetPage() {
  // const [offerAmount, setOfferAmount] = useState<number>()

  // const router = useRouter()
  // const query = router?.query

  // const token_ID = query?.id?.toString()

  // const { nftCollectionData, display, setDisplay } = UseAppContext()

  // const data = UseFufillOrdersHook()
  // const order = data?.getOrders
  // const offer = data?.createOffer
  // let tokenType: WyvernSchemaName
  // let tokenToBuyAddress: string
  // let tokenID: string

  // const handleClick = async (e: any) => {
  //   if (e.target.innerText === 'Make Offer') {
  //     await offer?.(
  //       tokenID,
  //       tokenToBuyAddress,
  //       tokenType,
  //       offerAmount as number
  //     )
  //   } else if (e.target.innerText === 'Buy Now') {
  //     await order?.(tokenToBuyAddress, tokenID)
  //   }
  // }
  // const handleChange = (e: any) => {
  //   e.preventDefault()
  //   setOfferAmount(e.target.value)
  // }
  // useEffect(() => {
  //   setDisplay(false)
  // }, [])
  return (
    <>
      <NavBar />
      <AssetPage />
    </>
  )
}

export default ContractAssetPage
