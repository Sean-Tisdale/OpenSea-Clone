import ForSalePage from '../../components/OnSalePage/forSalePage'

import { GetServerSideProps } from 'next'

function ForSalePageDetails(props: any) {
  return (
    <>
      <ForSalePage props={props} />
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  return { props: { token: context?.params?.id?.toString() } }
}
export default ForSalePageDetails
