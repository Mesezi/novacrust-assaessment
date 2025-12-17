'use client';
import { useEffect } from 'react';

type RefType = React.RefObject<HTMLElement | null>;
type EventType = 'mousedown' | 'touchstart';

const useClickOutside = (
  refs: RefType | RefType[], // Accept single ref or array of refs
  handleChange: () => void,
  events: EventType[] = ['mousedown', 'touchstart'], // Default to both mouse and touch events
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const refArray = Array.isArray(refs) ? refs : [refs];
      const isOutside = refArray.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node),
      );

      if (isOutside) {
        handleChange();
      }
    };

    // Add event listeners for specified events
    events.forEach((eventType) => {
      document.addEventListener(eventType, handleClickOutside);
    });

    // Cleanup event listeners
    return () => {
      events.forEach((eventType) => {
        document.removeEventListener(eventType, handleClickOutside);
      });
    };
  }, [refs, handleChange, events]); // Include events in dependencies
};

export default useClickOutside;