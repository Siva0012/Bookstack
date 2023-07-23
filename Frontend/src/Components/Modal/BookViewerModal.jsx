import { useState, useEffect, forwardRef } from "react";
import GoogleBookViewer from "../Members/GoogleBookViewer";

const BookViewerModal = forwardRef((props, ref) => {
  const [isRendered, setisRendered] = useState(false);
  useEffect(() => {
    setisRendered(true);
  }, []);

  if (!props.isVisible || !isRendered) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") props.onClose();
  };

  return (
    <>
      <div
        id="wrapper"
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-[5] flex justify-center items-center"
      >
        <div className="w-[600px] flex flex-col">
          <button
            onClick={() => props.onClose()}
            className="text-white text-xl place-self-end"
          >
            X
          </button>
          <div className="bg-white rounded-md">
            <GoogleBookViewer loaded={props.loaded} ref={ref} />
          </div>
        </div>
      </div>
    </>
  );
});

export default BookViewerModal;
