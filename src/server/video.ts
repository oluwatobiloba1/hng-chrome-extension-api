import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileId:{
    type: String,
    required: true,
    unique: true
  },
    path: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    transcript: {
      type: String,
      required: false,
      allowNull: true,
      default: null
    }
  });
  
  const Video = mongoose.model("video", VideoSchema);
  
export default  Video;