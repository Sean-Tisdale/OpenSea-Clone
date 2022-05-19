import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar/navBar'
import styles from '../styles/Home.module.css'
import HomePage from './HomePage'

const Home: NextPage = () => {
  return (
    <>
    <NavBar />
    <HomePage />
    </>
  )
}

export default Home
