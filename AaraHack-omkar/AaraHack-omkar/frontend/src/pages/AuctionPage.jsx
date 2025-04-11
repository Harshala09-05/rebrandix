// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Clock,
// // //   ArrowUpRight,
// // //   RefreshCw,
// // //   Calendar,
// // //   User,
// // //   DollarSign,
// // //   Award,
// // //   AlertCircle,
// // //   ChevronDown,
// // //   ChevronUp,
// // //   Search,
// // //   Plus,
// // // } from "lucide-react";
// // // import axios from "axios";

// // // // Configure axios with authentication token
// // // axios.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem("authToken");
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // // Configure axios with authentication token
// // // axios.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem("token");
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // // API service for auction-related requests
// // // const auctionService = {
// // //   // Get all auction rooms
// // //   getAuctions: async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         "http://127.0.0.1:8000/auction/auctions/"
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error("Error fetching auctions:", error);
// // //       throw error;
// // //     }
// // //   },

// // //   // Create a new auction room
// // //   createAuction: async (auctionData) => {
// // //     try {
// // //       const response = await axios.post(
// // //         "http://127.0.0.1:8000/auction/auctions/create/",
// // //         auctionData
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error("Error creating auction:", error);
// // //       throw error;
// // //     }
// // //   },

// // //   // Join an auction room
// // //   joinAuction: async (roomId) => {
// // //     try {
// // //       const response = await axios.post(
// // //         `http://127.0.0.1:8000/auction/auctions/${roomId}/join/`
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error("Error joining auction:", error);
// // //       throw error;
// // //     }
// // //   },

// // //   // Place a bid
// // //   placeBid: async (roomId, amount) => {
// // //     try {
// // //       const response = await axios.post(
// // //         `http://127.0.0.1:8000/auction/auctions/${roomId}/bid/`,
// // //         { amount }
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error("Error placing bid:", error);
// // //       throw error;
// // //     }
// // //   },

// // //   // Get bids for a room
// // //   getBids: async (roomId) => {
// // //     try {
// // //       const response = await axios.get(
// // //         `http://127.0.0.1:8000/auction/auctions/${roomId}/bids/`
// // //       );
// // //       return response.data;
// // //     } catch (error) {
// // //       console.error("Error fetching bids:", error);
// // //       throw error;
// // //     }
// // //   },

// // //   // Get user's products using GraphQL
// // //   getUserProducts: async () => {
// // //     try {
// // //       const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// // //         },
// // //         body: JSON.stringify({
// // //           query: `
// // //             {
// // //               allProducts {
// // //                 id
// // //                 name
// // //                 description
// // //                 category {
// // //                   id
// // //                   name
// // //                 }
// // //                 productImage
// // //               }
// // //             }
// // //           `,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (data.errors) {
// // //         console.error("GraphQL errors:", data.errors);
// // //         throw new Error(data.errors[0].message);
// // //       }

// // //       console.log("API response for products:", data.data.allProducts);
// // //       return data.data.allProducts;
// // //     } catch (error) {
// // //       console.error("Error fetching products:", error);
// // //       throw error;
// // //     }
// // //   },
// // // };

// // // // Main Auction Page Component - For Brands (Bidders)
// // // const BrandAuctionPage = () => {
// // //   const [auctions, setAuctions] = useState([]);
// // //   const [filteredAuctions, setFilteredAuctions] = useState([]);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [sortBy, setSortBy] = useState("endingSoon");
// // //   const [selectedAuction, setSelectedAuction] = useState(null);
// // //   const [bidAmount, setBidAmount] = useState("");
// // //   const [timers, setTimers] = useState({});
// // //   const [bids, setBids] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [filters, setFilters] = useState({
// // //     priceRange: [0, 5000],
// // //     endingSoon: false,
// // //     highBids: false,
// // //   });

// // //   // Fetch auctions on component mount
// // //   useEffect(() => {
// // //     const fetchAuctions = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const data = await auctionService.getAuctions();

// // //         // Transform API data to match component structure
// // //         // Adapt this transformation to match your actual API response format
// // //         const transformedData = data.map((auction) => ({
// // //           id: auction.id,
// // //           title: auction.product?.name || "Unnamed Product",
// // //           description:
// // //             auction.product?.description || "No description available",
// // //           startingBid: parseFloat(auction.base_price),
// // //           currentBid: parseFloat(auction.current_price),
// // //           bids: auction.bids?.length || 0,
// // //           highestBidder: auction.winner?.username || "No bids yet",
// // //           image: auction.product?.image || "/api/placeholder/600/400",
// // //           endTime: new Date(auction.end_time),
// // //           startTime: new Date(auction.start_time),
// // //           status:
// // //             new Date() > new Date(auction.end_time)
// // //               ? "ended"
// // //               : new Date() < new Date(auction.start_time)
// // //               ? "upcoming"
// // //               : "active",
// // //         }));

// // //         setAuctions(transformedData);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError("Failed to load auctions. Please try again later.");
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAuctions();
// // //     // Set up a refresh interval (e.g., every 30 seconds)
// // //     const interval = setInterval(fetchAuctions, 30000);

// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   // Update auction timers
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       const updatedTimers = {};
// // //       auctions.forEach((auction) => {
// // //         const now = new Date();
// // //         let timeLeft;

// // //         if (now < auction.startTime) {
// // //           // Auction hasn't started yet
// // //           timeLeft = auction.startTime - now;
// // //           updatedTimers[auction.id] = {
// // //             display: `Starts in ${formatTimeLeft(timeLeft)}`,
// // //             type: "upcoming",
// // //           };
// // //         } else if (now > auction.endTime) {
// // //           // Auction has ended
// // //           updatedTimers[auction.id] = {
// // //             display: "Ended",
// // //             type: "ended",
// // //           };

// // //           // Auto-update auction status if needed
// // //           if (auction.status === "active") {
// // //             setAuctions((prev) =>
// // //               prev.map((a) =>
// // //                 a.id === auction.id ? { ...a, status: "ended" } : a
// // //               )
// // //             );
// // //           }
// // //         } else {
// // //           // Auction is active
// // //           timeLeft = auction.endTime - now;
// // //           updatedTimers[auction.id] = {
// // //             display: formatTimeLeft(timeLeft),
// // //             type: "active",
// // //           };
// // //         }
// // //       });
// // //       setTimers(updatedTimers);
// // //     }, 1000);

// // //     return () => clearInterval(interval);
// // //   }, [auctions]);

// // //   // Apply filters and sorting
// // //   useEffect(() => {
// // //     let result = [...auctions];

// // //     // Apply search filter
// // //     if (searchQuery) {
// // //       result = result.filter(
// // //         (auction) =>
// // //           auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //           auction.description.toLowerCase().includes(searchQuery.toLowerCase())
// // //       );
// // //     }

// // //     // Apply price range filter
// // //     result = result.filter(
// // //       (auction) =>
// // //         auction.currentBid >= filters.priceRange[0] &&
// // //         auction.currentBid <= filters.priceRange[1]
// // //     );

// // //     // Apply ending soon filter
// // //     if (filters.endingSoon) {
// // //       result = result.filter((auction) => {
// // //         const timeLeft = auction.endTime - new Date();
// // //         return timeLeft > 0 && timeLeft <= 3600000 * 12; // 12 hours or less
// // //       });
// // //     }

// // //     // Apply high bids filter
// // //     if (filters.highBids) {
// // //       result = result.filter((auction) => auction.bids >= 10);
// // //     }

// // //     // Apply sorting
// // //     switch (sortBy) {
// // //       case "endingSoon":
// // //         result.sort((a, b) => a.endTime - b.endTime);
// // //         break;
// // //       case "priceLowHigh":
// // //         result.sort((a, b) => a.currentBid - b.currentBid);
// // //         break;
// // //       case "priceHighLow":
// // //         result.sort((a, b) => b.currentBid - a.currentBid);
// // //         break;
// // //       case "mostBids":
// // //         result.sort((a, b) => b.bids - a.bids);
// // //         break;
// // //       default:
// // //         break;
// // //     }

// // //     setFilteredAuctions(result);
// // //   }, [auctions, searchQuery, sortBy, filters]);

// // //   const formatTimeLeft = (timeLeft) => {
// // //     const days = Math.floor(timeLeft / 86400000);
// // //     const hours = Math.floor((timeLeft % 86400000) / 3600000);
// // //     const minutes = Math.floor((timeLeft % 3600000) / 60000);
// // //     const seconds = Math.floor((timeLeft % 60000) / 1000);

// // //     if (days > 0) {
// // //       return `${days}d ${hours}h`;
// // //     } else if (hours > 0) {
// // //       return `${hours}h ${minutes}m`;
// // //     } else {
// // //       return `${minutes}m ${seconds}s`;
// // //     }
// // //   };

// // //   const openAuctionDetails = async (auction) => {
// // //     setSelectedAuction(auction);
// // //     setBidAmount((auction.currentBid + 5).toFixed(2)); // Default bid is $5 more than current bid

// // //     // Fetch bids for this auction
// // //     try {
// // //       const bidsData = await auctionService.getBids(auction.id);
// // //       setBids(bidsData);
// // //     } catch (err) {
// // //       console.error("Error fetching bids:", err);
// // //     }

// // //     // Join auction room (required before bidding)
// // //     try {
// // //       await auctionService.joinAuction(auction.id);
// // //     } catch (err) {
// // //       console.error("Error joining auction room:", err);
// // //     }
// // //   };

// // //   const closeAuctionDetails = () => {
// // //     setSelectedAuction(null);
// // //     setBidAmount("");
// // //     setBids([]);
// // //   };

// // //   const handleBid = async (auctionId) => {
// // //     if (!bidAmount || isNaN(parseFloat(bidAmount))) {
// // //       alert("Please enter a valid bid amount");
// // //       return;
// // //     }

// // //     const auction = auctions.find((a) => a.id === auctionId);
// // //     const bidValue = parseFloat(bidAmount);

// // //     if (bidValue <= auction.currentBid) {
// // //       alert("Your bid must be higher than the current bid");
// // //       return;
// // //     }

// // //     try {
// // //       // Send bid to API
// // //       const bidResponse = await auctionService.placeBid(auctionId, bidValue);

// // //       // Update auctions with the new bid
// // //       setAuctions((prev) =>
// // //         prev.map((a) =>
// // //           a.id === auctionId
// // //             ? {
// // //                 ...a,
// // //                 currentBid: bidValue,
// // //                 bids: a.bids + 1,
// // //                 highestBidder: "You", // In a real app, this would be updated from the response
// // //               }
// // //             : a
// // //         )
// // //       );

// // //       // Refresh bids list
// // //       const bidsData = await auctionService.getBids(auctionId);
// // //       setBids(bidsData);

// // //       setBidAmount("");
// // //       alert(`Your bid of $${bidValue.toFixed(2)} has been placed!`);
// // //     } catch (error) {
// // //       if (error.response && error.response.data) {
// // //         alert(`Error: ${error.response.data.error || "Failed to place bid"}`);
// // //       } else {
// // //         alert("Failed to place bid. Please try again.");
// // //       }
// // //     }
// // //   };

// // //   const handleFilterChange = (type, value) => {
// // //     setFilters((prev) => ({
// // //       ...prev,
// // //       [type]: value,
// // //     }));
// // //   };

// // //   const resetFilters = () => {
// // //     setFilters({
// // //       priceRange: [0, 5000],
// // //       endingSoon: false,
// // //       highBids: false,
// // //     });
// // //     setSearchQuery("");
// // //     setSortBy("endingSoon");
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
// // //         <span className="ml-2 text-gray-600">Loading auctions...</span>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="p-4 bg-red-50 text-red-800 rounded-lg">
// // //         <p>{error}</p>
// // //         <button
// // //           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // //           onClick={() => window.location.reload()}
// // //         >
// // //           Retry
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div>
// // //       {/* Page Title */}
// // //       <div className="mb-6">
// // //         <h2 className="text-xl font-medium text-gray-900">Fashion Auctions</h2>
// // //         <p className="text-gray-600 mt-1">
// // //           Bid on unique fashion items from small-scale businesses
// // //         </p>
// // //       </div>

// // //       {/* Search and Filter Bar */}
// // //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// // //         <div className="flex flex-col md:flex-row items-center gap-4">
// // //           {/* Search Box */}
// // //           <div className="relative w-full md:w-1/3">
// // //             <Search className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
// // //             <input
// // //               type="text"
// // //               placeholder="Search auctions..."
// // //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //             />
// // //           </div>

// // //           {/* Sort By */}
// // //           <div className="relative w-full md:w-auto">
// // //             <select
// // //               className="appearance-none pl-4 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //               value={sortBy}
// // //               onChange={(e) => setSortBy(e.target.value)}
// // //             >
// // //               <option value="endingSoon">Ending Soon</option>
// // //               <option value="priceLowHigh">Price: Low to High</option>
// // //               <option value="priceHighLow">Price: High to Low</option>
// // //               <option value="mostBids">Most Bids</option>
// // //             </select>
// // //             <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
// // //           </div>

// // //           {/* Filter Options */}
// // //           <div className="flex items-center space-x-4 w-full md:w-auto">
// // //             <label className="flex items-center text-sm text-gray-700">
// // //               <input
// // //                 type="checkbox"
// // //                 className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
// // //                 checked={filters.endingSoon}
// // //                 onChange={(e) =>
// // //                   handleFilterChange("endingSoon", e.target.checked)
// // //                 }
// // //               />
// // //               <span className="ml-2">Ending Soon</span>
// // //             </label>

// // //             <label className="flex items-center text-sm text-gray-700">
// // //               <input
// // //                 type="checkbox"
// // //                 className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
// // //                 checked={filters.highBids}
// // //                 onChange={(e) =>
// // //                   handleFilterChange("highBids", e.target.checked)
// // //                 }
// // //               />
// // //               <span className="ml-2">Hot Items (10+ bids)</span>
// // //             </label>
// // //           </div>

// // //           {/* Reset Filters */}
// // //           <button
// // //             className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
// // //             onClick={resetFilters}
// // //           >
// // //             Reset
// // //           </button>
// // //         </div>

// // //         {/* Price Range Filter */}
// // //         <div className="mt-4 px-2">
// // //           <div className="flex justify-between mb-2">
// // //             <span className="text-sm text-gray-600">Price Range</span>
// // //             <span className="text-sm font-medium">
// // //               ${filters.priceRange[0]} - ${filters.priceRange[1]}
// // //             </span>
// // //           </div>
// // //           <div className="flex space-x-4">
// // //             <input
// // //               type="range"
// // //               min="0"
// // //               max="5000"
// // //               step="50"
// // //               value={filters.priceRange[0]}
// // //               onChange={(e) =>
// // //                 handleFilterChange("priceRange", [
// // //                   parseInt(e.target.value),
// // //                   filters.priceRange[1],
// // //                 ])
// // //               }
// // //               className="w-1/2"
// // //             />
// // //             <input
// // //               type="range"
// // //               min="0"
// // //               max="5000"
// // //               step="50"
// // //               value={filters.priceRange[1]}
// // //               onChange={(e) =>
// // //                 handleFilterChange("priceRange", [
// // //                   filters.priceRange[0],
// // //                   parseInt(e.target.value),
// // //                 ])
// // //               }
// // //               className="w-1/2"
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Results Count */}
// // //       <div className="mb-6">
// // //         <p className="text-gray-600">
// // //           Showing {filteredAuctions.length}{" "}
// // //           {filteredAuctions.length === 1 ? "auction" : "auctions"}
// // //         </p>
// // //       </div>

