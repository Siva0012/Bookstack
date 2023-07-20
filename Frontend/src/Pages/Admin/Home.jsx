import { useEffect, useState } from "react";
import CardH from "../../Components/Admin/Dashboard/CardH";
import Graph from "../../Components/Admin/Dashboard/Graph";
import MembershipGraph from "../../Components/Admin/Dashboard/MembershipGraph";
import { getBmc } from "../../Utils/AdminApis";
import { ImBooks } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  const [bmc, setBmc] = useState(null);

  useEffect(() => {
    getBmc().then((response) => {
      if (response.data.data) {
        setBmc(response.data.data);
      }
    });
  }, []);

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
                <Link to='/admin/books'>
                  <CardH
                    count={bmc.books}
                    data={"Books"}
                    icon={<ImBooks color="white" size={75} />}
                  />
                </Link>
                <Link to='/admin/categories'>
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
        </div>
      </div>
    </>
  );
}

export default Home;
