import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchService from "../components/SearchService";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("type");
    console.log(type);
    
    if (type === "client") {
      console.log("Client logged in");
      navigate("/main");
    } else if(type === "hospital") {
      navigate("/admin-details");
    } else{
      navigate("/main")
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <SearchService />
      <Footer />
    </>
  );
}

export default Home;