// // //       {/* Auction Grid */}
// // //       {filteredAuctions.length > 0 ? (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredAuctions.map((auction) => (
// // //             <AuctionCard
// // //               key={auction.id}
// // //               auction={auction}
// // //               timeInfo={
// // //                 timers[auction.id] || { display: "Loading...", type: "loading" }
// // //               }
// // //               onClick={() => openAuctionDetails(auction)}
// // //             />
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12">
// // //           <p className="text-xl text-gray-600">No auctions found</p>
// // //           <p className="text-gray-500 mt-2">Try adjusting your filters</p>
// // //           <button
// // //             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // //             onClick={resetFilters}
// // //           >
// // //             Reset All Filters
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* Auction Details Modal */}
// // //       {selectedAuction && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
// // //             {/* Close Button */}
// // //             <div className="flex justify-end p-2">
// // //               <button
// // //                 onClick={closeAuctionDetails}
// // //                 className="p-2 rounded-full hover:bg-gray-100"
// // //               >
// // //                 <svg
// // //                   xmlns="http://www.w3.org/2000/svg"
// // //                   className="h-6 w-6 text-gray-500"
// // //                   fill="none"
// // //                   viewBox="0 0 24 24"
// // //                   stroke="currentColor"
// // //                 >
// // //                   <path
// // //                     strokeLinecap="round"
// // //                     strokeLinejoin="round"
// // //                     strokeWidth={2}
// // //                     d="M6 18L18 6M6 6l12 12"
// // //                   />
// // //                 </svg>
// // //               </button>
// // //             </div>

// // //             <div className="p-6">
// // //               <div className="flex flex-col md:flex-row gap-8">
// // //                 {/* Left: Image */}
// // //                 <div className="w-full md:w-1/2">
// // //                   <img
// // //                     src={selectedAuction.image}
// // //                     alt={selectedAuction.title}
// // //                     className="w-full h-auto rounded-lg"
// // //                   />

// // //                   {/* Auction Info Cards */}
// // //                   <div className="grid grid-cols-2 gap-4 mt-4">
// // //                     <div className="bg-gray-50 p-3 rounded-lg">
// // //                       <div className="flex items-center text-gray-600 mb-1">
// // //                         <Clock className="h-4 w-4 mr-2" />
// // //                         <span className="text-sm">Time Left</span>
// // //                       </div>
// // //                       <div className="font-medium text-lg">
// // //                         {timers[selectedAuction.id]?.display || "Loading..."}
// // //                       </div>
// // //                     </div>

// // //                     <div className="bg-gray-50 p-3 rounded-lg">
// // //                       <div className="flex items-center text-gray-600 mb-1">
// // //                         <User className="h-4 w-4 mr-2" />
// // //                         <span className="text-sm">Bids</span>
// // //                       </div>
// // //                       <div className="font-medium text-lg">
// // //                         {selectedAuction.bids}
// // //                       </div>
// // //                     </div>

// // //                     <div className="bg-gray-50 p-3 rounded-lg">
// // //                       <div className="flex items-center text-gray-600 mb-1">
// // //                         <Award className="h-4 w-4 mr-2" />
// // //                         <span className="text-sm">Starting Bid</span>
// // //                       </div>
// // //                       <div className="font-medium text-lg">
// // //                         ${selectedAuction.startingBid.toFixed(2)}
// // //                       </div>
// // //                     </div>

// // //                     <div className="bg-gray-50 p-3 rounded-lg">
// // //                       <div className="flex items-center text-gray-600 mb-1">
// // //                         <Calendar className="h-4 w-4 mr-2" />
// // //                         <span className="text-sm">End Date</span>
// // //                       </div>
// // //                       <div className="font-medium text-lg">
// // //                         {selectedAuction.endTime.toLocaleDateString()}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Right: Details */}
// // //                 <div className="w-full md:w-1/2">
// // //                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
// // //                     {selectedAuction.title}
// // //                   </h3>

// // //                   <div className="mb-6 text-gray-700">
// // //                     {selectedAuction.description}
// // //                   </div>

// // //                   <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
// // //                     <div className="flex justify-between items-center">
// // //                       <div>
// // //                         <span className="text-sm text-gray-600">
// // //                           Current Bid
// // //                         </span>
// // //                         <div className="text-3xl font-bold text-gray-900">
// // //                           ${selectedAuction.currentBid.toFixed(2)}
// // //                         </div>
// // //                       </div>
// // //                       <div className="text-right">
// // //                         <span className="text-sm text-gray-600">
// // //                           Highest Bidder
// // //                         </span>
// // //                         <div className="font-medium text-gray-900">
// // //                           {selectedAuction.highestBidder}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Bid Form */}
// // //                   {selectedAuction.status === "active" ? (
// // //                     <div>
// // //                       <div className="text-sm mb-1 text-gray-600">
// // //                         Enter your bid (USD)
// // //                       </div>
// // //                       <div className="flex items-center space-x-2 mb-4">
// // //                         <div className="relative flex-1">
// // //                           <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
// // //                           <input
// // //                             type="number"
// // //                             min={selectedAuction.currentBid + 0.01}
// // //                             step="0.01"
// // //                             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                             value={bidAmount}
// // //                             onChange={(e) => setBidAmount(e.target.value)}
// // //                             placeholder={`Min: $${(
// // //                               selectedAuction.currentBid + 0.01
// // //                             ).toFixed(2)}`}
// // //                           />
// // //                         </div>
// // //                         <button
// // //                           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // //                           onClick={() => handleBid(selectedAuction.id)}
// // //                         >
// // //                           Place Bid
// // //                         </button>
// // //                       </div>

// // //                       <div className="text-sm text-gray-600 flex items-start">
// // //                         <AlertCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
// // //                         <p>
// // //                           By placing a bid, you agree to our terms of service
// // //                           and commit to complete the transaction if you win.
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   ) : selectedAuction.status === "upcoming" ? (
// // //                     <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
// // //                       This auction hasn't started yet. It will begin on{" "}
// // //                       {selectedAuction.startTime.toLocaleString()}.
// // //                     </div>
// // //                   ) : (
// // //                     <div className="bg-red-50 text-red-800 p-4 rounded-lg">
// // //                       This auction has ended.
// // //                     </div>
// // //                   )}

// // //                   {/* Bid History */}
// // //                   <div className="mt-8">
// // //                     <h4 className="text-lg font-medium text-gray-900 mb-3">
// // //                       Bid History
// // //                     </h4>
// // //                     <div className="border rounded-lg divide-y">
// // //                       {bids.length > 0 ? (
// // //                         bids.map((bid, index) => (
// // //                           <div
// // //                             className="flex justify-between items-center p-3"
// // //                             key={index}
// // //                           >
// // //                             <div className="text-gray-600">
// // //                               {bid.bidder?.username || "Anonymous"}
// // //                             </div>
// // //                             <div className="text-gray-600">
// // //                               ${parseFloat(bid.amount).toFixed(2)}
// // //                             </div>
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <div className="p-3 text-center text-gray-500">
// // //                           No bids yet
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // Small-Scale Business Auction Management Component
// // // const SmallScaleAuctionPage = () => {
// // //   const [products, setProducts] = useState([]);
// // //   const [myAuctions, setMyAuctions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isCreatingAuction, setIsCreatingAuction] = useState(false);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);
// // //   const [formData, setFormData] = useState({
// // //     base_price: "",
// // //     start_time: "",
// // //     end_time: "",
// // //     increment: "100", // Default increment value
// // //   });

// // //   // Fetch products and auctions on component mount
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         // Fetch user's products using GraphQL
// // //         const productsData = await auctionService.getUserProducts();

// // //         // Transform GraphQL product data to match our component's expected format
// // //         const transformedProducts = productsData.map((product) => ({
// // //           id: product.id,
// // //           name: product.name,
// // //           description: product.description,
// // //           price: product.price || 0, // Default to 0 if price is not available
// // //           image: product.productImage || "/api/placeholder/400/300",
// // //           category: product.category?.name || "Uncategorized",
// // //         }));

// // //         setProducts(transformedProducts);

// // //         // Fetch auctions
// // //         const auctionsData = await auctionService.getAuctions();

// // //         // Get current user ID from localStorage
// // //         const currentUserId = localStorage.getItem("userId");

// // //         // Filter auctions to only show this user's auctions
// // //         // This filtering logic might need to be adjusted based on your API structure
// // //         const myAuctionsData = auctionsData.filter(
// // //           (auction) =>
// // //             auction.product && auction.product.owner_id === currentUserId
// // //         );

// // //         setMyAuctions(myAuctionsData);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         console.error("Error fetching data:", err);
// // //         setError("Failed to load data. Please try again later.");
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const handleCreateAuction = async (e) => {
// // //     e.preventDefault();

// // //     if (!selectedProduct) {
// // //       alert("Please select a product");
// // //       return;
// // //     }

// // //     try {
// // //       // Prepare auction data for the Django backend
// // //       const auctionData = {
// // //         product_id: selectedProduct.id,
// // //         base_price: parseFloat(formData.base_price),
// // //         start_time: new Date(formData.start_time).toISOString(),
// // //         end_time: new Date(formData.end_time).toISOString(),
// // //         increment: parseInt(formData.increment),
// // //       };

// // //       console.log("Creating auction with data:", auctionData);

// // //       // Use axios to create the auction
// // //       const response = await auctionService.createAuction(auctionData);
// // //       console.log("Auction created successfully:", response);

// // //       alert("Auction created successfully!");

// // //       // Refresh auctions
// // //       const auctionsData = await auctionService.getAuctions();
// // //       const currentUserId = localStorage.getItem("userId");
// // //       const myAuctionsData = auctionsData.filter(
// // //         (auction) =>
// // //           auction.product && auction.product.owner_id === currentUserId
// // //       );
// // //       setMyAuctions(myAuctionsData);

// // //       // Reset form
// // //       setIsCreatingAuction(false);
// // //       setSelectedProduct(null);
// // //       setFormData({
// // //         base_price: "",
// // //         start_time: "",
// // //         end_time: "",
// // //         increment: "100",
// // //       });
// // //     } catch (error) {
// // //       console.error("Error details:", error);
// // //       if (error.response && error.response.data) {
// // //         alert(
// // //           `Error: ${
// // //             error.response.data.error || JSON.stringify(error.response.data)
// // //           }`
// // //         );
// // //       } else {
// // //         alert("Failed to create auction. Please try again.");
// // //       }
// // //     }
// // //   };

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
// // //         <span className="ml-2 text-gray-600">Loading...</span>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="p-4 bg-red-50 text-red-800 rounded-lg">
// // //         <p>{error}</p>
// // //         <button
// // //           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // //           onClick={() => window.location.reload()}
// // //         >
// // //           Retry
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div>
// // //       {/* Page Title */}
// // //       <div className="mb-6 flex justify-between items-center">
// // //         <div>
// // //           <h2 className="text-xl font-medium text-gray-900">My Auctions</h2>
// // //           <p className="text-gray-600 mt-1">
// // //             Create and manage your product auctions
// // //           </p>
// // //         </div>

// // //         <button
// // //           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
// // //           onClick={() => setIsCreatingAuction(true)}
// // //         >
// // //           <Plus className="h-5 w-5 mr-2" />
// // //           Create New Auction
// // //         </button>
// // //       </div>

// // //       {/* My Auctions List */}
// // //       {myAuctions.length > 0 ? (
// // //         <div className="grid grid-cols-1 gap-4">
// // //           {myAuctions.map((auction) => (
// // //             <div
// // //               key={auction.id}
// // //               className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
// // //             >
// // //               <div className="flex flex-col md:flex-row items-center gap-4">
// // //                 <div className="w-full md:w-32 lg:w-48">
// // //                   <img
// // //                     src={auction.product?.image || "/api/placeholder/400/300"}
// // //                     alt={auction.product?.name || "Product"}
// // //                     className="w-full h-auto rounded-md"
// // //                   />
// // //                 </div>

// // //                 <div className="flex-1">
// // //                   <h3 className="text-lg font-medium text-gray-900">
// // //                     {auction.product?.name || "Unnamed Product"}
// // //                   </h3>
// // //                   <p className="text-gray-500 text-sm mb-2 line-clamp-1">
// // //                     {auction.product?.description || "No description"}
// // //                   </p>

// // //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
// // //                     <div>
// // //                       <div className="text-xs text-gray-500">Start Price</div>
// // //                       <div className="font-medium">
// // //                         ${parseFloat(auction.base_price).toFixed(2)}
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <div className="text-xs text-gray-500">Current Bid</div>
// // //                       <div className="font-medium">
// // //                         ${parseFloat(auction.current_price).toFixed(2)}
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <div className="text-xs text-gray-500">Bids</div>
// // //                       <div className="font-medium">
// // //                         {auction.bids?.length || 0}
// // //                       </div>
// // //                     </div>

// // //                     <div>
// // //                       <div className="text-xs text-gray-500">Status</div>
// // //                       <div className="font-medium">
// // //                         {new Date() > new Date(auction.end_time) ? (
// // //                           <span className="text-red-600">Ended</span>
// // //                         ) : new Date() < new Date(auction.start_time) ? (
// // //                           <span className="text-yellow-600">Upcoming</span>
// // //                         ) : (
// // //                           <span className="text-green-600">Active</span>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <div className="text-xs text-gray-500">
// // //                     <span>
// // //                       Starts: {new Date(auction.start_time).toLocaleString()}
// // //                     </span>
// // //                     <span className="mx-2">•</span>
// // //                     <span>
// // //                       Ends: {new Date(auction.end_time).toLocaleString()}
// // //                     </span>
// // //                   </div>
// // //                 </div>

// // //                 <div className="w-full md:w-auto flex flex-col gap-2">
// // //                   <button
// // //                     className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm w-full"
// // //                     onClick={() =>
// // //                       window.open(`/auction-details/${auction.id}`, "_blank")
// // //                     }
// // //                   >
// // //                     View Details
// // //                   </button>

// // //                   {new Date() < new Date(auction.start_time) && (
// // //                     <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm w-full">
// // //                       Cancel Auction
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="text-center py-12 bg-gray-50 rounded-lg">
// // //           <p className="text-xl text-gray-600">
// // //             You haven't created any auctions yet
// // //           </p>
// // //           <p className="text-gray-500 mt-2">
// // //             Start by creating your first auction
// // //           </p>
// // //           <button
// // //             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // //             onClick={() => setIsCreatingAuction(true)}
// // //           >
// // //             Create Auction
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* Create Auction Modal */}
// // //       {isCreatingAuction && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // //           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
// // //             <div className="flex justify-between items-center p-4 border-b">
// // //               <h3 className="text-lg font-medium text-gray-900">
// // //                 Create New Auction
// // //               </h3>
// // //               <button
// // //                 onClick={() => setIsCreatingAuction(false)}
// // //                 className="p-2 rounded-full hover:bg-gray-100"
// // //               >
// // //                 <svg
// // //                   xmlns="http://www.w3.org/2000/svg"
// // //                   className="h-6 w-6 text-gray-500"
// // //                   fill="none"
// // //                   viewBox="0 0 24 24"
// // //                   stroke="currentColor"
// // //                 >
// // //                   <path
// // //                     strokeLinecap="round"
// // //                     strokeLinejoin="round"
// // //                     strokeWidth={2}
// // //                     d="M6 18L18 6M6 6l12 12"
// // //                   />
// // //                 </svg>
// // //               </button>
// // //             </div>

// // //             <form onSubmit={handleCreateAuction} className="p-6">
// // //               {/* Select Product */}
// // //               <div className="mb-4">
// // //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                   Select Product
// // //                 </label>
// // //                 {products.length > 0 ? (
// // //                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// // //                     {products.map((product) => (
// // //                       <div
// // //                         key={product.id}
// // //                         className={`border rounded-lg p-2 cursor-pointer transition-colors ${
// // //                           selectedProduct?.id === product.id
// // //                             ? "border-indigo-600 bg-indigo-50"
// // //                             : "border-gray-200 hover:border-indigo-300"
// // //                         }`}
// // //                         onClick={() => setSelectedProduct(product)}
// // //                       >
// // //                         <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
// // //                           <img
// // //                             src={product.image || "/api/placeholder/200/200"}
// // //                             alt={product.name}
// // //                             className="w-full h-full object-cover"
// // //                           />
// // //                         </div>
// // //                         <div className="font-medium text-sm line-clamp-1">
// // //                           {product.name}
// // //                         </div>
// // //                         <div className="text-xs text-gray-500">
// // //                           {product.category}
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center py-4 bg-gray-50 rounded-lg">
// // //                     <p className="text-gray-600">No products available</p>
// // //                     <a
// // //                       href="/add-items"
// // //                       className="mt-2 inline-block text-indigo-600 hover:underline"
// // //                     >
// // //                       Add a product first
// // //                     </a>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* Auction Details */}
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                     Starting Bid (USD)
// // //                   </label>
// // //                   <div className="relative">
// // //                     <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
// // //                     <input
// // //                       type="number"
// // //                       name="base_price"
// // //                       min="0.01"
// // //                       step="0.01"
// // //                       required
// // //                       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                       value={formData.base_price}
// // //                       onChange={handleInputChange}
// // //                       placeholder="0.00"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                     Start Time
// // //                   </label>
// // //                   <input
// // //                     type="datetime-local"
// // //                     name="start_time"
// // //                     required
// // //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                     value={formData.start_time}
// // //                     onChange={handleInputChange}
// // //                     min={new Date().toISOString().slice(0, 16)}
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                     End Time
// // //                   </label>
// // //                   <input
// // //                     type="datetime-local"
// // //                     name="end_time"
// // //                     required
// // //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                     value={formData.end_time}
// // //                     onChange={handleInputChange}
// // //                     min={
// // //                       formData.start_time ||
// // //                       new Date().toISOString().slice(0, 16)
// // //                     }
// // //                   />
// // //                 </div>

// // //                 <div>
// // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                     Bid Increment (USD)
// // //                   </label>
// // //                   <input
// // //                     type="number"
// // //                     name="increment"
// // //                     min="1"
// // //                     step="1"
// // //                     required
// // //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //                     value={formData.increment}
// // //                     onChange={handleInputChange}
// // //                     placeholder="100"
// // //                   />
// // //                 </div>
// // //               </div>

// // //               {/* Submit Buttons */}
// // //               <div className="flex justify-end space-x-3">
// // //                 <button
// // //                   type="button"
// // //                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
// // //                   onClick={() => setIsCreatingAuction(false)}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   type="submit"
// // //                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // //                   disabled={
// // //                     !selectedProduct ||
// // //                     !formData.base_price ||
// // //                     !formData.start_time ||
// // //                     !formData.end_time
// // //                   }
// // //                 >
// // //                   Create Auction
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // Auction Card Component for brand view
// // // function AuctionCard({ auction, timeInfo, onClick }) {
// // //   return (
// // //     <div
// // //       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md cursor-pointer"
// // //       onClick={onClick}
// // //     >
// // //       {/* Auction Image */}
// // //       <div className="relative">
// // //         <img
// // //           src={auction.image}
// // //           alt={auction.title}
// // //           className="w-full h-48 object-cover"
// // //         />

// // //         {/* Time Left */}
// // //         <div
// // //           className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium flex items-center ${
// // //             timeInfo.type === "ended"
// // //               ? "bg-red-600 text-white"
// // //               : timeInfo.type === "upcoming"
// // //               ? "bg-yellow-500 text-white"
// // //               : "bg-black bg-opacity-70 text-white"
// // //           }`}
// // //         >
// // //           <Clock className="h-4 w-4 mr-1" />
// // //           {timeInfo.display}
// // //         </div>

// // //         {/* Auction Status Badge */}
// // //         {auction.status === "ended" && (
// // //           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
// // //             <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
// // //               Ended
// // //             </div>
// // //           </div>
// // //         )}

// // //         {auction.status === "upcoming" && (
// // //           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
// // //             <div className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
// // //               Coming Soon
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Auction Info */}
// // //       <div className="p-4">
// // //         <h3 className="text-gray-900 font-medium text-lg mb-1 line-clamp-1">
// // //           {auction.title}
// // //         </h3>
// // //         <p className="text-gray-600 text-sm mb-3 line-clamp-2">
// // //           {auction.description}
// // //         </p>

