import { useEffect } from "react";
import { useRouter } from "next/router";
import decodeToken from "@/utils/decodeToken";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push(`/auth/login?redirect=${router.asPath}`);
      } else {
        const decodedToken = decodeToken(token);
        
        if (!decodedToken) {
          router.push(`/auth/login?redirect=${router.asPath}`);
        } else if (decodedToken?.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          router.push(`/auth/login?redirect=${router.asPath}`);
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  }
};

export default withAuth;