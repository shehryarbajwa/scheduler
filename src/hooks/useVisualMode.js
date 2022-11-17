import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    const newArr = history.slice(0,history.length - 1);
    if (replace) {
      setHistory([...newArr, newMode]);
    } else {
      setHistory([...history, newMode]);
    }   
  }
  function back() {
    let prevItem = mode;
    let newHistory = history;

    if(history.length > 1) {
      prevItem = history[history.length - 2];
      newHistory = history.slice(0,-1);
    }
    setMode(prevItem);
    setHistory(newHistory);
  }
  return { mode, transition, back, history };
}