import { useEffect } from 'react'
import { UseAppContext } from '../../context/useContext'

function GetCollections() {
  const axios = require('axios')

  const { setNftCollections } = UseAppContext()

  const openSeaCall = async () => {
    try {
      const url =
        'https://testnets-api.opensea.io/api/v1/collections?offset=0&limit=200'
      await axios.get(url).then(function (response: any) {
        setNftCollections(response.data.collections)
      })
    } catch (error) {
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    openSeaCall()
  }, [])
}
export default GetCollections
