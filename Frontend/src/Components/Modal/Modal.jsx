import { useState , useEffect } from "react";


function Modal({isVisible , onClose , children}) {

  const [isRendered, setisRendered] = useState(false);
  useEffect(() => {
    setisRendered(true)
  } , [])

     if(!isVisible || !isRendered) return null
     
     const handleClose = (e) => {
          if(e.target.id === 'wrapper') onClose()
     }

  return (
    <>
      <div
      id="wrapper"
      onClick={handleClose}
       className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-[5] flex justify-center items-center">
          <div className="w-[600px] flex flex-col">
               <button onClick={() => onClose()} className="text-white text-xl place-self-end">X</button>
               <div className="bg-white p-2 rounded-md">{children}</div>
          </div>

      </div>
    </>
  );
}

export default Modal;