// // //         <div className="flex justify-between items-center">
// // //           <div>
// // //             <div className="text-xs text-gray-500">Current Bid</div>
// // //             <div className="text-xl font-bold text-gray-900">
// // //               ${auction.currentBid.toFixed(2)}
// // //             </div>
// // //           </div>

// // //           <div className="text-right">
// // //             <div className="text-xs text-gray-500">Bids</div>
// // //             <div className="flex items-center text-gray-900">
// // //               <User className="h-4 w-4 mr-1" />
// // //               {auction.bids}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Bid Button */}
// // //         <button
// // //           className={`w-full mt-4 py-2 rounded flex items-center justify-center transition-colors ${
// // //             auction.status === "active"
// // //               ? "bg-indigo-600 text-white hover:bg-indigo-700"
// // //               : "bg-gray-200 text-gray-600 cursor-default"
// // //           }`}
// // //           disabled={auction.status !== "active"}
// // //         >
// // //           <ArrowUpRight className="h-4 w-4 mr-2" />
// // //           {auction.status === "active"
// // //             ? "Place Bid"
// // //             : auction.status === "upcoming"
// // //             ? "Coming Soon"
// // //             : "Auction Ended"}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // Switch between the two views based on user role
// // // const AuctionPage = () => {
// // //   const [userRole, setUserRole] = useState("");

// // //   useEffect(() => {
// // //     // In a real app, you would get the user role from your auth context or API
// // //     // For demo purposes, we'll just check localStorage
// // //     const role = localStorage.getItem("userRole") || "brand";
// // //     setUserRole(role);
// // //   }, []);

// // //   // For demo purposes, let's add a role switcher
// // //   const toggleRole = () => {
// // //     const newRole = userRole === "small-scale" ? "brand" : "small-scale";
// // //     localStorage.setItem("userRole", newRole);
// // //     setUserRole(newRole);
// // //   };

// // //   return (
// // //     <div className="container mx-auto px-4 py-6">
// // //       {/* Role Switcher (for demo purposes) */}
// // //       <div className="mb-6 flex justify-end">
// // //         <button
// // //           onClick={toggleRole}
// // //           className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"
// // //         >
// // //           <RefreshCw className="h-4 w-4 mr-2" />
// // //           Switch to{" "}
// // //           {userRole === "small-scale" ? "Brand" : "Small-Scale Business"} View
// // //         </button>
// // //       </div>

// // //       {userRole === "small-scale" ? (
// // //         <SmallScaleAuctionPage />
// // //       ) : (
// // //         <BrandAuctionPage />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default AuctionPage;

// // import React, { useState, useEffect } from 'react';
// // import { Clock, ArrowUpRight, RefreshCw, Calendar, User, DollarSign, Award, AlertCircle, ChevronDown, ChevronUp, Search, Plus } from 'lucide-react';
// // import axios from 'axios';

// // // Configure axios with authentication token
// // axios.interceptors.request.use(
// //   config => {
// //     const token = localStorage.getItem('authToken');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   error => Promise.reject(error)
// // );

// // // Configure axios with authentication token
// // axios.interceptors.request.use(
// //   config => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   error => Promise.reject(error)
// // );

// // // API service for auction-related requests
// // const auctionService = {
// //   // Get all auction rooms
// //   getAuctions: async () => {
// //     try {
// //       const response = await axios.get('http://127.0.0.1:8000/auction/auctions/');
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching auctions:', error);
// //       throw error;
// //     }
// //   },

// //   // Create a new auction room
// //   createAuction: async (auctionData) => {
// //     try {
// //       const response = await axios.post('http://127.0.0.1:8000/auction/auctions/create/', auctionData);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error creating auction:', error);
// //       throw error;
// //     }
// //   },

// //   // Join an auction room
// //   joinAuction: async (roomId) => {
// //     try {
// //       const response = await axios.post(`http://127.0.0.1:8000/auction/auctions/${roomId}/join/`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error joining auction:', error);
// //       throw error;
// //     }
// //   },

// //   // Place a bid
// //   placeBid: async (roomId, amount) => {
// //     try {
// //       const response = await axios.post(`http://127.0.0.1:8000/auction/auctions/${roomId}/bid/`, { amount });
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error placing bid:', error);
// //       throw error;
// //     }
// //   },

// //   // Get bids for a room
// //   getBids: async (roomId) => {
// //     try {
// //       const response = await axios.get(`http://127.0.0.1:8000/auction/auctions/${roomId}/bids/`);
// //       return response.data;
// //     } catch (error) {
// //       console.error('Error fetching bids:', error);
// //       throw error;
// //     }
// //   },

// //   // Get user's products using GraphQL
// //   getUserProducts: async () => {
// //     try {
// //       const userId = localStorage.getItem('userId'); // Get the current user's ID

// //       const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${localStorage.getItem('token')}`,
// //         },
// //         body: JSON.stringify({
// //           query: `
// //             query GetUserProducts($ownerId: ID!) {
// //               allProducts(ownerId: $ownerId) {
// //                 id
// //                 name
// //                 description
// //                 category {
// //                   id
// //                   name
// //                 }
// //                 productImage
// //               }
// //             }
// //           `,
// //           variables: {
// //             ownerId: userId
// //           }
// //         }),
// //       });

// //       const data = await response.json();

// //       if (data.errors) {
// //         console.error('GraphQL errors:', data.errors);
// //         throw new Error(data.errors[0].message);
// //       }

// //       console.log('API response for products:', data.data.allProducts);
// //       return data.data.allProducts;
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //       throw error;
// //     }
// //   }
// // };

// // // Main Auction Page Component - For Brands (Bidders)
// // const BrandAuctionPage = () => {
// //   const [auctions, setAuctions] = useState([]);
// //   const [filteredAuctions, setFilteredAuctions] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [sortBy, setSortBy] = useState('endingSoon');
// //   const [selectedAuction, setSelectedAuction] = useState(null);
// //   const [bidAmount, setBidAmount] = useState('');
// //   const [timers, setTimers] = useState({});
// //   const [bids, setBids] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [filters, setFilters] = useState({
// //     priceRange: [0, 5000],
// //     endingSoon: false,
// //     highBids: false
// //   });

// //   // Fetch auctions on component mount
// //   useEffect(() => {
// //     const fetchAuctions = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await auctionService.getAuctions();

// //         // Transform API data to match component structure
// //         // Adapt this transformation to match your actual API response format
// //         const transformedData = data.map(auction => ({
// //           id: auction.id,
// //           title: auction.product?.name || 'Unnamed Product',
// //           description: auction.product?.description || 'No description available',
// //           startingBid: parseFloat(auction.base_price),
// //           currentBid: parseFloat(auction.current_price),
// //           bids: auction.bids?.length || 0,
// //           highestBidder: auction.winner?.username || 'No bids yet',
// //           image: auction.product?.image || "/api/placeholder/600/400",
// //           endTime: new Date(auction.end_time),
// //           startTime: new Date(auction.start_time),
// //           status: new Date() > new Date(auction.end_time) ? 'ended' :
// //                  new Date() < new Date(auction.start_time) ? 'upcoming' : 'active'
// //         }));

// //         setAuctions(transformedData);
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Failed to load auctions. Please try again later.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchAuctions();
// //     // Set up a refresh interval (e.g., every 30 seconds)
// //     const interval = setInterval(fetchAuctions, 30000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   // Update auction timers
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const updatedTimers = {};
// //       auctions.forEach(auction => {
// //         const now = new Date();
// //         let timeLeft;

// //         if (now < auction.startTime) {
// //           // Auction hasn't started yet
// //           timeLeft = auction.startTime - now;
// //           updatedTimers[auction.id] = {
// //             display: `Starts in ${formatTimeLeft(timeLeft)}`,
// //             type: 'upcoming'
// //           };
// //         } else if (now > auction.endTime) {
// //           // Auction has ended
// //           updatedTimers[auction.id] = {
// //             display: 'Ended',
// //             type: 'ended'
// //           };

// //           // Auto-update auction status if needed
// //           if (auction.status === 'active') {
// //             setAuctions(prev => prev.map(a =>
// //               a.id === auction.id ? {...a, status: 'ended'} : a
// //             ));
// //           }
// //         } else {
// //           // Auction is active
// //           timeLeft = auction.endTime - now;
// //           updatedTimers[auction.id] = {
// //             display: formatTimeLeft(timeLeft),
// //             type: 'active'
// //           };
// //         }
// //       });
// //       setTimers(updatedTimers);
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [auctions]);

// //   // Apply filters and sorting
// //   useEffect(() => {
// //     let result = [...auctions];

// //     // Apply search filter
// //     if (searchQuery) {
// //       result = result.filter(auction =>
// //         auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         auction.description.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     // Apply price range filter
// //     result = result.filter(auction =>
// //       auction.currentBid >= filters.priceRange[0] &&
// //       auction.currentBid <= filters.priceRange[1]
// //     );

// //     // Apply ending soon filter
// //     if (filters.endingSoon) {
// //       result = result.filter(auction => {
// //         const timeLeft = auction.endTime - new Date();
// //         return timeLeft > 0 && timeLeft <= 3600000 * 12; // 12 hours or less
// //       });
// //     }

// //     // Apply high bids filter
// //     if (filters.highBids) {
// //       result = result.filter(auction => auction.bids >= 10);
// //     }

// //     // Apply sorting
// //     switch (sortBy) {
// //       case 'endingSoon':
// //         result.sort((a, b) => a.endTime - b.endTime);
// //         break;
// //       case 'priceLowHigh':
// //         result.sort((a, b) => a.currentBid - b.currentBid);
// //         break;
// //       case 'priceHighLow':
// //         result.sort((a, b) => b.currentBid - a.currentBid);
// //         break;
// //       case 'mostBids':
// //         result.sort((a, b) => b.bids - a.bids);
// //         break;
// //       default:
// //         break;
// //     }

// //     setFilteredAuctions(result);
// //   }, [auctions, searchQuery, sortBy, filters]);

// //   const formatTimeLeft = (timeLeft) => {
// //     const days = Math.floor(timeLeft / 86400000);
// //     const hours = Math.floor((timeLeft % 86400000) / 3600000);
// //     const minutes = Math.floor((timeLeft % 3600000) / 60000);
// //     const seconds = Math.floor((timeLeft % 60000) / 1000);

