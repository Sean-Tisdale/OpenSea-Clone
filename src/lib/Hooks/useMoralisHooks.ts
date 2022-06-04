import { useWeb3React } from '@web3-react/core'
import { useMoralis } from 'react-moralis'

export function UseMoralisHooks() {
  const { Moralis } = useMoralis()
  const { account } = useWeb3React()

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
    const { t } = await Moralis.Plugins.opensea.getOrders({
      network: 'testnet',
      tokenAddress: tokenAddress,
      tokenId: tokenId,
      orderSide: 1,
      page: 1,
    })
    const orders = t[t?.length - 1]
    console.log(orders, 'line 32')
    try {
      await Moralis.Plugins.opensea.fulfillOrder({
        network: 'testnet',
        userAddress: account as string,
        order: orders,
      })
    } catch (err: any) {
      console.log(err)
    }
  }
  return { sellOrder, getOrders }
}
