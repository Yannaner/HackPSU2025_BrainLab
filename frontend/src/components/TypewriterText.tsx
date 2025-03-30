import { useState, useEffect } from 'react';
import './TypewriterText.css';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

const TypewriterText = ({
  words,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000
}: TypewriterTextProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentIndex];
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, words, typingSpeed, deleteSpeed, delayBetweenWords]);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">{currentText}</span>
      <span className="cursor" />
    </div>
  );
};

export default TypewriterText;
