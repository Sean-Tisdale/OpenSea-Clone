import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import NavBar from "../../components/NavBar/navBar"
import GetUserData from "../../lib/Hooks/getUserData"
import styles from '../../styles/PageStyles/profilePageStyles.module.css'
import { useWeb3React } from "@web3-react/core"

function ProfilePageDetails() {
    const {account} = useWeb3React()
    const router = useRouter()
    const query = router.query
    
    const token_id = query?.id?.toString() 

    const nft = GetUserData()

     const state = useRef(nft?.nftData)

const currentNft: any[] = []

 state?.current?.map( (data: any) => {
    if(token_id === data?.tokenId) {
return currentNft.push(data)
}
}) 

  return (
    <>
    <NavBar/>
    <div className={styles.nftPageWrapper} >
    {
   currentNft?.map((data: any) => (
       <>
      <div className={styles.cardWrapper}>
      <img className={styles.image} src={data?.image}/>
      <div className={styles.name} >{data?.name}</div>
       <div className={styles.description} >{data?.description}</div>
   </div>
   <button className={styles.sellButton} >Sell</button>
   <div className={styles.infoWrapper} >
   <div>Token ID: {data?.tokenId}</div>
   <div>Contract Address: {data?.contractAddress}</div>
   <div>Token Type: {data?.tokenType}</div>
   <div>Owner: {data?.owner}</div>
   <div>Collection: {data?.collectionName}</div>
   <a href={data?.openSeaLink} target="_blank" className={styles.linkTag}>OpenSea Link</a>
   </div>
   </>
    ))}
 </div> 
 </>  
  )

}

export default ProfilePageDetails