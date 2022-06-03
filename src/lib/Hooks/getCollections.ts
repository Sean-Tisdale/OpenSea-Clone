import { useEffect } from 'react'
import { UseAppContext } from '../../context/useContext'

function GetCollections() {
  const axios = require('axios')

  const { nftCollectionData, setNftCollectionData } = UseAppContext()

  const openSeaCall = async () => {
    try {
      const url =
        'https://testnets-api.opensea.io/api/v1/collections?offset=0&limit=200'
      await axios.get(url).then(function (response: any) {
        setNftCollectionData(response.data.collections)
        // .map((data: any) => {
        //   if (data?.featured_image_url != null) {

        //   }
        //   //             data.primary_asset_contracts.map(async (nestedData: any) => {
        //   //                 try {

        //   //                     const url = `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${nestedData.address}&order_direction=desc&offset=0&limit=2`
        //   //                     await axios.get(url)
        //   //                     .then(function (response: any) {
        //   //                         response.data.assets.map((data: any) => {
        //   //                             return collectionAssets.push({
        //   //                        description: data.description,
        //   //                        image: data.image_url,
        //   //                        name: data.name,
        //   //                        tokenId: data.token_id,
        //   //                        owner: data.creator.address,
        //   //                        contractAddress: data.asset_contract.address,
        //   //                        tokenType: data.asset_contract.schema_name,
        //   //                        collectionName: data.collection.name,
        //   //                        openSeaLink: data.permalink,
        //   //                        onSale: data.is_presale
        //   //                 })
        //   //                    })
        //   //                     })
        //   //                 }
        //   //                 catch (error) {
        //   //                     console.log(error, 'error');
        //   //                 }

        //   //                      return collectionData.push({
        //   //         collectionName: nestedData.name,
        //   //         contractAddress: nestedData.address,
        //   //  })
        //   // })
        // })
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }
  //   console.log(nftCollectionData, 'collection data')

  useEffect(() => {
    openSeaCall()
  }, [])
}
export default GetCollections
