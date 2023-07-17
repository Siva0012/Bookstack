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

   // <div>
    //   <div>
    //     <h1>Active fines</h1>
    //     <div className="flex items-center">
    //       <div className="lg:w-[150px] lg:h-[120px]">
    //         <img
    //           className="object-contain w-full h-full"
    //           src="../../../public/public-images/image.jpg"
    //           alt=""
    //         />
    //       </div>
    //       <div className="">
    //         <h2>Book title</h2>
    //         <h2>Book author</h2>
    //         <h2>Book category</h2>
    //         <h2>Book checkout date</h2>
    //         <h2>Book due date</h2>
    //       </div>
    //     </div>
    //   </div>
    // </div>

export default CardH;
