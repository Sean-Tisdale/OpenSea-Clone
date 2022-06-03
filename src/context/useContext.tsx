import { createContext, useContext, useState } from 'react'

export type ContextValues = {
  nftData: [{}] | undefined
  setNftData: React.Dispatch<
    React.SetStateAction<
      | [
          {
            collectionName: string
            contractAddress: string
            description: string
            image: string
            name: string
            openSeaLink: string
            owner: string
            tokenId: string
            tokenType: string
          }
        ]
      | undefined
    >
  >
  nftCollectionData: [{}] | undefined
  setNftCollectionData: React.Dispatch<React.SetStateAction<[{}] | undefined>>
}

export const DefaultValues: ContextValues = {
  nftData: undefined,
  setNftData: () => {},
  nftCollectionData: undefined,
  setNftCollectionData: () => {},
}

export const AppContext = createContext<ContextValues>(DefaultValues)

export const UseAppContext = () => useContext(AppContext)

interface Props {
  children: React.ReactNode
}

export const ContextProvider = ({ children }: Props) => {
  const [nftData, setNftData] = useState<
    | [
        {
          collectionName: string
          contractAddress: string
          description: string
          image: string
          name: string
          openSeaLink: string
          owner: string
          tokenId: string
          tokenType: string
        }
      ]
    | undefined
  >()
  const [nftCollectionData, setNftCollectionData] = useState<[{}] | undefined>()

  return (
    <AppContext.Provider
      value={{
        nftData,
        setNftData,
        nftCollectionData,
        setNftCollectionData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
