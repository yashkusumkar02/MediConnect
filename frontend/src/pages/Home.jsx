// In Home.jsx
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchService from "../components/SearchService";


function Home() {
  return (
    <>
      <Navbar />
      <SearchService />
      <Footer />
    </>
  );
}

export default Home;
