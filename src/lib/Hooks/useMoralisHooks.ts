import { useWeb3React } from '@web3-react/core'
import { useMoralis } from 'react-moralis'

export function UseMoralisHooks() {
  const { Moralis, account } = useMoralis()

  const sellOrder = async (
    tokenAddress: string,
    tokenId: string,
    tokenType: string,
    price: number | undefined
  ) => {
    await Moralis.Plugins.opensea.createSellOrder({
      network: 'testnet',
      tokenAddress: tokenAddress as string,
      tokenId: tokenId as string,
      tokenType: tokenType as string,
      userAddress: account as string,
      startAmount: price as number,
      endAmount: price as number,
    })
  }
  const getOrders = async (tokenAddress: string, tokenId: string) => {
    const t = await Moralis.Plugins.opensea.getOrders({
      network: 'testnet',
      tokenAddress: tokenAddress,
      tokenId: tokenId,
      orderSide: 1,
      page: 1,
    })
    const order = t?.orders[0]
    console.log(order, 'line 32')
    try {
      await Moralis.Plugins.opensea.fulfillOrder({
        network: 'testnet',
        userAddress: account as string,
        order: order,
      })
    } catch (err: any) {
      console.log(err)
    }
  }
  return { sellOrder, getOrders }
}
