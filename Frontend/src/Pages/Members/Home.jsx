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
        <section className="container mx-auto py-4 mt-12">
          <h2 className="text-4xl font-bold text-center text-white mb-7">
            Your Gateway to Knowledge and Imagination!!
          </h2>
          {banner &&
            banner.map((banner, i) => {
              return (
                <>
                  <div
                    key={banner._id}
                    className="flex items-center flex-wrap mb-10 px-2 py-4 bg-white rounded-md"
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
        <section className="bg-gray-100 rounded-md">
          <div className="container mx-auto px-6 py-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Recently added books
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6">
             
              {recentBooks &&
                recentBooks.map((book) => {
                  return (
                    <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 rounded-xl">
                      <div className="w-full">
                      <div className="w-[180px] h-[250px] mx-auto">
                      <img src={book.coverPhoto} className="object-contain w-[100%] h-[100%]" />
                      </div>

                      </div>
                    <div className="px-4 py-3 w-72">
                      <span className="text-black mr-3 uppercase text-sm font-semibold">{book.title}</span>
                      <p className="text-lg font-bold text-black truncate block capitalize">{book.author}</p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">{book.category.name}</p>
                        <div className="ml-auto">
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
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
