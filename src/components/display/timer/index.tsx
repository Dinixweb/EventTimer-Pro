import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MinutControlButton from '../../controls/miniControl';

export default function DraggableTimer({ props }: any) {
  const matches = useMediaQuery('(max-width:1550px)');
  const {
    time,
    index,
    selectedItemIndex,
    calculateEndTime,
    handleItemSelect,
    handleDelete,
    handlePreview,
    timeSelected,
    setTimeSelected,
  } = props;

  return (
    <ListItem
      sx={{
        color: '#FFFFFF',
        pb: 0,
      }}
    >
      <ListItemText>
        <Box
          sx={{
            p: 2,
            background: selectedItemIndex === index ? '#4169E1' : '#4A4A4A',
            borderRadius: 1,
            height: 30,
            cursor: 'pointer',
          }}
          onClick={() => handleItemSelect(time, index)}
        >
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="space-between"
          >
            <Grid item lg={1}>
              {index + 1}
            </Grid>
            <Grid item lg={2}>
              {calculateEndTime(time.minute, time.second)}
            </Grid>
            <Grid item lg={2}>
              {time.minute}:{time.second}
            </Grid>
            <Grid item lg={3}>
              {time.title}
            </Grid>
            <Grid item lg={3}>
              <MinutControlButton
                props={{
                  time,
                  index,
                  handlePreview,
                  setTimeSelected,
                  timeSelected,
                }}
              />
            </Grid>
            <Grid
              item
              lg={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <i
                className="fi fi-sr-trash"
                style={{ marginTop: 5 }}
                onClick={() => handleDelete(time)}
              />
            </Grid>
          </Grid>
        </Box>
      </ListItemText>
    </ListItem>
  );
}
