import React, { useEffect, useState } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { UseEagerConnect } from '../../lib/Hooks/providerHook'
import styles from './walletStyles.module.css'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 4],
})

function Wallet() {
  const { chainId, activate, library, account } = useWeb3React<Web3Provider>()
  const [accountNum, setAccountNum] = useState<string>(
    account
      ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
      : ''
  )
  const [balance, setBalance] = useState<any>(null)

  useEffect(() => {
    if (account) {
      setAccountNum(
        account
          ? `${account.substring(0, 4)}...${account.substring(
              account.length - 4
            )}`
          : ''
      )
    }
  }, [account])

  const handleClick = () => {
    activate(injectedConnector)
  }

  useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(formatEther(balance))
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId])

  const triedEager = UseEagerConnect()

  return (
    <>
      {account ? (
        <div className={styles.walletWrapper}>
          <span>Acct:&nbsp;{accountNum}</span>
          <span>
            {balance === null ? 'error' : Math.round(balance * 1e2) / 1e2} ETH
          </span>
        </div>
      ) : (
        <div>
          <button className={styles.walletButton} onClick={handleClick}>
            Connect Wallet
          </button>
        </div>
      )}
    </>
  )
}

export default Wallet
