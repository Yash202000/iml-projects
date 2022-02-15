const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = new Schema(
    {
        id1: {
          type: Number,
          required: true,
          unique: true,
          
        },
        id2: {
            type: Number,
            required: true,
            unique: true,
            
        },
        path_with_namespace1: {
            type: String,
            required: true,
          
        },
        path_with_namespace2: {
            type: String,
            required: true,
            
        },
        synchronized: {
            type: Boolean,
            require: true 
        }
      }, {
        timestamps: true,
      }
)


const Status = mongoose.model('Status', statusSchema);

module.exports = Status;