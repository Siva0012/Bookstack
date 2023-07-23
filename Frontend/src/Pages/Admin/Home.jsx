import { useEffect, useState , useRef } from "react";
import CardH from "../../Components/Admin/Dashboard/CardH";
import Graph from "../../Components/Admin/Dashboard/Graph";
import MembershipGraph from "../../Components/Admin/Dashboard/MembershipGraph";
import {
  downloadLenderData,
  getBmc,
  getLenderData,
} from "../../Utils/AdminApis";
import { ImBooks } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";
import LenderTable from "../../Components/Admin/Dashboard/LenderTable";
import { toast } from "react-toastify";
import PrintableLenderTable from "../../Components/Admin/Dashboard/PrintableLenderTable";
import { useReactToPrint } from "react-to-print";

function Home() {
  const [bmc, setBmc] = useState(null);
  const [lenderData, setlenderData] = useState([]);
  const [dateData, setDateData] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    getBmc().then((response) => {
      if (response.data.data) {
        setBmc(response.data.data);
      }
    });
  }, []);

  const fetchLenderData = async () => {
    try {
      const response = await getLenderData();
      if (response.data.lenderData) {
        setlenderData(response.data.lenderData);
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchLenderData();
  }, []);

  const handleDateChange = (e) => {
    setDateData({
      ...dateData,
      [e.target.name]: e.target.value,
    });
  };

  const submitDownload = async () => {
    try {
      const response = await downloadLenderData(dateData);
      if (response.data.lenderData) {
        setlenderData(response.data.lenderData);
        console.log(response.data.lenderData);
        handlePrint()
      }
    } catch (err) {
      toast.error(err.response.data.error)
     }
  };

  const handleClear = () => {
    setDateData({from : "" , to : ""})
    fetchLenderData()
  }

  const printableLenderTableRef = useRef()  //download report
  const handlePrint = useReactToPrint(
    {
      content : () => printableLenderTableRef.current,
      documentTitle : `lender data from ${dateData.from} to ${dateData.to}`,
    }
  )

  return (
    <>
      <div className="px-14 text-white">
        <div className="mt-5">
          <div id="bmc" className="flex flex-wrap justify-evenly">
            {bmc && (
              <>
                <Link to="/admin/members">
                  <CardH
                    count={bmc.members}
                    data={"Members"}
                    icon={<FaUsers color="#191970" size={75} />}
                  />
                </Link>
                <Link to="/admin/books">
                  <CardH
                    count={bmc.books}
                    data={"Books"}
                    icon={<ImBooks color="white" size={75} />}
                  />
                </Link>
                <Link to="/admin/categories">
                  <CardH
                    count={bmc.categories}
                    data={"Categories"}
                    icon={<MdCategory color="#228B22" size={75} />}
                  />
                </Link>
              </>
            )}
          </div>

          <div></div>

          <div
            className="mt-20 flex justify-around items-center pb-4"
            id="graph-section"
          >
            <div className="bg-[#1b1b1b] ring-1 ring-white p-4 rounded-3xl">
              <h1 className="text-xl tracking-wider font-semibold">
                Category vise checkouts
              </h1>
              <div className="mt-4">
                <Graph />
              </div>
            </div>
            <div className="bg-[#1b1b1b] ring-1 ring-white p-4 rounded-3xl">
              <h1 className="text-xl tracking-wider font-semibold">
                Membership types
              </h1>
              <div className="mt-4">
                <MembershipGraph />
              </div>
            </div>
          </div>

          <div className="mt-10 mb-20">
            <h1 className="text-xl font-semibold mb-4">Lender data</h1>
            <div className="text-white text-end bg-black/40 mb-4 p-3 rounded-md">
              {/* <h1 className="text-lg mb-1">Select the date</h1> */}
              <span className="mx-2">
                Get lender report{" "}
                <span className="font-semibold ms-1">from</span>
              </span>
              <input
                className="rounded-md text-sm capitalize bg-white/10 font-semibold tracking-wide cursor-pointer ring-[1px] ring-white/30 border-0"
                onChange={handleDateChange}
                value={dateData.from}
                name="from"
                type="date"
              />
              <span className="mx-2 font-semibold">to</span>
              <input
                className="rounded-md text-sm capitalize bg-white/10 font-semibold tracking-wide cursor-pointer ring-[1px] ring-white/30 border-0"
                onChange={handleDateChange}
                value={dateData.to}
                name="to"
                type="date"
              />
              <button
                onClick={submitDownload}
                className="bg-blue-700 ms-2 px-3 py-1 rounded-md"
              >
                Download
              </button>
              <button
                onClick={handleClear}
                className="bg-yellow-600 ms-2 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            </div>
            {<div className={`transition-all ${lenderData.length > 0 ? '' : 'opacity-0'}`}>
            {lenderData.length > 0 && (
              <div className="max-h-[450px] overflow-y-auto">
                <div ref={printableLenderTableRef}>
                  <LenderTable lenderData={lenderData} />
                </div>
              </div>
            )}
            </div>}
          </div>


          
        </div>
      </div>
    </>
  );
}

export default Home;
