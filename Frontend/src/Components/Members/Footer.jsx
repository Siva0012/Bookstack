import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-user-footer grid grid-cols-3 gap-x-6 px-16 py-6 rounded-xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.12)] text-white ">
      <div className=" bg-user-footer drop-shadow-[0px_0px_15px_rgba(0,0,0,0.13)] grid grid-rows-2 gap-x-3 p-5 rounded-xl">
        <h1>Get help</h1>
        <div>
          <p>Phone : 0494-234343</p>
          <p>Email : bookstacks@mail.com</p>
        </div>
      </div>
      <div className=" bg-user-footer drop-shadow-[0px_0px_15px_rgba(0,0,0,0.13)] grid grid-rows-2 gap-x-3 p-5 rounded-xl">
        <h1>Stay connected</h1>
        <div className="bg-user-footer rounded-lg drop-shadow-[0px_0px_15px_rgba(0,0,0,0.15)] grid grid-cols-3">
          <div className="mx-auto py-3">
            <Link to={"https://facebook.com"} target="blank">
              <FiFacebook size={32} />
            </Link>
          </div>
          <div className="mx-auto py-3">
            <Link to={"http://instagram.com"} target="blank">
              <FiInstagram size={32} />
            </Link>
          </div>
          <div className="mx-auto py-3">
            <Link to={"https://twitter.com"} target="blank">
              <FiTwitter size={32} />
            </Link>
          </div>
        </div>
      </div>
      <div className=" bg-user-footer drop-shadow-[0px_0px_15px_rgba(0,0,0,0.13)] grid grid-rows-2 gap-x-3 p-5 rounded-xl">
        <h1 className="">Reach us :</h1>
        <div className="ms-8">
          <p>Address line</p>
          <p>Street name</p>
          <p>state</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
