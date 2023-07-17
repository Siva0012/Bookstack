import { ImBooks } from "react-icons/im";

function CardH({count , data , icon}) {
  return (
    <div className="bg-bg-admin-sidebar-button lg:w-[300px] lg:h-[150px] lg:rounded-3xl">
      <div className="flex justify-around items-center h-full p-3">
        <div className="font-semibold" >
          <h1 className="text-4xl tracking-wider text-center mb-3">{count}</h1>
          <h2 className="text-xl tracking-wider font-ubuntu">{data}</h2>
        </div>
        <div className="">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default CardH;
