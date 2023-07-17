import React, { useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";

const dialogStyle={
  '& .MuiTypography-root, button':{
    fontSize: '1.6rem'
  },

}
const ProfilePhoto = ({image, setProductPhoto}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tempProductImage, setTempProductImage] = useState(image);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setTempProductImage(event.target.result.split(",")[1]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack direction={'row'} justifyContent={'center'} alignItems="center">
      <Avatar alt="Profile Photo" src={"data:image/jpeg;base64,"+image} sx={{width: '5.5rem'}} />

      <IconButton color="primary" component="span" onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCloseDialog} sx={dialogStyle}>
        <DialogTitle>Change Product Photo</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" >
            Cancel
          </Button>
          <Button onClick={()=>{
            setProductPhoto(tempProductImage);
            handleCloseDialog();
          }} color="primary" >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ProfilePhoto;