// //     if (days > 0) {
// //       return `${days}d ${hours}h`;
// //     } else if (hours > 0) {
// //       return `${hours}h ${minutes}m`;
// //     } else {
// //       return `${minutes}m ${seconds}s`;
// //     }
// //   };

// //   const openAuctionDetails = async (auction) => {
// //     setSelectedAuction(auction);
// //     setBidAmount((auction.currentBid + 5).toFixed(2)); // Default bid is $5 more than current bid

// //     // Fetch bids for this auction
// //     try {
// //       const bidsData = await auctionService.getBids(auction.id);
// //       setBids(bidsData);
// //     } catch (err) {
// //       console.error('Error fetching bids:', err);
// //     }

// //     // Join auction room (required before bidding)
// //     try {
// //       await auctionService.joinAuction(auction.id);
// //     } catch (err) {
// //       console.error('Error joining auction room:', err);
// //     }
// //   };

// //   const closeAuctionDetails = () => {
// //     setSelectedAuction(null);
// //     setBidAmount('');
// //     setBids([]);
// //   };

// //   const handleBid = async (auctionId) => {
// //     if (!bidAmount || isNaN(parseFloat(bidAmount))) {
// //       alert('Please enter a valid bid amount');
// //       return;
// //     }

// //     const auction = auctions.find(a => a.id === auctionId);
// //     const bidValue = parseFloat(bidAmount);

// //     if (bidValue <= auction.currentBid) {
// //       alert('Your bid must be higher than the current bid');
// //       return;
// //     }

// //     try {
// //       // Send bid to API
// //       const bidResponse = await auctionService.placeBid(auctionId, bidValue);

// //       // Update auctions with the new bid
// //       setAuctions(prev => prev.map(a =>
// //         a.id === auctionId
// //           ? {
// //               ...a,
// //               currentBid: bidValue,
// //               bids: a.bids + 1,
// //               highestBidder: 'You' // In a real app, this would be updated from the response
// //             }
// //           : a
// //       ));

// //       // Refresh bids list
// //       const bidsData = await auctionService.getBids(auctionId);
// //       setBids(bidsData);

// //       setBidAmount('');
// //       alert(`Your bid of $${bidValue.toFixed(2)} has been placed!`);
// //     } catch (error) {
// //       if (error.response && error.response.data) {
// //         alert(`Error: ${error.response.data.error || 'Failed to place bid'}`);
// //       } else {
// //         alert('Failed to place bid. Please try again.');
// //       }
// //     }
// //   };

// //   const handleFilterChange = (type, value) => {
// //     setFilters(prev => ({
// //       ...prev,
// //       [type]: value
// //     }));
// //   };

// //   const resetFilters = () => {
// //     setFilters({
// //       priceRange: [0, 5000],
// //       endingSoon: false,
// //       highBids: false
// //     });
// //     setSearchQuery('');
// //     setSortBy('endingSoon');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
// //         <span className="ml-2 text-gray-600">Loading auctions...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-4 bg-red-50 text-red-800 rounded-lg">
// //         <p>{error}</p>
// //         <button
// //           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //           onClick={() => window.location.reload()}
// //         >
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       {/* Page Title */}
// //       <div className="mb-6">
// //         <h2 className="text-xl font-medium text-gray-900">Fashion Auctions</h2>
// //         <p className="text-gray-600 mt-1">
// //           Bid on unique fashion items from small-scale businesses
// //         </p>
// //       </div>

// //       {/* Search and Filter Bar */}
// //       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
// //         <div className="flex flex-col md:flex-row items-center gap-4">
// //           {/* Search Box */}
// //           <div className="relative w-full md:w-1/3">
// //             <Search className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
// //             <input
// //               type="text"
// //               placeholder="Search auctions..."
// //               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </div>

// //           {/* Sort By */}
// //           <div className="relative w-full md:w-auto">
// //             <select
// //               className="appearance-none pl-4 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               value={sortBy}
// //               onChange={(e) => setSortBy(e.target.value)}
// //             >
// //               <option value="endingSoon">Ending Soon</option>
// //               <option value="priceLowHigh">Price: Low to High</option>
// //               <option value="priceHighLow">Price: High to Low</option>
// //               <option value="mostBids">Most Bids</option>
// //             </select>
// //             <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
// //           </div>

// //           {/* Filter Options */}
// //           <div className="flex items-center space-x-4 w-full md:w-auto">
// //             <label className="flex items-center text-sm text-gray-700">
// //               <input
// //                 type="checkbox"
// //                 className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
// //                 checked={filters.endingSoon}
// //                 onChange={(e) => handleFilterChange('endingSoon', e.target.checked)}
// //               />
// //               <span className="ml-2">Ending Soon</span>
// //             </label>

// //             <label className="flex items-center text-sm text-gray-700">
// //               <input
// //                 type="checkbox"
// //                 className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
// //                 checked={filters.highBids}
// //                 onChange={(e) => handleFilterChange('highBids', e.target.checked)}
// //               />
// //               <span className="ml-2">Hot Items (10+ bids)</span>
// //             </label>
// //           </div>

// //           {/* Reset Filters */}
// //           <button
// //             className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
// //             onClick={resetFilters}
// //           >
// //             Reset
// //           </button>
// //         </div>

// //         {/* Price Range Filter */}
// //         <div className="mt-4 px-2">
// //           <div className="flex justify-between mb-2">
// //             <span className="text-sm text-gray-600">Price Range</span>
// //             <span className="text-sm font-medium">${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
// //           </div>
// //           <div className="flex space-x-4">
// //             <input
// //               type="range"
// //               min="0"
// //               max="5000"
// //               step="50"
// //               value={filters.priceRange[0]}
// //               onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
// //               className="w-1/2"
// //             />
// //             <input
// //               type="range"
// //               min="0"
// //               max="5000"
// //               step="50"
// //               value={filters.priceRange[1]}
// //               onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
// //               className="w-1/2"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Results Count */}
// //       <div className="mb-6">
// //         <p className="text-gray-600">
// //           Showing {filteredAuctions.length} {filteredAuctions.length === 1 ? 'auction' : 'auctions'}
// //         </p>
// //       </div>

// //       {/* Auction Grid */}
// //       {filteredAuctions.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredAuctions.map((auction) => (
// //             <AuctionCard
// //               key={auction.id}
// //               auction={auction}
// //               timeInfo={timers[auction.id] || { display: 'Loading...', type: 'loading' }}
// //               onClick={() => openAuctionDetails(auction)}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-center py-12">
// //           <p className="text-xl text-gray-600">No auctions found</p>
// //           <p className="text-gray-500 mt-2">Try adjusting your filters</p>
// //           <button
// //             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //             onClick={resetFilters}
// //           >
// //             Reset All Filters
// //           </button>
// //         </div>
// //       )}

// //       {/* Auction Details Modal */}
// //       {selectedAuction && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
// //             {/* Close Button */}
// //             <div className="flex justify-end p-2">
// //               <button
// //                 onClick={closeAuctionDetails}
// //                 className="p-2 rounded-full hover:bg-gray-100"
// //               >
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>

// //             <div className="p-6">
// //               <div className="flex flex-col md:flex-row gap-8">
// //                 {/* Left: Image */}
// //                 <div className="w-full md:w-1/2">
// //                   <img
// //                     src={selectedAuction.image}
// //                     alt={selectedAuction.title}
// //                     className="w-full h-auto rounded-lg"
// //                   />

// //                   {/* Auction Info Cards */}
// //                   <div className="grid grid-cols-2 gap-4 mt-4">
// //                     <div className="bg-gray-50 p-3 rounded-lg">
// //                       <div className="flex items-center text-gray-600 mb-1">
// //                         <Clock className="h-4 w-4 mr-2" />
// //                         <span className="text-sm">Time Left</span>
// //                       </div>
// //                       <div className="font-medium text-lg">
// //                         {timers[selectedAuction.id]?.display || 'Loading...'}
// //                       </div>
// //                     </div>

// //                     <div className="bg-gray-50 p-3 rounded-lg">
// //                       <div className="flex items-center text-gray-600 mb-1">
// //                         <User className="h-4 w-4 mr-2" />
// //                         <span className="text-sm">Bids</span>
// //                       </div>
// //                       <div className="font-medium text-lg">
// //                         {selectedAuction.bids}
// //                       </div>
// //                     </div>

// //                     <div className="bg-gray-50 p-3 rounded-lg">
// //                       <div className="flex items-center text-gray-600 mb-1">
// //                         <Award className="h-4 w-4 mr-2" />
// //                         <span className="text-sm">Starting Bid</span>
// //                       </div>
// //                       <div className="font-medium text-lg">
// //                         ${selectedAuction.startingBid.toFixed(2)}
// //                       </div>
// //                     </div>

// //                     <div className="bg-gray-50 p-3 rounded-lg">
// //                       <div className="flex items-center text-gray-600 mb-1">
// //                         <Calendar className="h-4 w-4 mr-2" />
// //                         <span className="text-sm">End Date</span>
// //                       </div>
// //                       <div className="font-medium text-lg">
// //                         {selectedAuction.endTime.toLocaleDateString()}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Right: Details */}
// //                 <div className="w-full md:w-1/2">
// //                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedAuction.title}</h3>

// //                   <div className="mb-6 text-gray-700">
// //                     {selectedAuction.description}
// //                   </div>

// //                   <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <span className="text-sm text-gray-600">Current Bid</span>
// //                         <div className="text-3xl font-bold text-gray-900">
// //                           ${selectedAuction.currentBid.toFixed(2)}
// //                         </div>
// //                       </div>
// //                       <div className="text-right">
// //                         <span className="text-sm text-gray-600">Highest Bidder</span>
// //                         <div className="font-medium text-gray-900">
// //                           {selectedAuction.highestBidder}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Bid Form */}
// //                   {selectedAuction.status === 'active' ? (
// //                     <div>
// //                       <div className="text-sm mb-1 text-gray-600">
// //                         Enter your bid (USD)
// //                       </div>
// //                       <div className="flex items-center space-x-2 mb-4">
// //                         <div className="relative flex-1">
// //                           <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
// //                           <input
// //                             type="number"
// //                             min={selectedAuction.currentBid + 0.01}
// //                             step="0.01"
// //                             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                             value={bidAmount}
// //                             onChange={(e) => setBidAmount(e.target.value)}
// //                             placeholder={`Min: $${(selectedAuction.currentBid + 0.01).toFixed(2)}`}
// //                           />
// //                         </div>
// //                         <button
// //                           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //                           onClick={() => handleBid(selectedAuction.id)}
// //                         >
// //                           Place Bid
// //                         </button>
// //                       </div>

