import { useEffect } from "react";
import { useRouter } from "next/router";
import decodeToken from "@/utils/decodeToken";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    // console.log(router)
    
    useEffect(() => {
      const { id } = router.query; // Extract the dynamic id

      const token = localStorage.getItem("token");
      if (!token) {
        let redirectPath = router.asPath;

        if (id) {
          redirectPath = redirectPath.replace("[id]", id);
        }

        router.push(`/auth/login?redirect=${redirectPath}`);
      } else {
        const decodedToken = decodeToken(token);
        
        if (!decodedToken) {
          let redirectPath = router.asPath;

          if (id) {
            redirectPath = redirectPath.replace("[id]", id);
          }

          router.push(`/auth/login?redirect=${redirectPath}`);
        } else if (decodedToken?.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          let redirectPath = router.asPath;

          if (id) {
            redirectPath = redirectPath.replace("[id]", id);
          }

          router.push(`/auth/login?redirect=${redirectPath}`);
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  }
};

export default withAuth;
