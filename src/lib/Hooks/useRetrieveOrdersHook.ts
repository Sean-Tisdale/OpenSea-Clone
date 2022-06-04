import { useEffect } from 'react'
import { UseAppContext } from '../../context/useContext'

function UseRetrieveOrdersHook() {
  const axios = require('axios')

  const { setNftSellOrders } = UseAppContext()

  const openSeaOrders = async () => {
    try {
      const url =
        'https://testnets-api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&side=1&sale_kind=0&limit=30&offset=0&order_by=created_date&order_direction=desc'
      await axios.get(url).then(function (response: any) {
        setNftSellOrders(response?.data?.orders)
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }
  useEffect(() => {
    openSeaOrders()
  }, [])
}

export default UseRetrieveOrdersHook