// //                       <div className="text-sm text-gray-600 flex items-start">
// //                         <AlertCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
// //                         <p>
// //                           By placing a bid, you agree to our terms of service and commit to complete the transaction if you win.
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ) : selectedAuction.status === 'upcoming' ? (
// //                     <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
// //                       This auction hasn't started yet. It will begin on {selectedAuction.startTime.toLocaleString()}.
// //                     </div>
// //                   ) : (
// //                     <div className="bg-red-50 text-red-800 p-4 rounded-lg">
// //                       This auction has ended.
// //                     </div>
// //                   )}

// //                   {/* Bid History */}
// //                   <div className="mt-8">
// //                     <h4 className="text-lg font-medium text-gray-900 mb-3">Bid History</h4>
// //                     <div className="border rounded-lg divide-y">
// //                       {bids.length > 0 ? (
// //                         bids.map((bid, index) => (
// //                           <div className="flex justify-between items-center p-3" key={index}>
// //                             <div className="text-gray-600">
// //                               {bid.bidder?.username || 'Anonymous'}
// //                             </div>
// //                             <div className="text-gray-600">
// //                               ${parseFloat(bid.amount).toFixed(2)}
// //                             </div>
// //                           </div>
// //                         ))
// //                       ) : (
// //                         <div className="p-3 text-center text-gray-500">
// //                           No bids yet
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // Small-Scale Business Auction Management Component
// // const SmallScaleAuctionPage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [myAuctions, setMyAuctions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isCreatingAuction, setIsCreatingAuction] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [formData, setFormData] = useState({
// //     base_price: '',
// //     start_time: '',
// //     end_time: '',
// //     increment: '100',
// //     auction_type: 'open' // Updated default value to match your model
// //   });

// //   // Fetch products and auctions on component mount
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         // Fetch user's products using GraphQL
// //         const productsData = await auctionService.getUserProducts();

// //         // Transform GraphQL product data to match our component's expected format
// //         const transformedProducts = productsData.map(product => ({
// //           id: product.id,
// //           name: product.name,
// //           description: product.description,
// //           price: product.price || 0, // Default to 0 if price is not available
// //           image: product.productImage || "/api/placeholder/400/300",
// //           category: product.category?.name || "Uncategorized"
// //         }));

// //         setProducts(transformedProducts);

// //         // Fetch auctions
// //         const auctionsData = await auctionService.getAuctions();

// //         // Get current user ID from localStorage
// //         const currentUserId = localStorage.getItem('userId');

// //         // Filter auctions to only show this user's auctions
// //         // This filtering logic might need to be adjusted based on your API structure
// //         const myAuctionsData = auctionsData.filter(auction =>
// //           auction.product && auction.product.owner_id === currentUserId
// //         );

// //         setMyAuctions(myAuctionsData);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error('Error fetching data:', err);
// //         setError('Failed to load data. Please try again later.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleCreateAuction = async (e) => {
// //     e.preventDefault();

// //     if (!selectedProduct) {
// //       alert('Please select a product');
// //       return;
// //     }

// //     try {
// //       // Prepare auction data for the Django backend
// //       const auctionData = {
// //         product: selectedProduct.id, // Changed from product_id to product
// //         auction_type: formData.auction_type, // Added auction_type field
// //         base_price: parseFloat(formData.base_price),
// //         start_time: new Date(formData.start_time).toISOString(),
// //         end_time: new Date(formData.end_time).toISOString(),
// //         increment: parseInt(formData.increment)
// //       };

// //       console.log('Creating auction with data:', auctionData);

// //       // Use axios to create the auction
// //       const response = await auctionService.createAuction(auctionData);
// //       console.log('Auction created successfully:', response);

// //       alert('Auction created successfully!');

// //       // Refresh auctions
// //       const auctionsData = await auctionService.getAuctions();
// //       const currentUserId = localStorage.getItem('userId');
// //       const myAuctionsData = auctionsData.filter(auction =>
// //         auction.product && auction.product.owner_id === currentUserId
// //       );
// //       setMyAuctions(myAuctionsData);

// //       // Reset form
// //       setIsCreatingAuction(false);
// //       setSelectedProduct(null);
// //       setFormData({
// //         base_price: '',
// //         start_time: '',
// //         end_time: '',
// //         increment: '100',
// //         auction_type: 'open'
// //       });
// //     } catch (error) {
// //       console.error('Error details:', error);
// //       if (error.response && error.response.data) {
// //         alert(`Error: ${error.response.data.error || JSON.stringify(error.response.data)}`);
// //       } else {
// //         alert('Failed to create auction. Please try again.');
// //       }
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
// //         <span className="ml-2 text-gray-600">Loading...</span>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-4 bg-red-50 text-red-800 rounded-lg">
// //         <p>{error}</p>
// //         <button
// //           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //           onClick={() => window.location.reload()}
// //         >
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       {/* Page Title */}
// //       <div className="mb-6 flex justify-between items-center">
// //         <div>
// //           <h2 className="text-xl font-medium text-gray-900">My Auctions</h2>
// //           <p className="text-gray-600 mt-1">
// //             Create and manage your product auctions
// //           </p>
// //         </div>

// //         <button
// //           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
// //           onClick={() => setIsCreatingAuction(true)}
// //         >
// //           <Plus className="h-5 w-5 mr-2" />
// //           Create New Auction
// //         </button>
// //       </div>

// //       {/* My Auctions List */}
// //       {myAuctions.length > 0 ? (
// //         <div className="grid grid-cols-1 gap-4">
// //           {myAuctions.map((auction) => (
// //             <div key={auction.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
// //               <div className="flex flex-col md:flex-row items-center gap-4">
// //                 <div className="w-full md:w-32 lg:w-48">
// //                   <img
// //                     src={auction.product?.image || "/api/placeholder/400/300"}
// //                     alt={auction.product?.name || "Product"}
// //                     className="w-full h-auto rounded-md"
// //                   />
// //                 </div>

// //                 <div className="flex-1">
// //                   <h3 className="text-lg font-medium text-gray-900">{auction.product?.name || "Unnamed Product"}</h3>
// //                   <p className="text-gray-500 text-sm mb-2 line-clamp-1">{auction.product?.description || "No description"}</p>

// //                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
// //                     <div>
// //                       <div className="text-xs text-gray-500">Start Price</div>
// //                       <div className="font-medium">${parseFloat(auction.base_price).toFixed(2)}</div>
// //                     </div>

// //                     <div>
// //                       <div className="text-xs text-gray-500">Current Bid</div>
// //                       <div className="font-medium">${parseFloat(auction.current_price).toFixed(2)}</div>
// //                     </div>

// //                     <div>
// //                       <div className="text-xs text-gray-500">Bids</div>
// //                       <div className="font-medium">{auction.bids?.length || 0}</div>
// //                     </div>

// //                     <div>
// //                       <div className="text-xs text-gray-500">Status</div>
// //                       <div className="font-medium">
// //                         {new Date() > new Date(auction.end_time) ? (
// //                           <span className="text-red-600">Ended</span>
// //                         ) : new Date() < new Date(auction.start_time) ? (
// //                           <span className="text-yellow-600">Upcoming</span>
// //                         ) : (
// //                           <span className="text-green-600">Active</span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="text-xs text-gray-500">
// //                     <span>Starts: {new Date(auction.start_time).toLocaleString()}</span>
// //                     <span className="mx-2">•</span>
// //                     <span>Ends: {new Date(auction.end_time).toLocaleString()}</span>
// //                   </div>
// //                 </div>

// //                 <div className="w-full md:w-auto flex flex-col gap-2">
// //                   <button
// //                     className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm w-full"
// //                     onClick={() => window.open(`/auction-details/${auction.id}`, '_blank')}
// //                   >
// //                     View Details
// //                   </button>

// //                   {new Date() < new Date(auction.start_time) && (
// //                     <button
// //                       className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm w-full"
// //                     >
// //                       Cancel Auction
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-center py-12 bg-gray-50 rounded-lg">
// //           <p className="text-xl text-gray-600">You haven't created any auctions yet</p>
// //           <p className="text-gray-500 mt-2">Start by creating your first auction</p>
// //           <button
// //             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //             onClick={() => setIsCreatingAuction(true)}
// //           >
// //             Create Auction
// //           </button>
// //         </div>
// //       )}

// //       {/* Create Auction Modal */}
// //       {isCreatingAuction && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
// //             <div className="flex justify-between items-center p-4 border-b">
// //               <h3 className="text-lg font-medium text-gray-900">Create New Auction</h3>
// //               <button
// //                 onClick={() => setIsCreatingAuction(false)}
// //                 className="p-2 rounded-full hover:bg-gray-100"
// //               >
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>

// //             <form onSubmit={handleCreateAuction} className="p-6">
// //               {/* Select Product */}
// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Select Product
// //                 </label>
// //                 {products.length > 0 ? (
// //                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// //                     {products.map(product => (
// //                       <div
// //                         key={product.id}
// //                         className={`border rounded-lg p-2 cursor-pointer transition-colors ${
// //                           selectedProduct?.id === product.id
// //                             ? 'border-indigo-600 bg-indigo-50'
// //                             : 'border-gray-200 hover:border-indigo-300'
// //                         }`}
// //                         onClick={() => setSelectedProduct(product)}
// //                       >
// //                         <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
// //                           <img
// //                             src={product.image || "/api/placeholder/200/200"}
// //                             alt={product.name}
// //                             className="w-full h-full object-cover"
// //                           />
// //                         </div>
// //                         <div className="font-medium text-sm line-clamp-1">{product.name}</div>
// //                         <div className="text-xs text-gray-500">{product.category}</div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-4 bg-gray-50 rounded-lg">
// //                     <p className="text-gray-600">No products available</p>
// //                     <a
// //                       href="/add-items"
// //                       className="mt-2 inline-block text-indigo-600 hover:underline"
// //                     >
// //                       Add a product first
// //                     </a>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Auction Details */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Starting Bid (USD)
// //                   </label>
// //                   <div className="relative">
// //                     <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
// //                     <input
// //                       type="number"
// //                       name="base_price"
// //                       min="0.01"
// //                       step="0.01"
// //                       required
// //                       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                       value={formData.base_price}
// //                       onChange={handleInputChange}
// //                       placeholder="0.00"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Start Time
// //                   </label>
// //                   <input
// //                     type="datetime-local"
// //                     name="start_time"
// //                     required
// //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                     value={formData.start_time}
// //                     onChange={handleInputChange}
// //                     min={new Date().toISOString().slice(0, 16)}
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     End Time
// //                   </label>
// //                   <input
// //                     type="datetime-local"
// //                     name="end_time"
// //                     required
// //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                     value={formData.end_time}
// //                     onChange={handleInputChange}
// //                     min={formData.start_time || new Date().toISOString().slice(0, 16)}
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Bid Increment (USD)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     name="increment"
// //                     min="1"
// //                     step="1"
// //                     required
// //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                     value={formData.increment}
// //                     onChange={handleInputChange}
// //                     placeholder="100"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Auction Type
// //                   </label>
// //                   <select
// //                     name="auction_type"
// //                     required
// //                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                     value={formData.auction_type}
// //                     onChange={handleInputChange}
// //                   >
// //                     <option value="open">Open (All Buyers)</option>
// //                     <option value="brand_only">Brand Only</option>
// //                     <option value="wholesaler_only">Wholesaler Only</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Submit Buttons */}
// //               <div className="flex justify-end space-x-3">
// //                 <button
// //                   type="button"
// //                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
// //                   onClick={() => setIsCreatingAuction(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// //                   disabled={!selectedProduct || !formData.base_price || !formData.start_time || !formData.end_time}
// //                 >
// //                   Create Auction
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // Auction Card Component for brand view
// // function AuctionCard({ auction, timeInfo, onClick }) {
// //   return (
// //     <div
// //       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md cursor-pointer"
// //       onClick={onClick}
// //     >
// //       {/* Auction Image */}
// //       <div className="relative">
// //         <img
// //           src={auction.image}
// //           alt={auction.title}
// //           className="w-full h-48 object-cover"
// //         />

// //         {/* Time Left */}
// //         <div className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium flex items-center ${
// //           timeInfo.type === 'ended' ? 'bg-red-600 text-white' :
// //           timeInfo.type === 'upcoming' ? 'bg-yellow-500 text-white' :
// //           'bg-black bg-opacity-70 text-white'
// //         }`}>
// //           <Clock className="h-4 w-4 mr-1" />
// //           {timeInfo.display}
// //         </div>

// //         {/* Auction Status Badge */}
// //         {auction.status === 'ended' && (
// //           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //             <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
// //               Ended
// //             </div>
// //           </div>
// //         )}

// //         {auction.status === 'upcoming' && (
// //           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //             <div className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
// //               Coming Soon
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Auction Info */}
// //       <div className="p-4">
// //         <h3 className="text-gray-900 font-medium text-lg mb-1 line-clamp-1">{auction.title}</h3>
// //         <p className="text-gray-600 text-sm mb-3 line-clamp-2">{auction.description}</p>

// //         <div className="flex justify-between items-center">
// //           <div>
// //             <div className="text-xs text-gray-500">Current Bid</div>
// //             <div className="text-xl font-bold text-gray-900">${auction.currentBid.toFixed(2)}</div>
// //           </div>

// //           <div className="text-right">
// //             <div className="text-xs text-gray-500">Bids</div>
// //             <div className="flex items-center text-gray-900">
// //               <User className="h-4 w-4 mr-1" />
// //               {auction.bids}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bid Button */}
// //         <button
// //           className={`w-full mt-4 py-2 rounded flex items-center justify-center transition-colors ${
// //             auction.status === 'active'
// //               ? 'bg-indigo-600 text-white hover:bg-indigo-700'
// //               : 'bg-gray-200 text-gray-600 cursor-default'
// //           }`}
// //           disabled={auction.status !== 'active'}
// //         >
// //           <ArrowUpRight className="h-4 w-4 mr-2" />
// //           {auction.status === 'active' ? 'Place Bid' : auction.status === 'upcoming' ? 'Coming Soon' : 'Auction Ended'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // // Switch between the two views based on user role
// // const AuctionPage = () => {
// //   const [userRole, setUserRole] = useState('');

// //   useEffect(() => {
// //     // In a real app, you would get the user role from your auth context or API
// //     // For demo purposes, we'll just check localStorage
// //     const role = localStorage.getItem('userRole') || 'brand';
// //     setUserRole(role);
// //   }, []);

// //   // For demo purposes, let's add a role switcher
// //   const toggleRole = () => {
// //     const newRole = userRole === 'small-scale' ? 'brand' : 'small-scale';
// //     localStorage.setItem('userRole', newRole);
// //     setUserRole(newRole);
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-6">
// //       {/* Role Switcher (for demo purposes) */}
// //       <div className="mb-6 flex justify-end">
// //         <button
// //           onClick={toggleRole}
// //           className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"
// //         >
// //           <RefreshCw className="h-4 w-4 mr-2" />
// //           Switch to {userRole === 'small-scale' ? 'Brand' : 'Small-Scale Business'} View
// //         </button>
// //       </div>

// //       {userRole === 'small-scale' ? (
// //         <SmallScaleAuctionPage />
// //       ) : (
// //         <BrandAuctionPage />
// //       )}
// //     </div>
// //   );
// // };

// // export default AuctionPage;
// import React, { useState, useEffect } from "react";
// import {
//   Clock,
//   ArrowUpRight,
//   RefreshCw,
//   Calendar,
//   User,
//   DollarSign,
//   Award,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Search,
//   Plus,
// } from "lucide-react";
// import axios from "axios";

// // Configure axios with authentication token
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Configure axios with authentication token
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // API service for auction-related requests
// const auctionService = {
//   // Get all auction rooms
//   getAuctions: async () => {
//     try {
//       const response = await axios.get(
//         "http://127.0.0.1:8000/auction/auctions/"
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching auctions:", error);
//       throw error;
//     }
//   },

//   // Create a new auction room
//   createAuction: async (auctionData) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/auction/auctions/create/",
//         auctionData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating auction:", error);
//       throw error;
//     }
//   },

//   // Join an auction room
//   joinAuction: async (roomId) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/auction/auctions/${roomId}/join/`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error joining auction:", error);
//       throw error;
//     }
//   },

//   // Place a bid
//   placeBid: async (roomId, amount) => {
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:8000/auction/auctions/${roomId}/bid/`,
//         { amount }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error placing bid:", error);
//       throw error;
//     }
//   },

//   // Get bids for a room
//   getBids: async (roomId) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/auction/auctions/${roomId}/bids/`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching bids:", error);
//       throw error;
//     }
//   },

//   // Get user's products using GraphQL
//   getUserProducts: async () => {
//     try {
//       const userId = localStorage.getItem("userId"); // Get the current user's ID

//       // If userId is not available, throw an error
//       if (!userId) {
//         console.error("User ID not found in localStorage");
//         throw new Error("User ID not available");
//       }

//       // Since we're having issues with the productsByOwner query, go directly to allProducts
//       const response = await fetch(
//         import.meta.env.VITE_GRAPHQL_API || "http://127.0.0.1:8000/graphql/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({
//             query: `
//             {
//               allProducts {
//                 id
//                 name
//                 description
//                 category {
//                   id
//                   name
//                 }
//                 productImage
//                 isoCertificate
//               }
//             }
//           `,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (data.errors) {
//         console.error("GraphQL errors:", data.errors);
//         throw new Error(data.errors[0].message);
//       }

//       // For the initial version, we'll show all products since we can't filter by owner
//       // In a production environment, you would add server-side filtering
//       const allProducts = data.data?.allProducts || [];
//       console.log("All products:", allProducts);

//       // We have to use a hardcoded approach for demo purposes
//       // In production, you would implement proper owner filtering
//       // For now, we'll assume a subset of products belongs to the current user

//       // Option 1: For demo purposes, just return all products
//       return allProducts;

//       // Option 2: For demo purposes, take the first few products as "user's products"
//       // const userProducts = allProducts.slice(0, 3);
//       // return userProducts;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       // Return empty array to prevent UI from breaking
//       return [];
//     }
//   },
// };

// // Main Auction Page Component - For Brands (Bidders)
// const BrandAuctionPage = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [filteredAuctions, setFilteredAuctions] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("endingSoon");
//   const [selectedAuction, setSelectedAuction] = useState(null);
//   const [bidAmount, setBidAmount] = useState("");
//   const [timers, setTimers] = useState({});
//   const [bids, setBids] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     priceRange: [0, 5000],
//     endingSoon: false,
//     highBids: false,
//   });

//   // Fetch auctions on component mount
//   useEffect(() => {
//     const fetchAuctions = async () => {
//       try {
//         setLoading(true);
//         const data = await auctionService.getAuctions();

//         // Transform API data to match component structure
//         // Adapt this transformation to match your actual API response format
//         const transformedData = data.map((auction) => ({
//           id: auction.id,
//           title: auction.product?.name || "Unnamed Product",
//           description:
//             auction.product?.description || "No description available",
//           startingBid: parseFloat(auction.base_price),
//           currentBid: parseFloat(auction.current_price),
//           bids: auction.bids?.length || 0,
//           highestBidder: auction.winner?.username || "No bids yet",
//           image: auction.product?.image || "/api/placeholder/600/400",
//           endTime: new Date(auction.end_time),
//           startTime: new Date(auction.start_time),
//           status:
//             new Date() > new Date(auction.end_time)
//               ? "ended"
//               : new Date() < new Date(auction.start_time)
//               ? "upcoming"
//               : "active",
//         }));

//         setAuctions(transformedData);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load auctions. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchAuctions();
//     // Set up a refresh interval (e.g., every 30 seconds)
//     const interval = setInterval(fetchAuctions, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   // Update auction timers
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updatedTimers = {};
//       auctions.forEach((auction) => {
//         const now = new Date();
//         let timeLeft;

