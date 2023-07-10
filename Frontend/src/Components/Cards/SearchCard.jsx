import { Link } from "react-router-dom";

function SearchCard({ bookData }) {
  return (
    <Link to={`book/${bookData._id}`}>
      <div className="lg:w-full flex bg-white rounded-md p-3 mb-2 font-nunito">
        <div className="md:w-[75px]">
          <img
            className="w-[100%] h-[100%] object-contain"
            src={bookData.coverPhoto}
            alt=""
          />
        </div>
        <div className="basis-[80%] ms-3 flex flex-col justify-center px-2 shadow-[0px_0px_10px_rgba(0,0,0,0.15)]">
          <h2 className="text-start text-lg font-semibold">
            {bookData.title}
          </h2>
          <h2 className="text-start font-semibold text-black/80">
            {bookData.author}
          </h2>
          <h2 className="text-start text-sm">{bookData.edition}</h2>
          <h2 className="text-start text-sm">{bookData.publisher}</h2>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
