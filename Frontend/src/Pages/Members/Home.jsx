import { useEffect, useState } from "react";

//member APIs
import { getBanners, getRecentBooks, addToBookBag , reserveBook } from "../../Utils/MemberApis";
import Banner from "../../Components/Banner/Banner";
import BookCard from "../../Components/Cards/BookCard";
import RecentBooksCard from "../../Components/Cards/RecentBooksCard";
import { toast } from "react-toastify";

function Home() {
  const [banner, setBanner] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getBanners().then((response) => {
      if (response.data) {
        setBanner(response.data.bannerData);
      }
    });
    // getRecentBooks().then((response) => {
    //   if (response.data.recentBooks) {
    //     setRecentBooks(response.data.recentBooks);
    //   }
    // });
  }, []);

  useEffect(() => {
    getRecentBooks().then((response) => {
      if (response.data.recentBooks) {
        setRecentBooks(response.data.recentBooks);
      }
    });
  } , [update])

  const handleAddtoBag = (bookId) => {
    addToBookBag(bookId)
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message);
          setUpdate((prev => !prev))
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const handleBookReserve = (bookId) => {
    reserveBook(bookId)
    .then((response) => {
      if(response.data.message) {
        toast.success(response.data.message)
        setUpdate((prev => !prev))
      }
    })
    .catch((err) => {
      if(err.response.data.error) {
        toast.error(err.response.data.error)
      }
    })
  }

  return (
    <div className="container mx-auto px-4 md:px-6">
      {/*Hero
style="background: linear-gradient(90deg, #2b4554 0%, #767ba2 100%)"
*/}
      <div
        className="lg:h-[450px] bg-cover bg-no-repeat bg-fixed rounded-xl border-2"
        style={{
          backgroundImage:
            // "url(https://media.vanityfair.com/photos/5ce426151c0b0773cacd1121/master/pass/star-wars-feature-vf-2019-summer-embed-05.jpg)",
            "url(https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1189&q=80)",
        }}
      >
        <div className="bg-black/40 h-full flex rounded-xl ">
          <div className="container m-auto text-center px-6">
            <h2 className="text-5xl font-bold mb-2 font-nunito text-[#ffff]">
              "Discover the Magic of Books."
            </h2>
            <h3 className="text-2xl mb-8 text-[#ffff]">
              "Dive into a world of imagination and knowledge. Explore our vast
              collection today."
            </h3>
            <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:text-blue-500 hover:bg-gray-800 transition-all">
              "Start your reading adventure now!"
            </button>
          </div>
        </div>
      </div>
      {/* Banners */}
      <section className="container mx-auto py-4 mt-12 lg:mt-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mx-auto text-white text-center mb-7 lg:mb-8">
          Your Gateway to Knowledge and Imagination!!
        </h2>
        {banner &&
          banner.map((banner, i) => {
            return <Banner key={i} bannerData={banner} />;
          })}
      </section>
      {/* Recently added books */}
      <section className="bg-gray-100 rounded-md md:px-6 ">
        <div className="container mx-auto py-10">
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8">
            Recently added books
          </h2>
          <div className="mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-x-0 gap-y-6">
            {recentBooks &&
              recentBooks.map((book, i) => {
                return <RecentBooksCard key={i} bookData={book} handleAddtoBag={handleAddtoBag} handleBookReserve={handleBookReserve} />;
              })}
          </div>
        </div>
      </section>
      {/* <section style={{ backgroundColor: "#667eea" }}>
          <div className="container mx-auto px-6 text-center py-20">
            <h2 className="mb-6 text-4xl font-bold text-center text-white">
              Headquarters personnel
            </h2>
            <h3 className="my-4 text-2xl text-white">
              Report to command center. Take it easy.
            </h3>
            <button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider hover:border-red hover:text-white hover:bg-red-600">
              Report
            </button>
          </div>
        </section> */}
    </div>
  );
}

export default Home;
