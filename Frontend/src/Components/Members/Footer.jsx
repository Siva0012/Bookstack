import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-user-footer grid sm:grid-row-3 gap-y-2 md:grid-cols-3 gap-x-6 px-16 py-6 rounded-xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.12)] text-white ">
      <div className=" bg-user-footer drop-shadow-[0px_0px_15px_rgba(0,0,0,0.13)] flex flex-col p-5 rounded-xl">
        <h1 className="mb-6 text-md">Get help</h1>
        <div className="text-sm">
          <p>Phone : 0494-234343</p>
          <p>Email : bookstacks@mail.com</p>
        </div>
      </div>
      <div className=" bg-user-footer drop-shadow-[0px_0px_15px_rgba(0,0,0,0.13)] flex flex-col p-5 rounded-xl">
        <h1 className="mb-6 text-md">Stay connected</h1>
        <div className="text-[24px] bg-user-footer rounded-lg drop-shadow-[0px_0px_15px_rgba(0,0,0,0.15)] grid grid-cols-3">
          <div className="mx-auto py-3">
            <Link to={"https://facebook.com"} className="" target="blank">
              <FiFacebook className="" />
            </Link>
          </div>
          <div className="mx-auto py-3">
            <Link to={"http://instagram.com"} target="blank">
              <FiInstagram />
            </Link>
          </div>
          <div className="mx-auto py-3">
            <Link to={"https://twitter.com"} target="blank">
              <FiTwitter />
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-user-footer drop-shadow-[0px_0px_15px_rgba(0,0,0,0.13)] flex flex-col p-5 rounded-xl">
        <h1 className="text-md mb-6">Reach us :</h1>
        <div className="">
          <p>Address line</p>
          <p>Street name</p>
          <p>state</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
