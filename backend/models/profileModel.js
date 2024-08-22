const mongoose = require('mongoose')
const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    career: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    skill: {
        type: String,
        required: true,
    },
    prof_pic: {
        type: String,
        required: true,
        default: "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }

},
    {
        timestamps: true,
    });



const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;