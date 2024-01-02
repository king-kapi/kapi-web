import { useEffect, useRef } from 'react';

const useUpdate = (id: string, onUpdate: () => void) => {
  const socketRef = useRef<WebSocket>();
  useEffect(() => {
    const socket = new WebSocket(`ws://${location.host}/api/updates`);

    socket.onopen = () => {
      console.log('socket opened');
      socketRef.current = socket;

      // send the initiate message
      socket.send(
        JSON.stringify({
          id,
        })
      );
    };

    socket.onmessage = message => {
      console.log(`Received update for ${id}`);
      onUpdate();
    };

    return () => {
      socket.close();
    };
  }, [id, onUpdate]);

  return socketRef.current;
};

export default useUpdate;
