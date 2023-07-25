import React from "react";
import {
  Route,
  RouteProps,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import { Layout } from "../components/layout";
import { ROUTES } from "../routes";
import { PageHome } from "./Home";
import { Page404 } from "./404";

const PAGES: RouteProps[] = [
  {
    path: ROUTES.home,
    element: <Layout>
      <PageHome />
    </Layout>
  }
];

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ isProper, setIsProper ] = React.useState(false);

  React.useEffect(() => {
    if(location.search.startsWith("?/")) {
      navigate(location.search.slice(1));
    }
    setIsProper(true);
  }, []);

  if(!isProper) return null;

  return <Routes>
    {PAGES.map((page, index) => <Route key={index} {...page} path={`${page.path}`} />)}
    <Route path="/*" element={<Layout><Page404 /></Layout>}></Route>
  </Routes>;
};

export default Index;