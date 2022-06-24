import { GetServerSideProps } from 'next'
import ForSalePage from '../../components/OnSalePage/forSalePage'

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
