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
        const fileId = uuidv4(); 
        const folderPath = path.join(__dirname, './uploads'); 
        const originalFileName = file.name;
    

        file.mv(path.join(folderPath, originalFileName), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }    
            res.status(200).json({ fileId,originalFileName });
        });
    });
    
    router.post('/add', async (req, res) => {
        const { fileId,classtype, batchyear } = req.body;
        try {
        const newnote = new Lecnote({
            fileId,
            classtype,
            batchyear,
        });
    
        await newnote.save();
    
        res.status(200).json({ message: 'Uploaded' });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error!' });
        }
    });
    
    module.exports = router;
