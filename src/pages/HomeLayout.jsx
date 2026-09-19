import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, Navbar } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <Navbar />
      {navigation.state === "idle" ? (
        <section className="align-element py-20">
          <Outlet />
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default HomeLayout;