//         if (now < auction.startTime) {
//           // Auction hasn't started yet
//           timeLeft = auction.startTime - now;
//           updatedTimers[auction.id] = {
//             display: `Starts in ${formatTimeLeft(timeLeft)}`,
//             type: "upcoming",
//           };
//         } else if (now > auction.endTime) {
//           // Auction has ended
//           updatedTimers[auction.id] = {
//             display: "Ended",
//             type: "ended",
//           };

//           // Auto-update auction status if needed
//           if (auction.status === "active") {
//             setAuctions((prev) =>
//               prev.map((a) =>
//                 a.id === auction.id ? { ...a, status: "ended" } : a
//               )
//             );
//           }
//         } else {
//           // Auction is active
//           timeLeft = auction.endTime - now;
//           updatedTimers[auction.id] = {
//             display: formatTimeLeft(timeLeft),
//             type: "active",
//           };
//         }
//       });
//       setTimers(updatedTimers);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [auctions]);

//   // Apply filters and sorting
//   useEffect(() => {
//     let result = [...auctions];

//     // Apply search filter
//     if (searchQuery) {
//       result = result.filter(
//         (auction) =>
//           auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           auction.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply price range filter
//     result = result.filter(
//       (auction) =>
//         auction.currentBid >= filters.priceRange[0] &&
//         auction.currentBid <= filters.priceRange[1]
//     );

//     // Apply ending soon filter
//     if (filters.endingSoon) {
//       result = result.filter((auction) => {
//         const timeLeft = auction.endTime - new Date();
//         return timeLeft > 0 && timeLeft <= 3600000 * 12; // 12 hours or less
//       });
//     }

//     // Apply high bids filter
//     if (filters.highBids) {
//       result = result.filter((auction) => auction.bids >= 10);
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "endingSoon":
//         result.sort((a, b) => a.endTime - b.endTime);
//         break;
//       case "priceLowHigh":
//         result.sort((a, b) => a.currentBid - b.currentBid);
//         break;
//       case "priceHighLow":
//         result.sort((a, b) => b.currentBid - a.currentBid);
//         break;
//       case "mostBids":
//         result.sort((a, b) => b.bids - a.bids);
//         break;
//       default:
//         break;
//     }

//     setFilteredAuctions(result);
//   }, [auctions, searchQuery, sortBy, filters]);

//   const formatTimeLeft = (timeLeft) => {
//     const days = Math.floor(timeLeft / 86400000);
//     const hours = Math.floor((timeLeft % 86400000) / 3600000);
//     const minutes = Math.floor((timeLeft % 3600000) / 60000);
//     const seconds = Math.floor((timeLeft % 60000) / 1000);

//     if (days > 0) {
//       return `${days}d ${hours}h`;
//     } else if (hours > 0) {
//       return `${hours}h ${minutes}m`;
//     } else {
//       return `${minutes}m ${seconds}s`;
//     }
//   };

//   const openAuctionDetails = async (auction) => {
//     setSelectedAuction(auction);
//     setBidAmount((auction.currentBid + 5).toFixed(2)); // Default bid is $5 more than current bid

//     // Fetch bids for this auction
//     try {
//       const bidsData = await auctionService.getBids(auction.id);
//       setBids(bidsData);
//     } catch (err) {
//       console.error("Error fetching bids:", err);
//     }

//     // Join auction room (required before bidding)
//     try {
//       await auctionService.joinAuction(auction.id);
//     } catch (err) {
//       console.error("Error joining auction room:", err);
//     }
//   };

//   const closeAuctionDetails = () => {
//     setSelectedAuction(null);
//     setBidAmount("");
//     setBids([]);
//   };

//   const handleBid = async (auctionId) => {
//     if (!bidAmount || isNaN(parseFloat(bidAmount))) {
//       alert("Please enter a valid bid amount");
//       return;
//     }

//     const auction = auctions.find((a) => a.id === auctionId);
//     const bidValue = parseFloat(bidAmount);

//     if (bidValue <= auction.currentBid) {
//       alert("Your bid must be higher than the current bid");
//       return;
//     }

//     try {
//       // Send bid to API
//       const bidResponse = await auctionService.placeBid(auctionId, bidValue);

//       // Update auctions with the new bid
//       setAuctions((prev) =>
//         prev.map((a) =>
//           a.id === auctionId
//             ? {
//                 ...a,
//                 currentBid: bidValue,
//                 bids: a.bids + 1,
//                 highestBidder: "You", // In a real app, this would be updated from the response
//               }
//             : a
//         )
//       );

//       // Refresh bids list
//       const bidsData = await auctionService.getBids(auctionId);
//       setBids(bidsData);

//       setBidAmount("");
//       alert(`Your bid of $${bidValue.toFixed(2)} has been placed!`);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         alert(`Error: ${error.response.data.error || "Failed to place bid"}`);
//       } else {
//         alert("Failed to place bid. Please try again.");
//       }
//     }
//   };

//   const handleFilterChange = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       priceRange: [0, 5000],
//       endingSoon: false,
//       highBids: false,
//     });
//     setSearchQuery("");
//     setSortBy("endingSoon");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading auctions...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 text-red-800 rounded-lg">
//         <p>{error}</p>
//         <button
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Page Title */}
//       <div className="mb-6">
//         <h2 className="text-xl font-medium text-gray-900">Fashion Auctions</h2>
//         <p className="text-gray-600 mt-1">
//           Bid on unique fashion items from small-scale businesses
//         </p>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//         <div className="flex flex-col md:flex-row items-center gap-4">
//           {/* Search Box */}
//           <div className="relative w-full md:w-1/3">
//             <Search className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               placeholder="Search auctions..."
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {/* Sort By */}
//           <div className="relative w-full md:w-auto">
//             <select
//               className="appearance-none pl-4 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="endingSoon">Ending Soon</option>
//               <option value="priceLowHigh">Price: Low to High</option>
//               <option value="priceHighLow">Price: High to Low</option>
//               <option value="mostBids">Most Bids</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
//           </div>

//           {/* Filter Options */}
//           <div className="flex items-center space-x-4 w-full md:w-auto">
//             <label className="flex items-center text-sm text-gray-700">
//               <input
//                 type="checkbox"
//                 className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
//                 checked={filters.endingSoon}
//                 onChange={(e) =>
//                   handleFilterChange("endingSoon", e.target.checked)
//                 }
//               />
//               <span className="ml-2">Ending Soon</span>
//             </label>

//             <label className="flex items-center text-sm text-gray-700">
//               <input
//                 type="checkbox"
//                 className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
//                 checked={filters.highBids}
//                 onChange={(e) =>
//                   handleFilterChange("highBids", e.target.checked)
//                 }
//               />
//               <span className="ml-2">Hot Items (10+ bids)</span>
//             </label>
//           </div>

//           {/* Reset Filters */}
//           <button
//             className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
//             onClick={resetFilters}
//           >
//             Reset
//           </button>
//         </div>

//         {/* Price Range Filter */}
//         <div className="mt-4 px-2">
//           <div className="flex justify-between mb-2">
//             <span className="text-sm text-gray-600">Price Range</span>
//             <span className="text-sm font-medium">
//               ${filters.priceRange[0]} - ${filters.priceRange[1]}
//             </span>
//           </div>
//           <div className="flex space-x-4">
//             <input
//               type="range"
//               min="0"
//               max="5000"
//               step="50"
//               value={filters.priceRange[0]}
//               onChange={(e) =>
//                 handleFilterChange("priceRange", [
//                   parseInt(e.target.value),
//                   filters.priceRange[1],
//                 ])
//               }
//               className="w-1/2"
//             />
//             <input
//               type="range"
//               min="0"
//               max="5000"
//               step="50"
//               value={filters.priceRange[1]}
//               onChange={(e) =>
//                 handleFilterChange("priceRange", [
//                   filters.priceRange[0],
//                   parseInt(e.target.value),
//                 ])
//               }
//               className="w-1/2"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Showing {filteredAuctions.length}{" "}
//           {filteredAuctions.length === 1 ? "auction" : "auctions"}
//         </p>
//       </div>

//       {/* Auction Grid */}
//       {filteredAuctions.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredAuctions.map((auction) => (
//             <AuctionCard
//               key={auction.id}
//               auction={auction}
//               timeInfo={
//                 timers[auction.id] || { display: "Loading...", type: "loading" }
//               }
//               onClick={() => openAuctionDetails(auction)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-xl text-gray-600">No auctions found</p>
//           <p className="text-gray-500 mt-2">Try adjusting your filters</p>
//           <button
//             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//             onClick={resetFilters}
//           >
//             Reset All Filters
//           </button>
//         </div>
//       )}

//       {/* Auction Details Modal */}
//       {selectedAuction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
//             {/* Close Button */}
//             <div className="flex justify-end p-2">
//               <button
//                 onClick={closeAuctionDetails}
//                 className="p-2 rounded-full hover:bg-gray-100"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-gray-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-8">
//                 {/* Left: Image */}
//                 <div className="w-full md:w-1/2">
//                   <img
//                     src={selectedAuction.image}
//                     alt={selectedAuction.title}
//                     className="w-full h-auto rounded-lg"
//                   />

//                   {/* Auction Info Cards */}
//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center text-gray-600 mb-1">
//                         <Clock className="h-4 w-4 mr-2" />
//                         <span className="text-sm">Time Left</span>
//                       </div>
//                       <div className="font-medium text-lg">
//                         {timers[selectedAuction.id]?.display || "Loading..."}
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center text-gray-600 mb-1">
//                         <User className="h-4 w-4 mr-2" />
//                         <span className="text-sm">Bids</span>
//                       </div>
//                       <div className="font-medium text-lg">
//                         {selectedAuction.bids}
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center text-gray-600 mb-1">
//                         <Award className="h-4 w-4 mr-2" />
//                         <span className="text-sm">Starting Bid</span>
//                       </div>
//                       <div className="font-medium text-lg">
//                         ${selectedAuction.startingBid.toFixed(2)}
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center text-gray-600 mb-1">
//                         <Calendar className="h-4 w-4 mr-2" />
//                         <span className="text-sm">End Date</span>
//                       </div>
//                       <div className="font-medium text-lg">
//                         {selectedAuction.endTime.toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right: Details */}
//                 <div className="w-full md:w-1/2">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                     {selectedAuction.title}
//                   </h3>

//                   <div className="mb-6 text-gray-700">
//                     {selectedAuction.description}
//                   </div>

//                   <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <span className="text-sm text-gray-600">
//                           Current Bid
//                         </span>
//                         <div className="text-3xl font-bold text-gray-900">
//                           ${selectedAuction.currentBid.toFixed(2)}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <span className="text-sm text-gray-600">
//                           Highest Bidder
//                         </span>
//                         <div className="font-medium text-gray-900">
//                           {selectedAuction.highestBidder}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Bid Form */}
//                   {selectedAuction.status === "active" ? (
//                     <div>
//                       <div className="text-sm mb-1 text-gray-600">
//                         Enter your bid (USD)
//                       </div>
//                       <div className="flex items-center space-x-2 mb-4">
//                         <div className="relative flex-1">
//                           <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
//                           <input
//                             type="number"
//                             min={selectedAuction.currentBid + 0.01}
//                             step="0.01"
//                             className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             value={bidAmount}
//                             onChange={(e) => setBidAmount(e.target.value)}
//                             placeholder={`Min: $${(
//                               selectedAuction.currentBid + 0.01
//                             ).toFixed(2)}`}
//                           />
//                         </div>
//                         <button
//                           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//                           onClick={() => handleBid(selectedAuction.id)}
//                         >
//                           Place Bid
//                         </button>
//                       </div>

//                       <div className="text-sm text-gray-600 flex items-start">
//                         <AlertCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
//                         <p>
//                           By placing a bid, you agree to our terms of service
//                           and commit to complete the transaction if you win.
//                         </p>
//                       </div>
//                     </div>
//                   ) : selectedAuction.status === "upcoming" ? (
//                     <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
//                       This auction hasn't started yet. It will begin on{" "}
//                       {selectedAuction.startTime.toLocaleString()}.
//                     </div>
//                   ) : (
//                     <div className="bg-red-50 text-red-800 p-4 rounded-lg">
//                       This auction has ended.
//                     </div>
//                   )}

//                   {/* Bid History */}
//                   <div className="mt-8">
//                     <h4 className="text-lg font-medium text-gray-900 mb-3">
//                       Bid History
//                     </h4>
//                     <div className="border rounded-lg divide-y">
//                       {bids.length > 0 ? (
//                         bids.map((bid, index) => (
//                           <div
//                             className="flex justify-between items-center p-3"
//                             key={index}
//                           >
//                             <div className="text-gray-600">
//                               {bid.bidder?.username || "Anonymous"}
//                             </div>
//                             <div className="text-gray-600">
//                               ${parseFloat(bid.amount).toFixed(2)}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="p-3 text-center text-gray-500">
//                           No bids yet
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Small-Scale Business Auction Management Component
// const SmallScaleAuctionPage = () => {
//   const [products, setProducts] = useState([]);
//   const [myAuctions, setMyAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreatingAuction, setIsCreatingAuction] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productsLoading, setProductsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     base_price: "",
//     start_time: "",
//     end_time: "",
//     increment: "100",
//     auction_type: "open",
//   });

//   // Fetch auctions on component mount, but not products
//   useEffect(() => {
//     const fetchAuctionsOnly = async () => {
//       try {
//         setLoading(true);

//         // Fetch auctions
//         let auctionsData = [];
//         try {
//           auctionsData = await auctionService.getAuctions();
//         } catch (auctionError) {
//           console.error("Error fetching auctions:", auctionError);
//         }

//         // Get current user ID from localStorage
//         const currentUserId = localStorage.getItem("userId");

//         // Filter auctions to only show this user's auctions
//         const myAuctionsData = auctionsData.filter(
//           (auction) =>
//             auction.product && auction.product.owner_id === currentUserId
//         );

//         setMyAuctions(myAuctionsData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load auctions. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchAuctionsOnly();
//   }, []);

//   // Fetch products only when creating auction
//   const handleCreateAuctionClick = async () => {
//     setIsCreatingAuction(true);

//     // Only fetch products if they haven't been loaded yet
//     if (products.length === 0) {
//       try {
//         setProductsLoading(true);

//         // Fetch user's products using GraphQL
//         const productsData = await auctionService.getUserProducts();

//         // Transform GraphQL product data to match our component's expected format
//         const transformedProducts = productsData.map((product) => ({
//           id: product.id,
//           name: product.name,
//           description: product.description,
//           price: product.price || 0, // Default to 0 if price is not available
//           image: product.productImage || "/api/placeholder/400/300",
//           category: product.category?.name || "Uncategorized",
//         }));

//         setProducts(transformedProducts);
//         setProductsLoading(false);
//       } catch (productError) {
//         console.error("Error fetching products:", productError);
//         setProductsLoading(false);
//         // Continue with empty products list
//       }
//     }
//   };

//   const handleCreateAuction = async (e) => {
//     e.preventDefault();

//     if (!selectedProduct) {
//       alert("Please select a product");
//       return;
//     }

//     try {
//       // Prepare auction data for the Django backend
//       const auctionData = {
//         product: selectedProduct.id,
//         auction_type: formData.auction_type,
//         base_price: parseFloat(formData.base_price),
//         start_time: new Date(formData.start_time).toISOString(),
//         end_time: new Date(formData.end_time).toISOString(),
//         increment: parseInt(formData.increment),
//       };

//       console.log("Creating auction with data:", auctionData);

