import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing IPC event listeners with automatic cleanup
 * Ensures listeners are properly removed on unmount or when dependencies change
 * 
 * @param channel - The IPC channel to listen on
 * @param handler - The event handler function
 * @param deps - Dependencies array for the effect
 */
export function useIpcListener(
  channel: string,
  handler: (data: any) => void,
  deps: React.DependencyList = []
) {
  const handlerRef = useRef(handler);
  
  // Update handler ref on each render
  handlerRef.current = handler;
  
  useEffect(() => {
    if (!window.electronAPI) return;
    
    // Create a stable handler that uses the ref
    const stableHandler = (data: any) => {
      handlerRef.current(data);
    };
    
    // Add the listener
    window.electronAPI.receive(channel, stableHandler);
    
    // Cleanup function
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners(channel);
      }
    };
  }, [channel, ...deps]);
}

/**
 * Custom hook for managing one-time IPC listeners with automatic cleanup
 * Listener is automatically removed after first call or on unmount
 * 
 * @param channel - The IPC channel to listen on
 * @param handler - The event handler function
 * @param deps - Dependencies array for the effect
 */
export function useIpcOnce(
  channel: string,
  handler: (data: any) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (!window.electronAPI) return;
    
    // Add the one-time listener
    window.electronAPI.receiveOnce(channel, handler);
    
    // Cleanup function - ensure listener is removed even if not triggered
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners(channel);
      }
    };
  }, [channel, ...deps]);
}