import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { UseAppContext } from '../../context/useContext'
import styles from '../../styles/PageStyles/pageStyles.module.css'
import { ethers } from 'ethers'
import { UseFufillOrdersHook } from '../../lib/Hooks/useFufillOrdersHook'
import Link from 'next/link'
import { WyvernSchemaName } from 'opensea-js/lib/types'
import ForSalePage from '../../components/OnSalePage/forSalePage'
import UseRetrieveOrdersHook from '../../lib/Hooks/useRetrieveOrdersHook'

// export async function getStaticProps() {
//   // const blogPosts = await getBlogPosts()
//   const { openSeaOrders } = UseRetrieveOrdersHook()

//   const orders = await openSeaOrders()
//   return {
//     props: {
//       orders,
//     },
//   }
// }
function ForSalePageDetails() {
  return (
    <>
      <ForSalePage />
    </>
  )
}

export default ForSalePageDetails
