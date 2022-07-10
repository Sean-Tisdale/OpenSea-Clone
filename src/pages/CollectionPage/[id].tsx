import { GetServerSideProps } from 'next'
import CollectionPage from '../../components/CollectionPage/collectionPage'

function CollectionDetails(props: any) {
  return (
    <>
      <CollectionPage props={props} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return { props: { token: context?.params?.id?.toString() } }
}

export default CollectionDetails
