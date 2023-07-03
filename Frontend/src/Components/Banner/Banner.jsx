function Banner({bannerData}) {
  return (
      <div
        key={bannerData._id}
        className="flex items-center flex-wrap mb-10 px-6 py-4 bg-white rounded-md"
      >
        <div className="w-full md:w-1/2 ">
          <h4 className="text-3xl text-gray-800 font-bold mb-3">
            {bannerData.title}
          </h4>
          <p className="text-gray-600 mb-8">{bannerData.description}</p>
        </div>
        <div className="w-full md:w-1/2">
          <img className="rounded-lg" src={bannerData.image} alt="Vortex" />
        </div>
      </div>
  );
}

export default Banner;
