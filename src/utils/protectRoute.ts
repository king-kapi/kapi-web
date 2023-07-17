import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import UserProfile from "../types/UserProfile";

const protectedGetServerSideProps: GetServerSideProps<{ user: UserProfile }> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // redirect to login if no user
  if (!session)
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    };

  // redirect to onboarding if they have not onboarded
  if (!session.user.onboarded)
    return {
      redirect: {
        destination: "/onboarding",
        permanent: false
      }
    };
  return {
    props: {
      // user_old._id is not JSON serializable
      user: JSON.parse(JSON.stringify(session.user))
    }
  };
};

export default protectedGetServerSideProps;
