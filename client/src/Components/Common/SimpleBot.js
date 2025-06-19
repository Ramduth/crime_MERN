import React, { useState, useRef, useEffect } from "react";

function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! I'm your AI assistant for the crime buster system. I can help you with reporting crimes, navigating the system, or answer general questions. How can I assist you today?",
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
      width: "380px",
      height: "550px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden",
      border: "1px solid #e1e5e9"
    }}>
      
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "20px",
        textAlign: "center",
        position: "relative",
        flexShrink: 0
      }}>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "15px",
              right: "20px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
          >
            ✕
          </button>
        )}
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px"
          }}>
            🤖
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.3em", fontWeight: "600" }}>AI Assistant</h3>
            <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "0.85em" }}>
              Crime Buster System
            </p>
          </div>
        </div>
      </div>
      
      {/* MESSAGES AREA */}
      <div style={{ 
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div style={{
              maxWidth: "85%",
              display: "flex",
              flexDirection: "column",
              alignItems: m.sender === "user" ? "flex-end" : "flex-start"
            }}>
              <div
                style={{
                  backgroundColor: m.sender === "user" ? "#007bff" : "#ffffff",
                  color: m.sender === "user" ? "white" : "#2c3e50",
                  padding: "12px 16px",
                  borderRadius: m.sender === "user" ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: m.sender === "bot" ? "1px solid #e9ecef" : "none",
                  wordWrap: "break-word",
                  lineHeight: "1.5",
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                  fontWeight: m.sender === "user" ? "500" : "400"
                }}
              >
                {m.text}
              </div>
              <span style={{
                fontSize: "0.75em",
                color: "#6c757d",
                marginTop: "6px",
                padding: "0 8px",
                fontWeight: "500"
              }}>
                {formatTime(m.timestamp)}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              backgroundColor: "#ffffff",
              padding: "12px 16px",
              borderRadius: "20px 20px 20px 6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #e9ecef"
            }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span style={{ marginLeft: "8px", color: "#6c757d", fontSize: "13px", fontWeight: "500" }}>AI is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* INPUT AREA */}
      <div style={{ 
        padding: "20px",
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e9ecef",
        display: "flex",
        gap: "12px",
        alignItems: "flex-end",
        flexShrink: 0
      }}>
        <textarea
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          style={{ 
            flex: 1, 
            padding: "12px 16px", 
            borderRadius: "25px",
            border: "2px solid #e9ecef",
            fontSize: "14px",
            resize: "none",
            minHeight: "24px",
            maxHeight: "100px",
            outline: "none",
            transition: "all 0.3s ease",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: "1.4",
            backgroundColor: "#f8f9fa"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#007bff";
            e.target.style.backgroundColor = "#ffffff";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e9ecef";
            e.target.style.backgroundColor = "#f8f9fa";
          }}
        />
        <button 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading}
          style={{ 
            padding: "12px 20px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: (!input.trim() || isLoading) ? "#dee2e6" : "#007bff",
            color: "white",
            cursor: (!input.trim() || isLoading) ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            minWidth: "70px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onMouseEnter={(e) => {
            if (!(!input.trim() || isLoading)) {
              e.target.style.backgroundColor = "#0056b3";
              e.target.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!(!input.trim() || isLoading)) {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          {isLoading ? (
            <div style={{ display: "flex", gap: "4px" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "white", animation: "pulse 1s infinite" }}></div>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "white", animation: "pulse 1s infinite 0.2s" }}></div>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "white", animation: "pulse 1s infinite 0.4s" }}></div>
            </div>
          ) : (
            "Send"
          )}
        </button>
      </div>
      
      <style jsx>{`
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #007bff;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1.4s infinite ease-in-out;
          margin-right: 3px;
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Chat;