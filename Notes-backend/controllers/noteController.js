var Note = require('../models/note')
exports.addNote = (req, res) => {

    const { title, description, tags } = req.body;
    let tag_array = tags.split(" ");
    tag_array = [...new Set(tag_array)];
    tag_array = tag_array.map(name => name.toLowerCase());

    var note = new Note({
        title, description: description,tags:tag_array, user: req.userid
    })
    try {
        doc = note.save();
        console.log("Successfully note added")
        return res.json({ message: 'Successfully note added' });
    }
    catch (err) {
        return res.json({ error: 'Something went wrong' });
    }
}
//db.getCollection('').find({}).sort({_id:-1}) 
exports.getallNotes = async (req, res) => {

    try {
        const notes = await Note.find({user:req.userid}).sort({update_time:-1})
        console.log(notes)
        // console.log(blogs)
        return res.json({ notes });
    } catch (error) {
        return res.json({ error: 'Something went wrong' });
    }
}
exports.getNote = async (req, res) => {

    if (!req.params.id) {
        return res.json({ error: 'Id is required' });
    }
    try {
        const notes = await Note.findOne({user:req.userid, _id:req.params.id}).sort({update_time:-1})
        console.log(notes)
        // console.log(blogs)
        return res.json({ notes });
    } catch (error) {
        return res.json({ error: 'Something went wrong' });
    }
}

exports.getNotesByTag = async (req, res) => {
    const { tag } = req.params;
    let array = [tag]
    try {
        const notes = await Note.find({user:req.userid, tags: { $in: array }}).sort({update_time:-1})
        
        return res.json({ notes });
    } catch (error) {
        return res.json({ error: 'Something went wrong' });
    }
}
exports.editNote = async (req, res) => {
        try {
        if (!req.params.id) {
            return res.json({ error: 'Id is required' });
        }

        const { title, description } = req.body;
        const update_time = Date.now();
        _ = await Note.updateOne({ _id: req.params.id, user: req.userid }, { title, description,update_time})
        return res.json({ message: 'successfully updated note' });

    } catch (error) {
        return res.json({ error: 'Something went wrong' });
    }
}

exports.deleteNote = async (req, res) => {

    try {
        if (!req.params.id) {
            return res.json({ error: 'Id is required' });
        }

        _ = await Note.deleteOne({ _id: req.params.id, user: req.userid })
        return res.json({ message: 'successfully deleted note' });

    } catch (error) {
        return res.json({ error: 'Something went wrong' });
    }
}

