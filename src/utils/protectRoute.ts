import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";

export default async function protectedGetServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<object>> {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}