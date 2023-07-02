import { AiFillStar } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

function BookCard() {
  return (
    <div
      id="card"
      className="p-4 bg-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.2)] lg:w-[300px] md:w-[200px] rounded-xl"
    >
      <div className="mb-3 drop-shadow-[0_0px_3px_rgba(0,255,0,0.8)]">
        <div className=" ms-auto py-1 px-3 rounded-full text-sm bg-white w-fit flex items-center">
          <span className="text-green-600 tracking-wide font-medium">
            Available
          </span>
          <span className="text-green-500 ms-2"><TiTick /></span>
        </div>
      </div>
      <div
        id="image"
        className="mb-3 w-[15rem] drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] cursor-pointer hover:-translate-y-2 hover:drop-shadow-[-5px_10px_5px_rgba(0,0,0,0.5)] duration-500"
      >
        <img
        src="../../../public/public-images/image.jpg"
          className="mx-auto w-[100%]"
          alt=""
        />
      </div>
      <div
        id="contents"
        className=" p-3 rounded-lg bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.14)]"
      >
        <div className="">
          <div id="hover-div" className="hover:text-user-to cursor-pointer">
            <h1 className="font-bold">author</h1>
            <h1 className="text-lg">title</h1>
          </div>
          <div id="rating" className="my-auto">
            <AiFillStar size={21} color="#FF9529" />
          </div>
          <span></span>
        </div>
      </div>
      <div className="mt-4">
        <button className="bg-button-green text-white font-bold w-full py-2 rounded-md hover:text-orange-600 hover:bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.3)]">
          Add to book-bag
        </button>
      </div>
    </div>
  );
}

export default BookCard;
