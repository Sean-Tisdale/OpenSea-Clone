import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { useEffect } from 'react'
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
      <MoralisProvider
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string}
        appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID as string}
      >
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </MoralisProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
