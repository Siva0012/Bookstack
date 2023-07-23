import { useRef } from "react";
import { useState, useEffect } from "react";

function GoogleBookViewer({ isbn , showViewer }) {

  // Obtain ISBN number of user's current book
  const ISBN_num = isbn;
  const canvasRef = useRef();

  // Initialize loaded state as false
  const [loaded, setLoaded] = useState(false);
  // Create alert message if book not found in Google Database
  function alertNotFound() {
    alert("could not embed the book!");
  }
  // Add a Google Books script tag and event listener if the tag has loaded
  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://www.google.com/books/jsapi.js";
    scriptTag.addEventListener("load", () => setLoaded(true));
    scriptTag.id = "google-script";
    document.body.appendChild(scriptTag);
  }, []);
  // Once Google Books has loaded, then create new instance of Default viewer and load book's information to viewer
  useEffect(() => {
    if (!loaded) return;
    else {
      if (window.viewer) {
        let viewer = new window.google.books.DefaultViewer(canvasRef.current);
        console.log("first finished" , viewer);
        viewer.load("ISBN:" + ISBN_num, alertNotFound); 
      } else {
        window.google.books.load();
        window.google.books.setOnLoadCallback(() => {
          let viewer = new window.google.books.DefaultViewer(canvasRef.current);
          window.viewer = viewer;
          console.log("loading finished" , viewer);
          viewer.load("ISBN:" + ISBN_num, alertNotFound);
        });
      }
    }
  }, [loaded]);
  return (
    <div className={`${showViewer ? 'block' : 'hidden'}`}>
      {loaded ? (
        <div
          className="w-[450px] h-[500px] mx-auto"
          ref={canvasRef}
          id="viewerCanvas"
        ></div>
      ) : (
        "Script not loaded"
      )}
    </div>
  );
}

//   useEffect(() => {
//       const scriptTag = document.createElement("script");
//       scriptTag.src = "https://www.google.com/books/jsapi.js";
//       scriptTag.async = true;
//       document.body.appendChild(scriptTag);

//       scriptTag.onload = () => {
//         window.google.books.load("language:pt-BR", () => {
//           const viewer = new window.google.books.DefaultViewer(
//             document.getElementById("viewerCanvas")
//           );
//           viewer.load(`ISBN : ${isbn}` , alert());
//         });
//       };

//       return () => {
//         document.body.removeChild(scriptTag);
//       };
//     }, []);

//     return (
//       <div className="mx-auto mt-10" style={{ width: "600px", height: "500px" , backgroundColor : 'white' }}>
//         <div id="viewerCanvas"></div>
//       </div>
//     );

//   function alertNotFound() {
//     alert(`Could'nt found book`);
//   }

//  useEffect(() => {
//       const initializeViewer = () => {
//             if(window.google && window.google.books) {
//                   const viewer = new window.google.books.DefaultViewer(document.getElementById('viewerCanvas'))
//                   viewer.load(`ISBN : ${isbn}`)
//             } else {
//                   setTimeout(initializeViewer , 500)
//             }
//       }
//       initializeViewer()

//  } , [])

//   return (
//     <div style={{width : '600px' , height : '500px'}}>
//       <div id="viewerCanvas">

//       </div>
//     </div>
//   );

export default GoogleBookViewer;
