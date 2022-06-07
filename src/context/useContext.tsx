import { createContext, useContext, useState } from 'react'

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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
