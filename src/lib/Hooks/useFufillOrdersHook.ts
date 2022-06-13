import { Provider, Web3Provider } from '@ethersproject/providers'
import HDWalletProvider from '@truffle/hdwallet-provider'
import { useWeb3React } from '@web3-react/core'
import { OpenSeaPort, Network } from 'opensea-js'

export function UseFufillOrdersHook() {
  const { library, account } = useWeb3React<Web3Provider>()
  const provider = library?.provider as any

  const signer = account as any

  const seaport = new OpenSeaPort(
    provider,
    {
      networkName: Network.Rinkeby,
    },
    arg => console.log(arg)
  )
  const accountAddress = signer
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
  const sellOrder = async (
    tokenId: string,
    tokenAddress: string,
    price: number
  ) => {
    const createSellOrder = await seaport.createSellOrder({
      asset: {
        tokenId,
        tokenAddress,
      },
      accountAddress,
      startAmount: price,
      endAmount: price,
    })
    console.log(createSellOrder, 'sell order')
  }

  return { getOrders, sellOrder }
}
