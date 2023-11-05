import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useDraggable, DndContext } from '@dnd-kit/core';
import ControlButtons from '../../../components/controls';
import AddNewTime from '../../../components/modals/addTime';
import MinutControlButton from '../../../components/controls/miniControl';
import DraggableTimer from '../../../components/display/timer';

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours === 0) {
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(remainingSeconds).padStart(2, '0')}`;
}
export default function HomeScreen() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [eventTimeArr, setEventTimeArr] = useState([]);
  const [timeSelected, setTimeSelected] = useState();
  const [startCountdown, setStartCountdown] = useState(0);
  const handleAddTime = () => {
    setIsAddOpen(true);
  };
  console.log(startCountdown);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

  // Function to handle item selection
  const handleItemSelect = (data: any, index: number) => {
    setSelectedItemIndex(index);
  };

  const handlePreview = (data) => {
    setTimeSelected(data);
  };

  const calculateEndTime = (minutes: string, seconds: string) => {
    // Get the current date and time
    const currentDate = new Date();

    // Add the specified minutes and seconds
    currentDate.setMinutes(currentDate.getMinutes() + parseInt(minutes, 10));
    currentDate.setSeconds(currentDate.getSeconds() + parseInt(seconds, 10));

    // Format the end time to display as 12-hour time (e.g., 1:53 PM)
    const endHour = currentDate.getHours() % 12 || 12;
    const endMinutes = currentDate.getMinutes();
    const endAMPM = currentDate.getHours() >= 12 ? 'PM' : 'AM';

    return `${endHour}:${endMinutes.toString().padStart(2, '0')} ${endAMPM}`;
  };

  const handleDelete = (data: any) => {
    setEventTimeArr((prevTime: any) => {
      return prevTime.filter((item: any) => item.title !== data.title);
    });
  };
  const handleClearAll = () => {
    setEventTimeArr([]);
    setTimeSelected('');
  };
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: timeSelected?.title,
  });

  const timeProps = {
    selectedItemIndex,
    calculateEndTime,
    handleItemSelect,
    handleDelete,
    handlePreview,
    timeSelected,
    setTimeSelected,
  };
  const matches = useMediaQuery('(max-width:1530px)');
  return (
    <Box sx={{ width: '100vw', height: '100vh', p: 30, background: '#1c1c1c' }}>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Typography
              sx={{ display: !matches && 'none' }}
              color="#FFFFFF"
              fontSize={20}
              textTransform="uppercase"
            >
              {timeSelected?.title}
            </Typography>
          </Box>
          <Box
            sx={{ p: 3 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              textTransform="uppercase"
              sx={{ display: matches && 'none' }}
              color="#FFFFFF"
              fontSize={25}
            >
              {timeSelected?.title}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'inherit',
                  color: '#E8E8E8',
                  borderColor: '#717171',
                  width: matches ? 100 : 120,
                  height: 30,
                }}
                onClick={handleAddTime}
              >
                Add Time
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'inherit',
                  color: '#E8E8E8',
                  borderColor: '#717171',
                  width: matches ? 90 : 100,
                  height: 30,
                }}
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            </Box>
          </Box>
          <Box sx={{ p: 3, pt: 0 }}>
            <Box
              sx={{
                border: 1,
                borderRadius: 2,
                width: '100%',
                height: '40vh',
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Typography
                color="#FFFFFF"
                sx={{ mb: 2 }}
                fontSize={matches ? 12 : 25}
              >
                {!timeSelected ? '' : <>Section:</>}
              </Typography>
              <Box sx={{ mt: -2, mb: -2 }}>
                <Typography color="#E3BC0C" fontSize={matches ? 20 : 40}>
                  {timeSelected?.title}
                </Typography>
              </Box>
              <Typography
                fontSize={matches ? 80 : 150}
                fontWeight={900}
                color="#FFFFFF"
              >
                {!timeSelected?.totalTime
                  ? '00:00'
                  : formatTime(timeSelected?.totalTime)}
                {console.log(formatTime(timeSelected?.totalTime))}
              </Typography>
              <Box sx={{ mt: -3 }}>
                <Typography color="#E3BC0C" fontSize={matches ? 30 : 50}>
                  {timeSelected?.anchor}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <ControlButtons
                selectedTime={timeSelected}
                setStartCountdown={setStartCountdown}
                setTimeSelected={setTimeSelected}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ height: matches ? 35 : 50 }} />

          <List sx={{ mt: matches ? 4.5 : 0 }}>
            <Box sx={{ pl: 2, mb: 1.2 }}>
              <Typography color="#FFFFFF">Timers</Typography>
            </Box>
            {eventTimeArr.map((time, index) => (
              <div key={index}>
                <DraggableTimer props={{ ...timeProps, time, index }} />
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
      <AddNewTime props={{ isAddOpen, setIsAddOpen, setEventTimeArr }} />
    </Box>
  );
}