//       // Use axios to create the auction
//       const response = await auctionService.createAuction(auctionData);
//       console.log("Auction created successfully:", response);

//       alert("Auction created successfully!");

//       // Refresh auctions
//       const auctionsData = await auctionService.getAuctions();
//       const currentUserId = localStorage.getItem("userId");
//       const myAuctionsData = auctionsData.filter(
//         (auction) =>
//           auction.product && auction.product.owner_id === currentUserId
//       );
//       setMyAuctions(myAuctionsData);

//       // Reset form
//       setIsCreatingAuction(false);
//       setSelectedProduct(null);
//       setFormData({
//         base_price: "",
//         start_time: "",
//         end_time: "",
//         increment: "100",
//         auction_type: "open",
//       });
//     } catch (error) {
//       console.error("Error details:", error);
//       if (error.response && error.response.data) {
//         alert(
//           `Error: ${
//             error.response.data.error || JSON.stringify(error.response.data)
//           }`
//         );
//       } else {
//         alert("Failed to create auction. Please try again.");
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading auctions...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 text-red-800 rounded-lg">
//         <p>{error}</p>
//         <button
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Page Title */}
//       <div className="mb-6 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-medium text-gray-900">My Auctions</h2>
//           <p className="text-gray-600 mt-1">
//             Create and manage your product auctions
//           </p>
//         </div>

//         <button
//           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
//           onClick={handleCreateAuctionClick}
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Create New Auction
//         </button>
//       </div>

//       {/* My Auctions List */}
//       {myAuctions.length > 0 ? (
//         <div className="grid grid-cols-1 gap-4">
//           {myAuctions.map((auction) => (
//             <div
//               key={auction.id}
//               className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
//             >
//               <div className="flex flex-col md:flex-row items-center gap-4">
//                 <div className="w-full md:w-32 lg:w-48">
//                   <img
//                     src={auction.product?.image || "/api/placeholder/400/300"}
//                     alt={auction.product?.name || "Product"}
//                     className="w-full h-auto rounded-md"
//                   />
//                 </div>

//                 <div className="flex-1">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {auction.product?.name || "Unnamed Product"}
//                   </h3>
//                   <p className="text-gray-500 text-sm mb-2 line-clamp-1">
//                     {auction.product?.description || "No description"}
//                   </p>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
//                     <div>
//                       <div className="text-xs text-gray-500">Start Price</div>
//                       <div className="font-medium">
//                         ${parseFloat(auction.base_price).toFixed(2)}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-xs text-gray-500">Current Bid</div>
//                       <div className="font-medium">
//                         ${parseFloat(auction.current_price).toFixed(2)}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-xs text-gray-500">Bids</div>
//                       <div className="font-medium">
//                         {auction.bids?.length || 0}
//                       </div>
//                     </div>

//                     <div>
//                       <div className="text-xs text-gray-500">Status</div>
//                       <div className="font-medium">
//                         {new Date() > new Date(auction.end_time) ? (
//                           <span className="text-red-600">Ended</span>
//                         ) : new Date() < new Date(auction.start_time) ? (
//                           <span className="text-yellow-600">Upcoming</span>
//                         ) : (
//                           <span className="text-green-600">Active</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-xs text-gray-500">
//                     <span>
//                       Starts: {new Date(auction.start_time).toLocaleString()}
//                     </span>
//                     <span className="mx-2">•</span>
//                     <span>
//                       Ends: {new Date(auction.end_time).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="w-full md:w-auto flex flex-col gap-2">
//                   <button
//                     className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm w-full"
//                     onClick={() =>
//                       window.open(`/auction-details/${auction.id}`, "_blank")
//                     }
//                   >
//                     View Details
//                   </button>

//                   {new Date() < new Date(auction.start_time) && (
//                     <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm w-full">
//                       Cancel Auction
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <p className="text-xl text-gray-600">
//             You haven't created any auctions yet
//           </p>
//           <p className="text-gray-500 mt-2">
//             Start by creating your first auction
//           </p>
//           <button
//             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//             onClick={handleCreateAuctionClick}
//           >
//             Create Auction
//           </button>
//         </div>
//       )}

//       {/* Create Auction Modal */}
//       {isCreatingAuction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Create New Auction
//               </h3>
//               <button
//                 onClick={() => setIsCreatingAuction(false)}
//                 className="p-2 rounded-full hover:bg-gray-100"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-gray-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>

//             <form onSubmit={handleCreateAuction} className="p-6">
//               {/* Select Product */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Select Product
//                 </label>

