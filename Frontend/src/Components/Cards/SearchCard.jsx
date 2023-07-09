import { Link } from "react-router-dom";

function SearchCard({ bookData }) {
  return (
    <Link to={`book/${bookData._id}`}>
      <div className="lg:w-full flex bg-white rounded-md p-2 mb-2 font-nunito">
        <div className="md:w-[90px] md:h-[120px] ">
          <img
            className="w-[100%] h-[100%] object-contain"
            src={bookData.coverPhoto}
            alt=""
          />
        </div>
        <div className="basis-[80%] ms-2 flex flex-col pt-2">
          <h2 className="text-start text-xl font-semibold mb-1">
            {bookData.title}
          </h2>
          <h2 className="text-start font-semibold text-black/80 mb-1">
            {bookData.author}
          </h2>
          <h2 className="text-start text-sm mb-1">{bookData.edition}</h2>
          <h2 className="text-start text-sm">{bookData.publisher}</h2>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
