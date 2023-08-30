import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

const QuoteFetcher = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      console.log('data',data)
      if (data && data.content) {
        setQuote(data.content);
        setAuthor(data.author);
      } else {
        setQuote('No quotes available.');
        setAuthor('')
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Error fetching quote.');
      setAuthor('')
    }
  }

  useEffect(() => {
    fetchRandomQuote(); // Fetch a new quote when the component mounts or refreshes
  }, []);
  return (
  
      <div style={{    color: '#39c9a1',
        marginBottom: '71px'}}>
        <motion.blockquote
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {quote.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.blockquote>
        <p>- {author}</p>
      </div>
    );
  }


  export default QuoteFetcher;