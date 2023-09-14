import { getSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

function Blog({ data }) {
  const pathname = usePathname();
  console.log(pathname);
  return <h1>Blog Page - {data}</h1>;
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { req } = context;

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=http://${req.headers.host}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: session ? 'List of 100 personalized blogs' : 'List of free blogs',
    },
  };
}