//                 {productsLoading ? (
//                   <div className="flex justify-center items-center py-8">
//                     <RefreshCw className="h-6 w-6 text-indigo-600 animate-spin" />
//                     <span className="ml-2 text-gray-600">
//                       Loading products...
//                     </span>
//                   </div>
//                 ) : products.length > 0 ? (
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {products.map((product) => (
//                       <div
//                         key={product.id}
//                         className={`border rounded-lg p-2 cursor-pointer transition-colors ${
//                           selectedProduct?.id === product.id
//                             ? "border-indigo-600 bg-indigo-50"
//                             : "border-gray-200 hover:border-indigo-300"
//                         }`}
//                         onClick={() => setSelectedProduct(product)}
//                       >
//                         <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
//                           <img
//                             src={product.image || "/api/placeholder/200/200"}
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div className="font-medium text-sm line-clamp-1">
//                           {product.name}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {product.category}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-4 bg-gray-50 rounded-lg">
//                     <p className="text-gray-600">No products available</p>
//                     <a
//                       href="/add-items"
//                       className="mt-2 inline-block text-indigo-600 hover:underline"
//                     >
//                       Add a product first
//                     </a>
//                   </div>
//                 )}
//               </div>

//               {/* Auction Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Starting Bid (USD)
//                   </label>
//                   <div className="relative">
//                     <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
//                     <input
//                       type="number"
//                       name="base_price"
//                       min="0.01"
//                       step="0.01"
//                       required
//                       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       value={formData.base_price}
//                       onChange={handleInputChange}
//                       placeholder="0.00"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="start_time"
//                     required
//                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     value={formData.start_time}
//                     onChange={handleInputChange}
//                     min={new Date().toISOString().slice(0, 16)}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Time
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="end_time"
//                     required
//                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     value={formData.end_time}
//                     onChange={handleInputChange}
//                     min={
//                       formData.start_time ||
//                       new Date().toISOString().slice(0, 16)
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Bid Increment (USD)
//                   </label>
//                   <input
//                     type="number"
//                     name="increment"
//                     min="1"
//                     step="1"
//                     required
//                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     value={formData.increment}
//                     onChange={handleInputChange}
//                     placeholder="100"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Auction Type
//                   </label>
//                   <select
//                     name="auction_type"
//                     required
//                     className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     value={formData.auction_type}
//                     onChange={handleInputChange}
//                   >
//                     <option value="open">Open (All Buyers)</option>
//                     <option value="brand_only">Brand Only</option>
//                     <option value="wholesaler_only">Wholesaler Only</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Submit Buttons */}
//               <div className="flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
//                   onClick={() => setIsCreatingAuction(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//                   disabled={
//                     productsLoading ||
//                     !selectedProduct ||
//                     !formData.base_price ||
//                     !formData.start_time ||
//                     !formData.end_time
//                   }
//                 >
//                   {productsLoading ? (
//                     <span className="flex items-center">
//                       <RefreshCw className="animate-spin h-4 w-4 mr-2" />
//                       Loading...
//                     </span>
//                   ) : (
//                     "Create Auction"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Auction Card Component for brand view
// function AuctionCard({ auction, timeInfo, onClick }) {
//   return (
//     <div
//       className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md cursor-pointer"
//       onClick={onClick}
//     >
//       {/* Auction Image */}
//       <div className="relative">
//         <img
//           src={auction.image}
//           alt={auction.title}
//           className="w-full h-48 object-cover"
//         />

//         {/* Time Left */}
//         <div
//           className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium flex items-center ${
//             timeInfo.type === "ended"
//               ? "bg-red-600 text-white"
//               : timeInfo.type === "upcoming"
//               ? "bg-yellow-500 text-white"
//               : "bg-black bg-opacity-70 text-white"
//           }`}
//         >
//           <Clock className="h-4 w-4 mr-1" />
//           {timeInfo.display}
//         </div>

//         {/* Auction Status Badge */}
//         {auction.status === "ended" && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
//               Ended
//             </div>
//           </div>
//         )}

//         {auction.status === "upcoming" && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
//               Coming Soon
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Auction Info */}
//       <div className="p-4">
//         <h3 className="text-gray-900 font-medium text-lg mb-1 line-clamp-1">
//           {auction.title}
//         </h3>
//         <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//           {auction.description}
//         </p>

//         <div className="flex justify-between items-center">
//           <div>
//             <div className="text-xs text-gray-500">Current Bid</div>
//             <div className="text-xl font-bold text-gray-900">
//               ${auction.currentBid.toFixed(2)}
//             </div>
//           </div>

//           <div className="text-right">
//             <div className="text-xs text-gray-500">Bids</div>
//             <div className="flex items-center text-gray-900">
//               <User className="h-4 w-4 mr-1" />
//               {auction.bids}
//             </div>
//           </div>
//         </div>

//         {/* Bid Button */}
//         <button
//           className={`w-full mt-4 py-2 rounded flex items-center justify-center transition-colors ${
//             auction.status === "active"
//               ? "bg-indigo-600 text-white hover:bg-indigo-700"
//               : "bg-gray-200 text-gray-600 cursor-default"
//           }`}
//           disabled={auction.status !== "active"}
//         >
//           <ArrowUpRight className="h-4 w-4 mr-2" />
//           {auction.status === "active"
//             ? "Place Bid"
//             : auction.status === "upcoming"
//             ? "Coming Soon"
//             : "Auction Ended"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // Switch between the two views based on user role
// const AuctionPage = () => {
//   const [userRole, setUserRole] = useState("");

//   useEffect(() => {
//     // In a real app, you would get the user role from your auth context or API
//     // For demo purposes, we'll just check localStorage
//     const role = localStorage.getItem("userRole") || "brand";
//     setUserRole(role);
//   }, []);

//   // For demo purposes, let's add a role switcher
//   const toggleRole = () => {
//     const newRole = userRole === "small-scale" ? "brand" : "small-scale";
//     localStorage.setItem("userRole", newRole);
//     setUserRole(newRole);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Role Switcher (for demo purposes) */}
//       <div className="mb-6 flex justify-end">
//         <button
//           onClick={toggleRole}
//           className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"
//         >
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Switch to{" "}
//           {userRole === "small-scale" ? "Brand" : "Small-Scale Business"} View
//         </button>
//       </div>

//       {userRole === "small-scale" ? (
//         <SmallScaleAuctionPage />
//       ) : (
//         <BrandAuctionPage />
//       )}
//     </div>
//   );
// };

// export default AuctionPage;

import React, { useState, useEffect } from "react";
import {
  Clock,
  ArrowUpRight,
  RefreshCw,
  Calendar,
  User,
  DollarSign,
  Award,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
} from "lucide-react";
import axios from "axios";

// Configure axios with authentication token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Configure axios with authentication token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service for auction-related requests
const auctionService = {
  // Get all auction rooms
  getAuctions: async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/auction/auctions/"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching auctions:", error);
      throw error;
    }
  },

  // Create a new auction room
  createAuction: async (auctionData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auction/auctions/create/",
        auctionData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating auction:", error);
      throw error;
    }
  },

  // Join an auction room
  joinAuction: async (roomId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auction/auctions/${roomId}/join/`,
        {}, // must pass empty body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error joining auction:", error);
      throw error;
    }
  },

  // Place a bid
  placeBid: async (roomId, amount) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auction/auctions/${roomId}/bid/`,
        { amount }
      );
      return response.data;
    } catch (error) {
      console.error("Error placing bid:", error);
      throw error;
    }
  },

  // Get bids for a room
  getBids: async (roomId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/auction/auctions/${roomId}/bids/`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching bids:", error);
      throw error;
    }
  },

  // Get user's products using GraphQL
  getUserProducts: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_GRAPHQL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          query: `
            {
              allProducts {
                id
                name
                description
                category {
                  id
                  name
                }
                productImage
              }
            }
          `,
        }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        throw new Error(data.errors[0].message);
      }

      console.log("API response for products:", data.data.allProducts);
      return data.data.allProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};

// Main Auction Page Component - For Brands (Bidders)
const BrandAuctionPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("endingSoon");
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [timers, setTimers] = useState({});
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    endingSoon: false,
    highBids: false,
  });

  // Fetch auctions on component mount
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const data = await auctionService.getAuctions();

        // Transform API data to match component structure
        // Adapt this transformation to match your actual API response format
        const transformedData = data.map((auction) => ({
          id: auction.id,
          title: auction.product?.name || "Unnamed Product",
          description:
            auction.product?.description || "No description available",
          startingBid: parseFloat(auction.base_price),
          currentBid: parseFloat(auction.current_price),
          bids: auction.bids?.length || 0,
          highestBidder: auction.winner?.username || "No bids yet",
          image: auction.product?.image || "/api/placeholder/600/400",
          endTime: new Date(auction.end_time),
          startTime: new Date(auction.start_time),
          status:
            new Date() > new Date(auction.end_time)
              ? "ended"
              : new Date() < new Date(auction.start_time)
              ? "upcoming"
              : "active",
        }));

        setAuctions(transformedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load auctions. Please try again later.");
        setLoading(false);
      }
    };

    fetchAuctions();
    // Set up a refresh interval (e.g., every 30 seconds)
    const interval = setInterval(fetchAuctions, 30000);

    return () => clearInterval(interval);
  }, []);

  // Update auction timers
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      auctions.forEach((auction) => {
        const now = new Date();
        let timeLeft;

        if (now < auction.startTime) {
          // Auction hasn't started yet
          timeLeft = auction.startTime - now;
          updatedTimers[auction.id] = {
            display: `Starts in ${formatTimeLeft(timeLeft)}`,
            type: "upcoming",
          };
        } else if (now > auction.endTime) {
          // Auction has ended
          updatedTimers[auction.id] = {
            display: "Ended",
            type: "ended",
          };

          // Auto-update auction status if needed
          if (auction.status === "active") {
            setAuctions((prev) =>
              prev.map((a) =>
                a.id === auction.id ? { ...a, status: "ended" } : a
              )
            );
          }
        } else {
          // Auction is active
          timeLeft = auction.endTime - now;
          updatedTimers[auction.id] = {
            display: formatTimeLeft(timeLeft),
            type: "active",
          };
        }
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...auctions];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (auction) =>
          auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          auction.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(
      (auction) =>
        auction.currentBid >= filters.priceRange[0] &&
        auction.currentBid <= filters.priceRange[1]
    );

    // Apply ending soon filter
    if (filters.endingSoon) {
      result = result.filter((auction) => {
        const timeLeft = auction.endTime - new Date();
        return timeLeft > 0 && timeLeft <= 3600000 * 12; // 12 hours or less
      });
    }

    // Apply high bids filter
    if (filters.highBids) {
      result = result.filter((auction) => auction.bids >= 10);
    }

    // Apply sorting
    switch (sortBy) {
      case "endingSoon":
        result.sort((a, b) => a.endTime - b.endTime);
        break;
      case "priceLowHigh":
        result.sort((a, b) => a.currentBid - b.currentBid);
        break;
      case "priceHighLow":
        result.sort((a, b) => b.currentBid - a.currentBid);
        break;
      case "mostBids":
        result.sort((a, b) => b.bids - a.bids);
        break;
      default:
        break;
    }

    setFilteredAuctions(result);
  }, [auctions, searchQuery, sortBy, filters]);

  const formatTimeLeft = (timeLeft) => {
    const days = Math.floor(timeLeft / 86400000);
    const hours = Math.floor((timeLeft % 86400000) / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m ${seconds}s`;
    }
  };

  const openAuctionDetails = async (auction) => {
    setSelectedAuction(auction);
    setBidAmount((auction.currentBid + 5).toFixed(2)); // Default bid is $5 more than current bid

    // Fetch bids for this auction
    try {
      const bidsData = await auctionService.getBids(auction.id);
      setBids(bidsData);
    } catch (err) {
      console.error("Error fetching bids:", err);
    }

    // Join auction room (required before bidding)
    try {
      await auctionService.joinAuction(auction.id);
    } catch (err) {
      console.error("Error joining auction room:", err);
    }
  };

  const closeAuctionDetails = () => {
    setSelectedAuction(null);
    setBidAmount("");
    setBids([]);
  };

  const handleBid = async (auctionId) => {
    if (!bidAmount || isNaN(parseFloat(bidAmount))) {
      alert("Please enter a valid bid amount");
      return;
    }

    const auction = auctions.find((a) => a.id === auctionId);
    const bidValue = parseFloat(bidAmount);

    if (bidValue <= auction.currentBid) {
      alert("Your bid must be higher than the current bid");
      return;
    }

    try {
      // Send bid to API
      const bidResponse = await auctionService.placeBid(auctionId, bidValue);

      // Update auctions with the new bid
      setAuctions((prev) =>
        prev.map((a) =>
          a.id === auctionId
            ? {
                ...a,
                currentBid: bidValue,
                bids: a.bids + 1,
                highestBidder: "You", // In a real app, this would be updated from the response
              }
            : a
        )
      );

      // Refresh bids list
      const bidsData = await auctionService.getBids(auctionId);
      setBids(bidsData);

      setBidAmount("");
      alert(`Your bid of $${bidValue.toFixed(2)} has been placed!`);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.error || "Failed to place bid"}`);
      } else {
        alert("Failed to place bid. Please try again.");
      }
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      endingSoon: false,
      highBids: false,
    });
    setSearchQuery("");
    setSortBy("endingSoon");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading auctions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-lg">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-900">Fashion Auctions</h2>
        <p className="text-gray-600 mt-1">
          Bid on unique fashion items from small-scale businesses
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search auctions..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort By */}
          <div className="relative w-full md:w-auto">
            <select
              className="appearance-none pl-4 pr-10 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="endingSoon">Ending Soon</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="mostBids">Most Bids</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
          </div>

          {/* Filter Options */}
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                checked={filters.endingSoon}
                onChange={(e) =>
                  handleFilterChange("endingSoon", e.target.checked)
                }
              />
              <span className="ml-2">Ending Soon</span>
            </label>

            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                checked={filters.highBids}
                onChange={(e) =>
                  handleFilterChange("highBids", e.target.checked)
                }
              />
              <span className="ml-2">Hot Items (10+ bids)</span>
            </label>
          </div>

          {/* Reset Filters */}
          <button
            className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        {/* Price Range Filter */}
        <div className="mt-4 px-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Price Range</span>
            <span className="text-sm font-medium">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </span>
          </div>
          <div className="flex space-x-4">
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  parseInt(e.target.value),
                  filters.priceRange[1],
                ])
              }
              className="w-1/2"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  filters.priceRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredAuctions.length}{" "}
          {filteredAuctions.length === 1 ? "auction" : "auctions"}
        </p>
      </div>

      {/* Auction Grid */}
      {filteredAuctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              auction={auction}
              timeInfo={
                timers[auction.id] || { display: "Loading...", type: "loading" }
              }
              onClick={() => openAuctionDetails(auction)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No auctions found</p>
          <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Auction Details Modal */}
      {selectedAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
            {/* Close Button */}
            <div className="flex justify-end p-2">
              <button
                onClick={closeAuctionDetails}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={selectedAuction.image}
                    alt={selectedAuction.title}
                    className="w-full h-auto rounded-lg"
                  />

                  {/* Auction Info Cards */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Time Left</span>
                      </div>
                      <div className="font-medium text-lg">
                        {timers[selectedAuction.id]?.display || "Loading..."}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <User className="h-4 w-4 mr-2" />
                        <span className="text-sm">Bids</span>
                      </div>
                      <div className="font-medium text-lg">
                        {selectedAuction.bids}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Award className="h-4 w-4 mr-2" />
                        <span className="text-sm">Starting Bid</span>
                      </div>
                      <div className="font-medium text-lg">
                        ${selectedAuction.startingBid.toFixed(2)}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">End Date</span>
                      </div>
                      <div className="font-medium text-lg">
                        {selectedAuction.endTime.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedAuction.title}
                  </h3>

                  <div className="mb-6 text-gray-700">
                    {selectedAuction.description}
                  </div>

                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">
                          Current Bid
                        </span>
                        <div className="text-3xl font-bold text-gray-900">
                          ${selectedAuction.currentBid.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">
                          Highest Bidder
                        </span>
                        <div className="font-medium text-gray-900">
                          {selectedAuction.highestBidder}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bid Form */}
                  {selectedAuction.status === "active" ? (
                    <div>
                      <div className="text-sm mb-1 text-gray-600">
                        Enter your bid (USD)
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="relative flex-1">
                          <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
                          <input
                            type="number"
                            min={selectedAuction.currentBid + 0.01}
                            step="0.01"
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder={`Min: $${(
                              selectedAuction.currentBid + 0.01
                            ).toFixed(2)}`}
                          />
                        </div>
                        <button
                          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                          onClick={() => handleBid(selectedAuction.id)}
                        >
                          Place Bid
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 flex items-start">
                        <AlertCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <p>
                          By placing a bid, you agree to our terms of service
                          and commit to complete the transaction if you win.
                        </p>
                      </div>
                    </div>
                  ) : selectedAuction.status === "upcoming" ? (
                    <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                      This auction hasn't started yet. It will begin on{" "}
                      {selectedAuction.startTime.toLocaleString()}.
                    </div>
                  ) : (
                    <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                      This auction has ended.
                    </div>
                  )}

                  {/* Bid History */}
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">
                      Bid History
                    </h4>
                    <div className="border rounded-lg divide-y">
                      {bids.length > 0 ? (
                        bids.map((bid, index) => (
                          <div
                            className="flex justify-between items-center p-3"
                            key={index}
                          >
                            <div className="text-gray-600">
                              {bid.bidder?.username || "Anonymous"}
                            </div>
                            <div className="text-gray-600">
                              ${parseFloat(bid.amount).toFixed(2)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-gray-500">
                          No bids yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Small-Scale Business Auction Management Component
const SmallScaleAuctionPage = () => {
  const [products, setProducts] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreatingAuction, setIsCreatingAuction] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    base_price: "",
    start_time: "",
    end_time: "",
    increment: "100",
    auction_type: "open", // Updated default value to match your model
  });

  // Fetch products and auctions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user's products using GraphQL
        const productsData = await auctionService.getUserProducts();

        // Transform GraphQL product data to match our component's expected format
        const transformedProducts = productsData.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price || 0, // Default to 0 if price is not available
          image: product.productImage || "/api/placeholder/400/300",
          category: product.category?.name || "Uncategorized",
        }));

        setProducts(transformedProducts);

        // Fetch auctions
        const auctionsData = await auctionService.getAuctions();

        // Get current user ID from localStorage
        const currentUserId = localStorage.getItem("userId");

        // Filter auctions to only show this user's auctions
        // This filtering logic might need to be adjusted based on your API structure
        const myAuctionsData = auctionsData.filter(
          (auction) =>
            auction.product && auction.product.owner_id === currentUserId
        );

        setMyAuctions(myAuctionsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateAuction = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product");
      return;
    }

    try {
      // Prepare auction data for the Django backend
      const auctionData = {
        product: selectedProduct.id, // Changed from product_id to product
        auction_type: formData.auction_type, // Added auction_type field
        base_price: parseFloat(formData.base_price),
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
        increment: parseInt(formData.increment),
      };

      console.log("Creating auction with data:", auctionData);

      // Use axios to create the auction
      const response = await auctionService.createAuction(auctionData);
      console.log("Auction created successfully:", response);

      alert("Auction created successfully!");

      // Refresh auctions
      const auctionsData = await auctionService.getAuctions();
      const currentUserId = localStorage.getItem("userId");
      const myAuctionsData = auctionsData.filter(
        (auction) =>
          auction.product && auction.product.owner_id === currentUserId
      );
      setMyAuctions(myAuctionsData);

      // Reset form
      setIsCreatingAuction(false);
      setSelectedProduct(null);
      setFormData({
        base_price: "",
        start_time: "",
        end_time: "",
        increment: "100",
        auction_type: "open",
      });
    } catch (error) {
      console.error("Error details:", error);
      if (error.response && error.response.data) {
        alert(
          `Error: ${
            error.response.data.error || JSON.stringify(error.response.data)
          }`
        );
      } else {
        alert("Failed to create auction. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-lg">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium text-gray-900">My Auctions</h2>
          <p className="text-gray-600 mt-1">
            Create and manage your product auctions
          </p>
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          onClick={() => setIsCreatingAuction(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Auction
        </button>
      </div>

      {/* My Auctions List */}
      {myAuctions.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {myAuctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:w-32 lg:w-48">
                  <img
                    src={auction.product?.image || "/api/placeholder/400/300"}
                    alt={auction.product?.name || "Product"}
                    className="w-full h-auto rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {auction.product?.name || "Unnamed Product"}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                    {auction.product?.description || "No description"}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                    <div>
                      <div className="text-xs text-gray-500">Start Price</div>
                      <div className="font-medium">
                        ${parseFloat(auction.base_price).toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Current Bid</div>
                      <div className="font-medium">
                        ${parseFloat(auction.current_price).toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Bids</div>
                      <div className="font-medium">
                        {auction.bids?.length || 0}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="font-medium">
                        {new Date() > new Date(auction.end_time) ? (
                          <span className="text-red-600">Ended</span>
                        ) : new Date() < new Date(auction.start_time) ? (
                          <span className="text-yellow-600">Upcoming</span>
                        ) : (
                          <span className="text-green-600">Active</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    <span>
                      Starts: {new Date(auction.start_time).toLocaleString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      Ends: {new Date(auction.end_time).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-2">
                  <button
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm w-full"
                    onClick={() =>
                      window.open(`/auction-details/${auction.id}`, "_blank")
                    }
                  >
                    View Details
                  </button>

                  {new Date() < new Date(auction.start_time) && (
                    <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm w-full">
                      Cancel Auction
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">
            You haven't created any auctions yet
          </p>
          <p className="text-gray-500 mt-2">
            Start by creating your first auction
          </p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => setIsCreatingAuction(true)}
          >
            Create Auction
          </button>
        </div>
      )}

      {/* Create Auction Modal */}
      {isCreatingAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Create New Auction
              </h3>
              <button
                onClick={() => setIsCreatingAuction(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateAuction} className="p-6">
              {/* Select Product */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Product
                </label>
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className={`border rounded-lg p-2 cursor-pointer transition-colors ${
                          selectedProduct?.id === product.id
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
                          <img
                            src={product.image || "/api/placeholder/200/200"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-medium text-sm line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.category}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No products available</p>
                    <a
                      href="/add-items"
                      className="mt-2 inline-block text-indigo-600 hover:underline"
                    >
                      Add a product first
                    </a>
                  </div>
                )}
              </div>

              {/* Auction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Starting Bid (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      name="base_price"
                      min="0.01"
                      step="0.01"
                      required
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.base_price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="start_time"
                    required
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    name="end_time"
                    required
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    min={
                      formData.start_time ||
                      new Date().toISOString().slice(0, 16)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bid Increment (USD)
                  </label>
                  <input
                    type="number"
                    name="increment"
                    min="1"
                    step="1"
                    required
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.increment}
                    onChange={handleInputChange}
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Auction Type
                  </label>
                  <select
                    name="auction_type"
                    required
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.auction_type}
                    onChange={handleInputChange}
                  >
                    <option value="open">Open (All Buyers)</option>
                    <option value="brand_only">Brand Only</option>
                    <option value="wholesaler_only">Wholesaler Only</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={() => setIsCreatingAuction(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={
                    !selectedProduct ||
                    !formData.base_price ||
                    !formData.start_time ||
                    !formData.end_time
                  }
                >
                  Create Auction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Auction Card Component for brand view
function AuctionCard({ auction, timeInfo, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      {/* Auction Image */}
      <div className="relative">
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-48 object-cover"
        />

        {/* Time Left */}
        <div
          className={`absolute top-0 right-0 px-3 py-1 text-sm font-medium flex items-center ${
            timeInfo.type === "ended"
              ? "bg-red-600 text-white"
              : timeInfo.type === "upcoming"
              ? "bg-yellow-500 text-white"
              : "bg-black bg-opacity-70 text-white"
          }`}
        >
          <Clock className="h-4 w-4 mr-1" />
          {timeInfo.display}
        </div>

        {/* Auction Status Badge */}
        {auction.status === "ended" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
              Ended
            </div>
          </div>
        )}

        {auction.status === "upcoming" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg uppercase">
              Coming Soon
            </div>
          </div>
        )}
      </div>

      {/* Auction Info */}
      <div className="p-4">
        <h3 className="text-gray-900 font-medium text-lg mb-1 line-clamp-1">
          {auction.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {auction.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-500">Current Bid</div>
            <div className="text-xl font-bold text-gray-900">
              ${auction.currentBid.toFixed(2)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Bids</div>
            <div className="flex items-center text-gray-900">
              <User className="h-4 w-4 mr-1" />
              {auction.bids}
            </div>
          </div>
        </div>

        {/* Bid Button */}
        <button
          className={`w-full mt-4 py-2 rounded flex items-center justify-center transition-colors ${
            auction.status === "active"
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-600 cursor-default"
          }`}
          disabled={auction.status !== "active"}
        >
          <ArrowUpRight className="h-4 w-4 mr-2" />
          {auction.status === "active"
            ? "Place Bid"
            : auction.status === "upcoming"
            ? "Coming Soon"
            : "Auction Ended"}
        </button>
      </div>
    </div>
  );
}

// Switch between the two views based on user role
const AuctionPage = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // In a real app, you would get the user role from your auth context or API
    // For demo purposes, we'll just check localStorage
    const role = localStorage.getItem("userRole") || "brand";
    setUserRole(role);
  }, []);

  // For demo purposes, let's add a role switcher
  const toggleRole = () => {
    const newRole = userRole === "small-scale" ? "brand" : "small-scale";
    localStorage.setItem("userRole", newRole);
    setUserRole(newRole);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Role Switcher (for demo purposes) */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={toggleRole}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Switch to{" "}
          {userRole === "small-scale" ? "Brand" : "Small-Scale Business"} View
        </button>
      </div>

      {userRole === "small-scale" ? (
        <SmallScaleAuctionPage />
      ) : (
        <BrandAuctionPage />
      )}
    </div>
  );
};

export default AuctionPage;
