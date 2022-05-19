import { InjectedConnector as MetaMask } from '@web3-react/injected-connector'
import { NetworkConnector as Network } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/21c6445fc0ca469bbad00815484a9bf5',
  4: 'https://rinkeby.infura.io/v3/21c6445fc0ca469bbad00815484a9bf5',
}

export const injected = new MetaMask({
  supportedChainIds: [1, 4],
})

export const network = new Network({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  defaultChainId: 4,
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 4: RPC_URLS[4] },
  bridge: 'https://bridge.walletconnect.org',
  supportedChainIds: [1, 4],
})
