import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(
  initialIsVisible: any,
  eventType: string = "click",
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener(eventType, handleClickOutside, true);
    return () => {
      document.removeEventListener(eventType, handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
