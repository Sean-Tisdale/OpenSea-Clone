import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { UseAppContext } from '../../context/useContext'

function UseGetUserData() {
  const { account } = useWeb3React()
  const axios = require('axios')

  const { setNftData } = UseAppContext()

  const openSeaCall = async () => {
    try {
      const url = `https://testnets-api.opensea.io/api/v1/assets?owner=${
        account as string
      }&order_direction=desc&offset=0&limit=30&include_orders=true`
      await axios.get(url).then(function (response: any) {
        setNftData(response.data.assets)
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }
  return { openSeaCall }
}
export default UseGetUserData
