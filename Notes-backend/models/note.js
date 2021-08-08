var mongoose = require('mongoose')

var noteSchema = mongoose.Schema({

    title: {
        type: String,
    },
    
    description:{
        type: String,
    },
    create_time: {
        type: Date,
        default: Date.now,
      },
    update_time: {
        type: Date,
        default: Date.now,
      },
    tags: {
        type: Array(String),
        default: [],
      },
      user:{
          type : String,
          default : "",
      }
})

module.exports = mongoose.model('note', noteSchema)
