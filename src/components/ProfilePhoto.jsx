import React, { useState } from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
const ProfilePhoto = ({image,handlePhotoChange}) => {
  const [openDialog, setOpenDialog] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(image);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     setSelectedImage(event.target.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Stack direction={'row'} justifyContent={'center'} alignItems="center">
      <Avatar alt="Profile Photo" src={"data:image/jpeg;base64,"+image} />

      <IconButton color="primary" component="span" onClick={handleOpenDialog}>
        <EditIcon />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Change Product Photo</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ProfilePhoto;
