import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, Grid, InputLabel, OutlinedInput } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRaduius: 10,
};
export default function AddNewTime({ props }: any) {
  const { isAddOpen, setIsAddOpen, setEventTimeArr } = props;

  const [formData, setFormData] = useState({
    title: '',
    anchor: '',
    hour: '00',
    minute: '00',
    second: '00',
    totalTime: '00',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if ((name === 'second' || name === 'minute') && !value) {
      value = '00';
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setEventTimeArr((prevTime: any[]) => {
      const isExistTime = prevTime.findIndex(
        (item: any) => item.title === formData.title,
      );
      if (isExistTime !== -1) {
        return prevTime;
      }
      return [...prevTime, formData];
    });
    // setFormData({
    //   title: '',
    //   anchor: '',
    //   hour: '00',
    //   minute: '00',
    //   second: '00',
    // });
    setIsAddOpen(false);
  };

  return (
    <Box>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={isAddOpen}>
            <Box sx={style}>
              <Grid container spacing={1}>
                <Grid item lg={6}>
                  <InputLabel>Title</InputLabel>
                  <OutlinedInput
                    sx={{ height: 40 }}
                    value={formData.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </Grid>
                <Grid item lg={6}>
                  <InputLabel>Anchor</InputLabel>
                  <OutlinedInput
                    sx={{ height: 40 }}
                    name="anchor"
                    value={formData.anchor}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item>
                    <InputLabel>Hour</InputLabel>
                    <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                      <Select
                        labelId="hour-select-label"
                        id="hour-select"
                        value={!formData.hour ? '00' : formData.hour}
                        onChange={(e) => handleInputChange(e)}
                        name="hour"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <MenuItem key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <InputLabel>Min</InputLabel>
                    <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                      <Select
                        labelId="minute-select-label"
                        id="minute-select"
                        value={!formData.minute ? '00' : formData.minute}
                        onChange={(e) => handleInputChange(e)}
                        name="minute"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <MenuItem key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <InputLabel>Min</InputLabel>
                    <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
                      <Select
                        labelId="second-select-label"
                        id="second-select"
                        value={!formData.second ? '00' : formData.second}
                        onChange={(e) => handleInputChange(e)}
                        name="second"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <MenuItem key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item alignItems="end" display="flex">
                    <Button sx={{ width: 100, mb: 1 }} onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </Box>
  );
}
