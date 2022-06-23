import NavBar from '../../components/NavBar/navBar'

import AssetPage from '../../components/AssetPage/assetPage'
import { GetServerSideProps } from 'next'

function ContractAssetPage(props: any) {
  return (
    <>
      <NavBar />
      <AssetPage props={props} />
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  return { props: { token: context?.params?.id?.toString() } }
}

export default ContractAssetPage
