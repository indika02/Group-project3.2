const express = require('express');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Lecnote = require('../models/LecturerNotes');
 
router.post('/upload', (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    const folderPath = path.join(__dirname, './uploads');
    const originalFileName = file.name;
  
    file.mv(path.join(folderPath, originalFileName), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.status(200).json({ originalFileName });
    });
  });
  
  router.post('/add', async (req, res) => {
    const { originalFileName, classtype, batchyear,Lname } = req.body;
    
    try {
      const newnote = new Lecnote({
        originalFileName,
        classtype,
        batchyear,
       Lname
      });
  
      await newnote.save();
      console.log(newnote)
  
      res.status(200).json({ message: 'Uploaded' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error!' });
    }
  });
  

  router.get('/download/:originalFileName', (req, res) => {
    const originalFileName = req.params.originalFileName;
    const folderPath = path.join(__dirname, './uploads');
    const filePath = path.join(folderPath, originalFileName); // Use the original file name
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${originalFileName}"`); // Suggest the original file name for download
  
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
  });

  // In your server.js or routes file
router.get('/uploadedfiles', async (req, res) => {
  try {
    const uploadedFiles = await Lecnote.find({}, 'originalFileName');
    res.status(200).json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching uploaded files' });
  }
});

  
module.exports = router;
