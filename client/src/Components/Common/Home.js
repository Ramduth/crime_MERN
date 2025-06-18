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
        <button className="chat-toggle-btn" onClick={() => setIsChatOpen(true)}>
          💬 Chat
        </button>
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="chat-popup" ref={popupRef}>
          <SimpleBot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Home;
