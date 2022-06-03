import { useWeb3React } from '@web3-react/core'
import { useMoralis } from 'react-moralis'

export function UseMoralisHooks() {
  const { Moralis } = useMoralis()

  const sellOrder = async (
    tokenAddress: string,
    tokenId: string,
    tokenType: string,
    price: number | undefined,
    account: string | null | undefined
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
  return { sellOrder }
}
