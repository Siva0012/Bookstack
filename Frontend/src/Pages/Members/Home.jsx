import { useEffect, useState } from "react";

//member APIs
import { getBanners, getRecentBooks } from "../../Utils/MemberApis";

function Home() {
  const [banner, setBanner] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    getBanners().then((response) => {
      if (response.data) {
        setBanner(response.data.bannerData);
      }
    });
    getRecentBooks().then((response) => {
      if (response.data.recentBooks) {
        setRecentBooks(response.data.recentBooks);
      }
    });
  }, []);

  return (
    <div>
      <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
        {/*Hero
style="background: linear-gradient(90deg, #2b4554 0%, #767ba2 100%)"
*/}
        <div
          className="py-28 bg-cover bg-no-repeat bg-fixed rounded-xl"
          style={{
            backgroundImage:
              // "url(https://media.vanityfair.com/photos/5ce426151c0b0773cacd1121/master/pass/star-wars-feature-vf-2019-summer-embed-05.jpg)",
              "url(https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1189&q=80)",
          }}
        >
          <div className="container m-auto text-center px-6 opacity-100">
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
        {/* Features */}
        <section className="container mx-auto px-6 p-10 mt-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Your Gateway to Knowledge and Imagination!!
          </h2>
          {banner &&
            banner.map((banner, i) => {
              return (
                <>
                  <div
                    key={banner._id}
                    className="flex items-center flex-wrap mb-20"
                  >
                    <div className="w-full md:w-1/2 pr-10">
                      <h4 className="text-3xl text-gray-800 font-bold mb-3">
                        {banner.title}
                      </h4>
                      <p className="text-gray-600 mb-8">{banner.description}</p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img
                        className="rounded-lg"
                        src={banner.image}
                        alt="Vortex"
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </section>
        {/* Testimonials */}
        <section className="bg-gray-100">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Recent Books
            </h2>
            <div className="flex flex-wrap">
              {/* <div className="w-full h-auto md:w-1/3 px-2 mb-4">
                <div className="flex flex-col justify-between h-full bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">
                    How are you feeling, kid? You don't look so bad to me. In
                    fact, you look strong enough to pull the ears off a Gundark.
                    Thanks to you.
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">
                    Luke Skywalker
                  </p>
                </div>
              </div> */}
              {recentBooks &&
                recentBooks.map((book) => {
                  return (
                    <>
                      <div key={book._id} className="p-8">
                        <div className="w-[100px]">
                          <img src={book.coverPhoto} alt="" />
                        </div>
                      </div>
                      <div className="">
                        <h1>{book.title}</h1>
                      </div>
                    </>
                  );
                })}

              {/* <div className="w-full h-auto md:w-1/3 px-2 mb-4">
                <div className="flex flex-col justify-between h-full bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">
                    That's two you owe me, junior. Well your Worship, looks like
                    you managed to keep me around for a little while longer. I
                    had nothing to do with it.
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">
                    Emperor's Royal Guards
                  </p>
                </div>
              </div>
              <div className="w-full h-auto md:w-1/3 px-2 mb-4">
                <div className="flex flex-col justify-between h-full bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">
                    General Rieekan thinks it's dangerous for any ships to leave
                    the system until we've activated the energy shield. That's a
                    good story. I think you just can't bear to let a gorgeous
                    guy like me out of your sight
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">
                    Queen Mother Ta'a Chume
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        <section style={{ backgroundColor: "#667eea" }}>
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
        </section>
      </div>
    </div>
  );
}

export default Home;
