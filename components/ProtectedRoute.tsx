import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";

export async function protectedGetServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<object>> {
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

// export default function ProtectedRoute({ children }: PropsWithChildren) {
//     const router = useRouter();
//     const [authorized, setAuthorized] = useState(false);
//     const { data: session } = useSession()

//     useEffect(() => { // so we can use router
//         setAuthorized(session !== undefined || router.pathname === "/login" || router.pathname === "/logout");
//     }, [session, router.pathname]);


//     if (authorized) // authenticated
//         return <>{children}</>;
//     else
//         router.push("/login");
//         return <div>Not authenticated</div>;

// }