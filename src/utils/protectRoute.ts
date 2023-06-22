import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import UserProfile from "../types/UserProfile";

const protectedGetServerSideProps: GetServerSideProps<{ user: UserProfile }> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session)
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    };
  return {
    props: {
      // user._id is not JSON serializable
      user: JSON.parse(JSON.stringify(session.user))
    }
  };
};

export default protectedGetServerSideProps;
