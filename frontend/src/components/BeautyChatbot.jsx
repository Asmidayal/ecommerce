import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendBeautyMessage, clearChatError } from '../features/chat/chatSlice';
import '../componentStyles/BeautyChatbot.css';

const BeautyChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    dispatch(sendBeautyMessage(input.trim()));
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        className="beauty-chat-toggle"
        onClick={() => setOpen(!open)}
      >
        Beauty Helper
      </button>

      {open && (
        <div className="beauty-chat-window">
          <div className="beauty-chat-header">
            <span>LeaBeauty Assistant</span>
            <button type="button" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <div className="beauty-chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.role}`}>
                <p>{msg.text}</p>

                {msg.products?.length > 0 && (
                  <div className="chat-products">
                    {msg.products.map((product) => (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="chat-product-card"
                      >
                        <img
                          src={product.image?.[0]?.url}
                          alt={product.name}
                        />
                        <div>
                          <strong>{product.name}</strong>
                          <p>₹{product.price}</p>
                          <small>{product.category}</small>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && <p className="chat-loading">Finding the best products...</p>}

            {error && (
              <p className="chat-error" onClick={() => dispatch(clearChatError())}>
                {error}
              </p>
            )}
          </div>

          <form className="beauty-chat-input" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Suggest mascara for office / nail polish for wedding..."
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default BeautyChatbot;