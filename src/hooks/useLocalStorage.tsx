import { useState, useEffect } from "react"

const getLocalStorage = (key: string, initial: any) => {

  const item = localStorage.getItem(key)

  return (item === null) ? initial : JSON.parse(item)
}

export const useLocalStorage = (key: string, initial: any) => {

  const [value, setValue] = useState(() => { return getLocalStorage(key, initial); });
   
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  
  return [value, setValue];
}