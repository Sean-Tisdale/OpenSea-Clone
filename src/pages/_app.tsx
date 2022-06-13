import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers'
import { ContextProvider } from '../context/useContext'

function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider {
  const library = new Web3Provider(provider)

  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
