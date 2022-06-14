import { createContext, useContext, useState } from 'react'
import { WyvernSchemaName } from 'opensea-js/lib/types'

export type ContextValues = {
  nftData: [{}] | undefined
  setNftData: React.Dispatch<React.SetStateAction<[{}] | undefined>>
  nftCollections: [{}] | undefined
  setNftCollections: React.Dispatch<React.SetStateAction<[{}] | undefined>>
  nftCollectionData: [{}] | undefined
  setNftCollectionData: React.Dispatch<React.SetStateAction<[{}] | undefined>>
  nftSellOrders: [{}] | undefined
  setNftSellOrders: React.Dispatch<React.SetStateAction<[{}] | undefined>>
  display: true | false
  setDisplay: React.Dispatch<React.SetStateAction<true | false>>
  sellDisplay: true | false
  setSellDisplay: React.Dispatch<React.SetStateAction<true | false>>
  tokenAddress: string
  setTokenAddress: React.Dispatch<React.SetStateAction<string>>
  tokenId: string
  setTokenId: React.Dispatch<React.SetStateAction<string>>
  tokenType: WyvernSchemaName | undefined
  setTokenType: React.Dispatch<
    React.SetStateAction<WyvernSchemaName | undefined>
  >
}

export const DefaultValues: ContextValues = {
  nftData: undefined,
  setNftData: () => {},
  nftCollections: undefined,
  setNftCollections: () => {},
  nftCollectionData: undefined,
  setNftCollectionData: () => {},
  nftSellOrders: undefined,
  setNftSellOrders: () => {},
  display: false,
  setDisplay: () => {},
  sellDisplay: false,
  setSellDisplay: () => {},
  tokenAddress: '',
  setTokenAddress: () => {},
  tokenId: '',
  setTokenId: () => {},
  tokenType: undefined,
  setTokenType: () => {},
}

export const AppContext = createContext<ContextValues>(DefaultValues)

export const UseAppContext = () => useContext(AppContext)

interface Props {
  children: React.ReactNode
}

export const ContextProvider = ({ children }: Props) => {
  const [nftData, setNftData] = useState<[{}] | undefined>()
  const [nftCollections, setNftCollections] = useState<[{}] | undefined>()
  const [nftCollectionData, setNftCollectionData] = useState<[{}] | undefined>()
  const [nftSellOrders, setNftSellOrders] = useState<[{}] | undefined>()
  const [display, setDisplay] = useState<boolean>(false)
  const [sellDisplay, setSellDisplay] = useState<boolean>(false)
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')
  const [tokenType, setTokenType] = useState<WyvernSchemaName | undefined>(
    undefined
  )

  return (
    <AppContext.Provider
      value={{
        nftData,
        setNftData,
        nftCollections,
        setNftCollections,
        nftCollectionData,
        setNftCollectionData,
        nftSellOrders,
        setNftSellOrders,
        display,
        setDisplay,
        sellDisplay,
        setSellDisplay,
        tokenAddress,
        setTokenAddress,
        tokenId,
        setTokenId,
        tokenType,
        setTokenType,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
