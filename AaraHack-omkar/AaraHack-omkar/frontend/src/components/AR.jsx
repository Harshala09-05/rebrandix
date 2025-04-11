// // components/TShirtSneakerAR.jsx
// import React, { useState } from "react";
// import "@google/model-viewer";
// import image1 from "../assets/t-shirt (1).glb";

// const products = [
//   {
//     name: "T-Shirt (Mock)",
//     glb: image1,
//     usdz: image1,
//     description: "A comfortable cotton t-shirt with modern design",
//   },
//   {
//     name: "Sneaker - Red",
//     glb: image1,
//     usdz: "https://modelviewer.dev/shared-assets/models/Shoe.usdz",
//     description: "Classic red sneakers with rubber sole",
//   },
//   {
//     name: "Sneaker - Grey",
//     glb: image1,
//     usdz: "https://modelviewer.dev/shared-assets/models/Footwear.usdz",
//     description: "Comfortable grey sneakers for everyday wear",
//   },
// ];

// const TShirtSneakerAR = () => {
//   const [tryOnProduct, setTryOnProduct] = useState(null);

//   const toggleTryOn = (index) => {
//     setTryOnProduct(tryOnProduct === index ? null : index);

//     const viewer = document.getElementById(`modelViewer-${index}`);

//     if (viewer) {
//       if (tryOnProduct !== index) {
//         viewer.cameraOrbit = "0deg 90deg 1.5m";
//         viewer.minCameraOrbit = "0deg 75deg 1.5m";
//         viewer.maxCameraOrbit = "0deg 105deg 2.5m";

//         if (products[index].name.includes("T-Shirt")) {
//           viewer.exposure = 1.2;
//         }
//       } else {
//         viewer.cameraOrbit = "0deg 75deg 2m";
//         viewer.minCameraOrbit = "auto auto auto";
//         viewer.maxCameraOrbit = "auto auto auto";
//         viewer.exposure = 1.0;
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6 text-center">AR Product Viewer</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product, index) => (
//           <div
//             key={index}
//             className={`rounded-lg shadow-lg p-4 transition-all ${
//               tryOnProduct === index ? "ring-2 ring-blue-500" : ""
//             }`}
//           >
//             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//             <p className="text-gray-600 mb-4">{product.description}</p>

//             <model-viewer
//               id={`modelViewer-${index}`}
//               src={product.glb}
//               ios-src={product.usdz}
//               ar
//               ar-modes="scene-viewer quick-look"
//               camera-controls
//               auto-rotate={tryOnProduct !== index}
//               environment-image="neutral"
//               style={{ width: "100%", height: "300px" }}
//               className="rounded-xl"
//               shadow-intensity="1"
//               camera-orbit="0deg 75deg 2m"
//               exposure="1"
//             ></model-viewer>

//             <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
//               <button
//                 onClick={() => {
//                   const viewer = document.getElementById(
//                     `modelViewer-${index}`
//                   );
//                   setTimeout(() => {
//                     if (viewer?.activateAR) viewer.activateAR();
//                   }, 100);
//                 }}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
//               >
//                 View in Your Space
//               </button>

//               <button
//                 onClick={() => toggleTryOn(index)}
//                 className={`px-4 py-2 rounded-xl transition-all ${
//                   tryOnProduct === index
//                     ? "bg-green-600 hover:bg-green-700 text-white"
//                     : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//                 }`}
//               >
//                 {tryOnProduct === index ? "Exit Try-On" : "Try On"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {tryOnProduct !== null && (
//         <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-blue-300 md:max-w-md">
//           <h3 className="font-bold mb-2">
//             Try-On Mode: {products[tryOnProduct].name}
//           </h3>
//           <p>
//             • Drag to rotate and view from different angles
//             <br />
//             • Pinch to zoom in/out
//             <br />• Use AR mode for a more immersive experience
//           </p>
//           <button
//             onClick={() => setTryOnProduct(null)}
//             className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TShirtSneakerAR;


// components/TShirtSneakerAR.jsx
import React, { useState, useEffect } from "react";
import "@google/model-viewer";

// Dynamically import all .glb files from assets folder
const modelFiles = import.meta.glob("../assets/*.glb", { eager: true, as: "url" });

const TShirtSneakerAR = () => {
  const [products, setProducts] = useState([]);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  useEffect(() => {
    const generatedProducts = Object.entries(modelFiles).map(([path, url], index) => {
      const fileName = path.split("/").pop();
      const baseName = fileName.replace(".glb", "").replace(/[-_]/g, " ");

      return {
        name: baseName.charAt(0).toUpperCase() + baseName.slice(1),
        glb: url,
        usdz: url, // fallback or change if needed
        description: "AR preview of " + baseName,
      };
    });
    setProducts(generatedProducts);
  }, []);

  const toggleTryOn = (index) => {
    setTryOnProduct(tryOnProduct === index ? null : index);
    const viewer = document.getElementById(`modelViewer-${index}`);
    if (viewer) {
      if (tryOnProduct !== index) {
        viewer.cameraOrbit = "0deg 90deg 1.5m";
        viewer.minCameraOrbit = "0deg 75deg 1.5m";
        viewer.maxCameraOrbit = "0deg 105deg 2.5m";
        viewer.exposure = 1.2;
      } else {
        viewer.cameraOrbit = "0deg 75deg 2m";
        viewer.minCameraOrbit = "auto auto auto";
        viewer.maxCameraOrbit = "auto auto auto";
        viewer.exposure = 1.0;
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">AR Product Viewer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-4 transition-all ${
              tryOnProduct === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <model-viewer
              id={`modelViewer-${index}`}
              src={product.glb}
              ios-src={product.usdz}
              ar
              ar-modes="scene-viewer quick-look"
              camera-controls
              auto-rotate={tryOnProduct !== index}
              environment-image="neutral"
              style={{ width: "100%", height: "300px" }}
              className="rounded-xl"
              shadow-intensity="1"
              camera-orbit="0deg 75deg 2m"
              exposure="1"
            ></model-viewer>

            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
              <button
                onClick={() => {
                  const viewer = document.getElementById(
                    `modelViewer-${index}`
                  );
                  setTimeout(() => {
                    if (viewer?.activateAR) viewer.activateAR();
                  }, 100);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                View in Your Space
              </button>

              <button
                onClick={() => toggleTryOn(index)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  tryOnProduct === index
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {tryOnProduct === index ? "Exit Try-On" : "Try On"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {tryOnProduct !== null && (
        <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-blue-300 md:max-w-md">
          <h3 className="font-bold mb-2">
            Try-On Mode: {products[tryOnProduct].name}
          </h3>
          <p>
            • Drag to rotate and view from different angles
            <br />
            • Pinch to zoom in/out
            <br />• Use AR mode for a more immersive experience
          </p>
          <button
            onClick={() => setTryOnProduct(null)}
            className="mt-2 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TShirtSneakerAR;
