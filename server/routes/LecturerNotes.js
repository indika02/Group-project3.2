const express = require('express');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload');
const Lecnote = require('../models/LecturerNotes');
const fs = require('fs');
 
router.use(fileUpload());

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
    const filePath = path.join(folderPath, originalFileName);
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${originalFileName}"`); 
  
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
  });


  router.get('/uploadedfiles/:Lname', async (req, res) => {
    try {
      const Lname = req.params.Lname; 
      const uploadedFiles = await Lecnote.find({ Lname }); 
      res.status(200).json(uploadedFiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching uploaded files' });
    }
  });
  
  
  router.get('/uploadedfile', async (req, res) => {
    try {
      const uploadedFiles = await Lecnote.find();
      res.status(200).json(uploadedFiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching uploaded files' });
    }
  }); 
  
  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;

      const deletedNote = await Lecnote.findByIdAndRemove(id);
  
      if (!deletedNote) {
        return res.status(404).json({ error: 'File not found' });
      }
  
     
      const folderPath = path.join(__dirname, './uploads');
      const filePath = path.join(folderPath, deletedNote.originalFileName);
  
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 
        res.status(200).json({ message: 'File deleted successfully' });
      } else {
        res.status(404).json({ error: 'File not found in local folder' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting file' });
    }
  });
module.exports = router;