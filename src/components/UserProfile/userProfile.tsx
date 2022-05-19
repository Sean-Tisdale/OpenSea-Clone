import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react"
import  GetUserData  from "../../lib/Hooks/getUserData";
import NavBar from "../NavBar/navBar";
import styles from './userProfileStyles.module.css'


function UserProfile () {
const { account } = useWeb3React()
const data = GetUserData()

const state = useRef(data?.nftData)


console.log(state?.current, 'state')

return (
      <>
      <NavBar/>
      <div className={styles.profileWrapper} >
      { account &&
     state?.current?.map((data: any) => (
        <div key={data?.tokenId} className={styles.cardWrapper}>
        <Link href={`/ProfilePage/${data?.tokenId}`}>
        <img className={styles.image} src={data?.image}/>
        </Link>
        <div className={styles.name} >{data?.name}</div>
         <div className={styles.description} >{data?.description}</div>
     </div>
      ))}
   </div> 
   </>              
  )
}

export default UserProfile
