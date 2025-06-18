import React, { useState, useRef, useEffect } from "react";

function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! I'm your AI assistant for the crime reporting system. I can help you with reporting crimes, navigating the system, or answer general questions. How can I assist you today?",
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    const userMessage = { 
      sender: "user", 
      text: userMsg, 
      timestamp: new Date() 
    };
    
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:4042/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const botMessage = { 
        sender: "bot", 
        text: data.reply,
        timestamp: new Date()
      };
      
      setMessages((msgs) => [...msgs, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages((msgs) => [...msgs, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ 
      width: "400px",
      height: "600px",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      overflow: "hidden"
    }}>
      
      {/* FIXED HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "15px 20px",
        textAlign: "center",
        position: "relative",
        flexShrink: 0 // Prevents shrinking
      }}>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
        )}
        
        <h3 style={{ margin: 0, fontSize: "1.2em" }}>🤖 AI Assistant</h3>
        <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "0.8em" }}>
          Crime Reporting System
        </p>
      </div>
      
      {/* SCROLLABLE MESSAGES AREA */}
      <div style={{ 
        flex: 1, // Takes remaining space
        overflowY: "auto",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column"
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div style={{
              maxWidth: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: m.sender === "user" ? "flex-end" : "flex-start"
            }}>
              <div
                style={{
                  backgroundColor: m.sender === "user" ? "#007bff" : "#ffffff",
                  color: m.sender === "user" ? "white" : "#333",
                  padding: "10px 14px",
                  borderRadius: m.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: m.sender === "bot" ? "1px solid #e0e0e0" : "none",
                  wordWrap: "break-word",
                  lineHeight: "1.4",
                  fontSize: "14px",
                  whiteSpace: "pre-wrap" // Preserves line breaks
                }}
              >
                {m.text}
              </div>
              <span style={{
                fontSize: "0.7em",
                color: "#666",
                marginTop: "4px",
                padding: "0 8px"
              }}>
                {formatTime(m.timestamp)}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "12px" }}>
            <div style={{
              backgroundColor: "#ffffff",
              padding: "10px 14px",
              borderRadius: "18px 18px 18px 4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              border: "1px solid #e0e0e0"
            }}>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span style={{ marginLeft: "8px", color: "#666", fontSize: "12px" }}>AI is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* FIXED INPUT AREA */}
      <div style={{ 
        padding: "15px",
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        gap: "10px",
        alignItems: "flex-end",
        flexShrink: 0 // Prevents shrinking
      }}>
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          style={{ 
            flex: 1, 
            padding: "10px 12px", 
            borderRadius: "20px",
            border: "2px solid #e0e0e0",
            fontSize: "14px",
            resize: "none",
            minHeight: "20px",
            maxHeight: "80px",
            outline: "none",
            transition: "border-color 0.3s ease",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.4"
          }}
          onFocus={(e) => e.target.style.borderColor = "#007bff"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />
        <button 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading}
          style={{ 
            padding: "10px 16px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: (!input.trim() || isLoading) ? "#ccc" : "#007bff",
            color: "white",
            cursor: (!input.trim() || isLoading) ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            minWidth: "60px",
            height: "40px"
          }}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
      
      <style jsx>{`
        .typing-indicator span {
          height: 6px;
          width: 6px;
          background-color: #007bff;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1.4s infinite ease-in-out;
          margin-right: 2px;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Chat;