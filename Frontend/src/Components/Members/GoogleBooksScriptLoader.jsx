import { useEffect } from "react"

function GoogleBooksScriptLoader() {

      useEffect(() => {
            const scriptTag = document.createElement("script");
            scriptTag.src = "https://www.google.com/books/jsapi.js";
            scriptTag.id = "google-script";
            scriptTag.type = "text/javascript"
            scriptTag.async = true
            document.body.appendChild(scriptTag);
        
            return () => {
              document.body.removeChild(scriptTag)
            }
          }, []);

  return null
}

export default GoogleBooksScriptLoader