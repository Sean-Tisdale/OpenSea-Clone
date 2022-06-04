import { UseAppContext } from '../../context/useContext'

function UseGetCollectionHook() {
  const axios = require('axios')

  const { setNftCollectionData } = UseAppContext()

  const retrieveCollection = async (data: any) => {
    data?.primary_asset_contracts?.map(async (nestedData: any) => {
      try {
        const url = `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${nestedData.address}&order_direction=desc&offset=0&limit=30`
        await axios.get(url).then(function (response: any) {
          setNftCollectionData(response.data.assets)
        })
      } catch (error) {
        console.log(error, 'error')
      }
    })
  }
  return { retrieveCollection }
}

export default UseGetCollectionHook
