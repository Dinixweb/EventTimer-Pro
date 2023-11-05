import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ControlButtons({
  selectedTime,
  setStartCountdown,
  setTimeSelected,
}) {
  const [countdown, setCountdown] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const handlePlay = () => {
    if (countdown) {
      clearInterval(countdown);
      setTimeSelected((prev) => {
        return { ...prev, totalTime: remainingTime };
      });
      // setTimeSelected(remainingTime);
    }

    setRemainingTime(selectedTime.totalTime);

    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    setCountdown(intervalId);
  };

  useEffect(() => {
    setTimeSelected((prev) => {
      return { ...prev, totalTime: remainingTime };
    });
    if (remainingTime <= 0) {
      setCountdown(null);
    }
  }, [countdown, remainingTime, setTimeSelected]);
  useEffect(() => {
    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [countdown]);
  return (
    <Box display="flex" justifyContent="center" gap={1} sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        sx={{ borderColor: '#E8E8E8', height: 35, width: 40 }}
      >
        <i
          className="fi fi-ss-rewind"
          style={{ color: '#E8E8E8', marginTop: 3 }}
        />
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: '#E8E8E8', height: 35, width: 40 }}
        onClick={handlePlay}
      >
        <i
          className="fi fi-sr-play"
          style={{ color: '#E8E8E8', marginTop: 3 }}
        />
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: '#E8E8E8', height: 35, width: 40 }}
      >
        <i
          className="fi fi-ss-forward"
          style={{ color: '#E8E8E8', marginTop: 3 }}
        />
      </Button>
    </Box>
  );
}
