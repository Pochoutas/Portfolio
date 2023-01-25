const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    link: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    image:{
        type: String,
        required: [true,'Pas dimage'],
    },
    description:{
        type: String,
        required: [true, 'Pas de description']
    }

})

const ProjectModel = mongoose.model('Projects', projectSchema);

module.exports = ProjectModel