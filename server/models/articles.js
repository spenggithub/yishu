const mongoose = require('../init/db'),
  Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title:String,
  content:String,
  email:String,
  abstract:String,
  collected:Array,
  viewNums:{type:Number,default:0},
  comments:[{
    floor:Number,
    content:String,
    userId:String,
    thumbs:Array,
    create_time:String
  }],
  create_time:String
});
module.exports = mongoose.model('Article',ArticlesSchema);
