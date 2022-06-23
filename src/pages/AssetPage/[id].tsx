import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import AssetPage from '../../components/AssetPage/assetPage'
import { GetServerSideProps } from 'next'
import UseGetCollectionHook from '../../lib/Hooks/useGetCollectionDataHook'

let collection: any = []
let nfts: any
let current: any
function ContractAssetPage(props: any) {
  const context = UseAppContext()
  const { retrieveCollection } = UseGetCollectionHook()
  const router = useRouter()
  const query = router?.query

  const token_ID = query?.id?.toString()

  collection = context?.nftCollectionData
  console.log(token_ID, 'token id')
  console.log(collection, 'colleciton dataaaa')
  current = collection?.map(async (data: any) => {
    if (
      token_ID === data?.token_id ||
      token_ID === data?.collection?.token_id ||
      token_ID === data?.asset?.collection?.token_id
    ) {
      console.log(data, 'data from contract')
      return data
    }
  })
  // nfts = context?.nftCollections

  console.log(current?.data, 'collection')

  return (
    <>
      <NavBar />
      <AssetPage props={props} />
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  // const { params } = context

  // const res = await fetch(
  //   `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=0xd2704c09129a5f331ef46f40a803c10b64998642&order_direction=desc&offset=0&limit=30`
  // )

  // const stuff = await res.json()

  return { props: { token: context?.params?.id?.toString() } }
}

export default ContractAssetPage
