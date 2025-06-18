import React, { useState, useRef, useEffect } from 'react';
import About from './About';
import Services from './Services';
import Banner from './Banner';
import './Home.css'; // Your custom styles
import SimpleBot from './SimpleBot.js';


function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // If popup is open and click is outside popupRef element, close it
      if (isChatOpen && popupRef.current && !popupRef.current.contains(event.target)) {
        setIsChatOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <div>
      <Banner />
      <About />
      <Services />

      {/* Toggle Chat Button */}
      {!isChatOpen && (
        <button 
          className="chat-toggle-btn" 
          onClick={() => setIsChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 12px 35px rgba(0, 123, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.3)';
          }}
        >
          💬
        </button>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div 
          className="chat-popup" 
          ref={popupRef}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1001,
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <SimpleBot onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .chat-toggle-btn:hover {
          transform: scale(1.1);
        }
        
        .chat-popup {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home;
