import React, { useState, useEffect } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import { storage } from "../../firestore";
import { ref, uploadBytes, listAll } from "firebase/storage";

export function AudioUploadComponent() {
  const [file, setFile] = useState([]); // stores audio file to be uploaded
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Fetch the list of files from Firebase Storage
    // listAll(fileListRef).then((res) => {
    // console.log(res);
    // });
  }, []);

  const fileListRef = ref(storage);

  // checks if the file is an audio file
  const isAudioFile = (file) => {
    const acceptedAudioTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/mp3",
      "video/mpeg",
      "video/wav",
      "video/ogg",
      "video/mp3",
    ];
    return file && acceptedAudioTypes.includes(file.type);
  };

  // uploads the audio file to Firebase Storage
  const UploadFile = (files) => {
    if (file == null) {
      alert("Error: Please select a file");
      return;
    }
    if (!isAudioFile(file)) {
      alert("Error: Please upload an audio file");
      return;
    }
    const fileRef = ref(storage, `/${file.name}`);
    uploadBytes(fileRef, file).then(() => {
      alert("Audio uploaded");
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={3}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      width={300}
      margin="auto"
    >
      <Typography variant="h6" gutterBottom>
        Upload Audio File
      </Typography>
      <Input
        type="file"
        inputProps={{ accept: "audio/*" }}
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={UploadFile}>
        Upload File
      </Button>
    </Box>
  );
}
