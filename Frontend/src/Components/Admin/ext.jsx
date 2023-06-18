
// const table = () => {
//     return (
//         <>
//             HTML to JSX Converter
// Developed with ❤ by Vishnu Baliga

// Click here to insert Sample HTML
// Input HTML

// <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
//     <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//         <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//                 <th scope="col" class="p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-all-search" class="sr-only">checkbox</label>
//                     </div>
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Product name
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Color
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Category
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Price
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                     Action
//                 </th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Apple MacBook Pro 17"
//                 </th>
//                 <td class="px-6 py-4">
//                     Silver
//                 </td>
//                 <td class="px-6 py-4">
//                     Laptop
//                 </td>
//                 <td class="px-6 py-4">
//                     $2999
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                         <label for="checkbox-table-search-2" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Microsoft Surface Pro
//                 </th>
//                 <td class="px-6 py-4">
//                     White
//                 </td>
//                 <td class="px-6 py-4">
//                     Laptop PC
//                 </td>
//                 <td class="px-6 py-4">
//                     $1999
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Magic Mouse 2
//                 </th>
//                 <td class="px-6 py-4">
//                     Black
//                 </td>
//                 <td class="px-6 py-4">
//                     Accessories
//                 </td>
//                 <td class="px-6 py-4">
//                     $99
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Apple Watch
//                 </th>
//                 <td class="px-6 py-4">
//                     Black
//                 </td>
//                 <td class="px-6 py-4">
//                     Watches
//                 </td>
//                 <td class="px-6 py-4">
//                     $199
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Apple iMac
//                 </th>
//                 <td class="px-6 py-4">
//                     Silver
//                 </td>
//                 <td class="px-6 py-4">
//                     PC
//                 </td>
//                 <td class="px-6 py-4">
//                     $2999
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Apple AirPods
//                 </th>
//                 <td class="px-6 py-4">
//                     White
//                 </td>
//                 <td class="px-6 py-4">
//                     Accessories
//                 </td>
//                 <td class="px-6 py-4">
//                     $399
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     iPad Pro
//                 </th>
//                 <td class="px-6 py-4">
//                     Gold
//                 </td>
//                 <td class="px-6 py-4">
//                     Tablet
//                 </td>
//                 <td class="px-6 py-4">
//                     $699
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Magic Keyboard
//                 </th>
//                 <td class="px-6 py-4">
//                     Black
//                 </td>
//                 <td class="px-6 py-4">
//                     Accessories
//                 </td>
//                 <td class="px-6 py-4">
//                     $99
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     Smart Folio iPad Air
//                 </th>
//                 <td class="px-6 py-4">
//                     Blue
//                 </td>
//                 <td class="px-6 py-4">
//                     Accessories
//                 </td>
//                 <td class="px-6 py-4">
//                     $79
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td class="w-4 p-4">
//                     <div class="flex items-center">
//                         <input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
//                         <label for="checkbox-table-search-3" class="sr-only">checkbox</label>
//                     </div>
//                 </td>
//                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     AirTag
//                 </th>
//                 <td class="px-6 py-4">
//                     Silver
//                 </td>
//                 <td class="px-6 py-4">
//                     Accessories
//                 </td>
//                 <td class="px-6 py-4">
//                     $29
//                 </td>
//                 <td class="px-6 py-4">
//                     <Link href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//                 </td>
//             </tr>
//         </tbody>
//     </table>
//     <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
//         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
//         <ul class="inline-flex items-center -space-x-px">
//             <li>
//                 <Link href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//                     <span class="sr-only">Previous</span>
//                     <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
//                 </a>
//             </li>
//             <li>
//                 <Link href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
//             </li>
//             <li>
//                 <Link href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
//             </li>
//             <li>
//                 <Link href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
//             </li>
//             <li>
//                 <Link href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
//             </li>
//             <li>
//                 <Link href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
//             </li>
//             <li>
//                 <Link href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//                     <span class="sr-only">Next</span>
//                     <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
//                 </a>
//             </li>
//         </ul>
//     </nav>
// </div>


// Output as React Class Component
// Convert HTML to JSX
// Output JSX
// Copy Code
// <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//   <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//       <tr>
//         <th scope="col" className="p-4">
//           <div className="flex items-center">
//             <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
//           </div>
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Product name
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Color
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Category
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Price
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Apple MacBook Pro 17"
//         </th>
//         <td className="px-6 py-4">
//           Silver
//         </td>
//         <td className="px-6 py-4">
//           Laptop
//         </td>
//         <td className="px-6 py-4">
//           $2999
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-2" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Microsoft Surface Pro
//         </th>
//         <td className="px-6 py-4">
//           White
//         </td>
//         <td className="px-6 py-4">
//           Laptop PC
//         </td>
//         <td className="px-6 py-4">
//           $1999
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Magic Mouse 2
//         </th>
//         <td className="px-6 py-4">
//           Black
//         </td>
//         <td className="px-6 py-4">
//           Accessories
//         </td>
//         <td className="px-6 py-4">
//           $99
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Apple Watch
//         </th>
//         <td className="px-6 py-4">
//           Black
//         </td>
//         <td className="px-6 py-4">
//           Watches
//         </td>
//         <td className="px-6 py-4">
//           $199
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Apple iMac
//         </th>
//         <td className="px-6 py-4">
//           Silver
//         </td>
//         <td className="px-6 py-4">
//           PC
//         </td>
//         <td className="px-6 py-4">
//           $2999
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Apple AirPods
//         </th>
//         <td className="px-6 py-4">
//           White
//         </td>
//         <td className="px-6 py-4">
//           Accessories
//         </td>
//         <td className="px-6 py-4">
//           $399
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           iPad Pro
//         </th>
//         <td className="px-6 py-4">
//           Gold
//         </td>
//         <td className="px-6 py-4">
//           Tablet
//         </td>
//         <td className="px-6 py-4">
//           $699
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Magic Keyboard
//         </th>
//         <td className="px-6 py-4">
//           Black
//         </td>
//         <td className="px-6 py-4">
//           Accessories
//         </td>
//         <td className="px-6 py-4">
//           $99
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           Smart Folio iPad Air
//         </th>
//         <td className="px-6 py-4">
//           Blue
//         </td>
//         <td className="px-6 py-4">
//           Accessories
//         </td>
//         <td className="px-6 py-4">
//           $79
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//         <td className="w-4 p-4">
//           <div className="flex items-center">
//             <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//             <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
//           </div>
//         </td>
//         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//           AirTag
//         </th>
//         <td className="px-6 py-4">
//           Silver
//         </td>
//         <td className="px-6 py-4">
//           Accessories
//         </td>
//         <td className="px-6 py-4">
//           $29
//         </td>
//         <td className="px-6 py-4">
//           <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
//         </td>
//       </tr>
//     </tbody>
//   </table>
//   <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
//     <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
//     <ul className="inline-flex items-center -space-x-px">
//       <li>
//         <Link href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//           <span className="sr-only">Previous</span>
//           <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
//         </a>
//       </li>
//       <li>
//         <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
//       </li>
//       <li>
//         <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
//       </li>
//       <li>
//         <Link href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
//       </li>
//       <li>
//         <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
//       </li>
//       <li>
//         <Link href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
//       </li>
//       <li>
//         <Link href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
//           <span className="sr-only">Next</span>
//           <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
//         </a>
//       </li>
//     </ul>
//   </nav>
// </div>
//         </>
//     )
// }