import { useWeb3React } from "@web3-react/core"
import { useEffect, useRef } from "react"
import { useMoralis } from "react-moralis"


  function GetUserData() {

    const axios = require('axios')
    const nftData: any[] = []

    const openSeaCall = async () => {
	try {
        const url = "https://testnets-api.opensea.io/api/v1/assets?owner=0x77Fa9C504810C96082668B3941Bcb42e33004009&order_direction=desc&offset=0&limit=20"
		await axios.get(url)
        .then(function (response: any) {
        response.data.assets.map((data: any) => {
             return nftData.push({
        description: data.description,
        image: data.image_url,
        name: data.name,
        tokenId: data.token_id,
        owner: data.creator.address,
        contractAddress: data.asset_contract.address,
        tokenType: data.asset_contract.schema_name,
        collectionName: data.collection.name,
        openSeaLink: data.permalink,
 })
    })       
      })
	}
	catch (error) {
		console.log(error, 'error');
	} 
   
}
openSeaCall() 

    return {nftData}
}
export default GetUserData