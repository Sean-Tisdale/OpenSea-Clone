import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { OpenSeaPort, Network } from 'opensea-js'
import { WyvernSchemaName } from 'opensea-js/lib/types'
import { Provider } from 'react'
import { AbstractProvider, provider } from 'web3-core'

export function UseFufillOrdersHook() {
  const { library, account } = useWeb3React<Web3Provider>()
  // const proider: AbstractProvider = library?.provider as AbstractProvider
  if (account) {
    const seaport = new OpenSeaPort(
      library?.provider as any,
      {
        networkName: Network.Rinkeby,
      },
      arg => console.log(arg)
    )
    const accountAddress = account as string
    const getOrders = async (tokenAddress: string, tokenId: string) => {
      const order = await seaport.api.getOrder({
        asset_contract_address: tokenAddress,
        maker: undefined,
        owner: undefined,
        side: 1,
        bundled: false,
        token_id: tokenId,
        sale_kind: 0,
      })
      console.log(getOrders, 'get orders')
      const transactionHash = await seaport
        .fulfillOrder({
          order,
          accountAddress,
        })
        .catch(err => console.log(err))
      console.log('tx hash: ' + transactionHash)
    }

    const createOffer = async (
      tokenId: string,
      tokenAddress: string,
      schemaName: WyvernSchemaName,
      offerAmount: number
    ) => {
      const offer = await seaport
        .createBuyOrder({
          asset: {
            tokenId,
            tokenAddress,
            schemaName,
          },
          accountAddress,
          startAmount: offerAmount,
        })
        .catch(err => console.log(err))
      console.log('tx hash: ' + offer)
    }
    const sellOrder = async (
      tokenId: string,
      tokenAddress: string,
      tokenType: WyvernSchemaName,
      startPrice: number,
      endPrice: number,
      time: number
    ) => {
      const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * time)

      const createSellOrder = await seaport
        .createSellOrder({
          asset: {
            tokenId,
            tokenAddress,
            schemaName: tokenType,
          },
          accountAddress,
          startAmount: startPrice,
          endAmount: endPrice,
          expirationTime,
        })
        .catch(err => console.log(err))
      console.log('tx hash: ' + createSellOrder)
    }

    return { getOrders, sellOrder, createOffer }
  }
}
