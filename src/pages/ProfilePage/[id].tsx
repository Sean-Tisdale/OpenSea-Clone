import ProfilePage from '../../components/UserProfile/profilePage'
import { GetServerSideProps } from 'next'

function ProfilePageDetails(props: any) {
  return (
    <>
      <ProfilePage props={props} />
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  return { props: { token: context?.params?.id?.toString() } }
}

export default ProfilePageDetails
