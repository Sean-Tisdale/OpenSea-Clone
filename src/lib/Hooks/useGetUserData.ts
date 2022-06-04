import { useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { UseAppContext } from '../../context/useContext'

function UseGetUserData() {
  const { account } = useMoralis()
  const axios = require('axios')

  const { setNftData } = UseAppContext()

  const openSeaCall = async () => {
    try {
      const url = `https://testnets-api.opensea.io/api/v1/assets?owner=${
        account as string
      }&order_direction=desc&offset=0&limit=30`
      await axios.get(url).then(function (response: any) {
        setNftData(response.data.assets)
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }
  useEffect(() => {
    openSeaCall()
  }, [])
}
export default UseGetUserData
