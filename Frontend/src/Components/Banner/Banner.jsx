function Banner({ bannerData }) {
  return (
    <div
      key={bannerData._id}
      className="flex items-center flex-wrap mb-10 px-6 py-4 bg-white rounded-md"
    >
      <div className="">
        <h4 className="text-md md:text-lg text-gray-800 font-bold mb-3">
          {bannerData.title}
        </h4>
        <div className="w-fit mb-3">
          <p className="text-sm md:text-[16px] text-gray-600 break-words">
            {bannerData.description}
          </p>
        </div>
      </div>
      <div className="">
        <img className="rounded-lg" src={bannerData.image} alt="Vortex" />
      </div>
    </div>
  );
}

export default Banner;
