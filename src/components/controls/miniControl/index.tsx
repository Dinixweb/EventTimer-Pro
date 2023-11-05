import { Box, Button } from '@mui/material';

export default function MinutControlButton({ props }) {
  const { time, index, handlePreview, setTimeSelected } = props;

  const previewSelectect = () => {
    const totalSeconds =
      parseInt(time?.hour) * 3600 +
      parseInt(time?.minute) * 60 +
      parseInt(time?.second);

    handlePreview(time);
    setTimeSelected((prev) => {
      return { ...prev, totalTime: totalSeconds };
    });
  };
  return (
    <Box display="flex" justifyContent="center" gap={1} sx={{ width: '100%' }}>
      <Button
        variant="outlined"
        sx={{ borderColor: '#E8E8E8', height: 30, minWidth: 30, width: 30 }}
        onClick={previewSelectect}
      >
        <i
          className="fi fi-tr-desktop-wallpaper"
          style={{ color: '#E8E8E8', marginTop: 3 }}
        />
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: '#E8E8E8', height: 30, minWidth: 30, width: 30 }}
      >
        <i
          className="fi fi-sr-settings"
          style={{ color: '#E8E8E8', marginTop: 3 }}
        />
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: '#E8E8E8', height: 30, minWidth: 30, width: 30 }}
      >
        <i
          className="fi fi-sr-play"
          style={{ color: '#E8E8E8', marginTop: 3 }}
        />
      </Button>
    </Box>
  );
}
