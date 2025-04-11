// import React, { useState, useRef, useEffect } from "react";
// import { SendHorizontal, MessageCircle, X } from "lucide-react";

// // Chatbot Component
// const ChatbotWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when messages change
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle sending a message
//   const handleSendMessage = () => {
//     if (inputMessage.trim() === "") return;

//     // Add user message
//     const newUserMessage = {
//       id: messages.length + 1,
//       text: inputMessage,
//       sender: "user",
//     };

//     // Add bot response (simulated)
//     const newBotMessage = {
//       id: messages.length + 2,
//       text: `You said: ${inputMessage}. I'm a placeholder bot response.`,
//       sender: "bot",
//     };

//     setMessages([...messages, newUserMessage, newBotMessage]);
//     setInputMessage("");
//   };

//   // Handle input key press (Enter to send)
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {/* Chatbot Widget */}
//       {isOpen ? (
//         <div className="w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200">
//           {/* Chat Header */}
//           <div className="bg-blue-500 text-white p-4 rounded-t-xl flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Chat Support</h2>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="hover:bg-blue-600 p-1 rounded-full transition-colors"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {/* Messages Container */}
//           <div className="flex-grow overflow-y-auto p-4 space-y-3">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] p-3 rounded-xl ${
//                     message.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-black"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="p-4 border-t border-gray-200 flex items-center">
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type your message..."
//               className="flex-grow mr-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
//             >
//               <SendHorizontal size={20} />
//             </button>
//           </div>
//         </div>
//       ) : (
//         // Chatbot Toggle Button
//         <button
//           onClick={() => setIsOpen(true)}
//           className="bg-blue-500 text-white p-3 rounded-full shadow-2xl hover:bg-blue-600 transition-colors"
//         >
//           <MessageCircle size={24} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ChatbotWidget;


import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, MessageCircle, X } from "lucide-react";

// GraphQL API endpoint
const GRAPHQL_API_URL = "http://localhost:8000/graphql/"; // Update this if different

// Chatbot Component
const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message with GraphQL integration
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    try {
      const response = await fetch(GRAPHQL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include Authorization header here if needed
        },
        body: JSON.stringify({
          query: `
            mutation {
              askQuestion(question: "${inputMessage.replace(/"/g, '\\"')}") {
                question
                answer
              }
            }
          `,
        }),
      });

      const result = await response.json();

      const botResponse =
        result?.data?.askQuestion?.answer || "Sorry, I didn't understand that.";

      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
      };

      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("GraphQL error:", error);

      const errorMessage = {
        id: messages.length + 2,
        text: "Oops! Something went wrong. Please try again later.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 p-1 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow mr-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <SendHorizontal size={20} />
            </button>
          </div>
        </div>
      ) : (
        // Toggle Button
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-2xl hover:bg-blue-600 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
