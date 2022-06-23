const { mongoose } = require("./dbClient");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    "login": {
        type: String,
        required: true,
        trim: true
    },
    "password": {
        type: String,
        required: true,
        trim: true
    },
    "signedGroups": [{
        type: Schema.ObjectId,
        ref: "Group"
    }]
}, { versionKey: false })
const User = mongoose.model("User", userSchema);

const groupSchema = new Schema({
    "owner": {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    "title": {
        type: String,
        required: true,
        trim: true
    },
    "editors": [{
        type: Schema.ObjectId,
        ref: "User"
    }],
    "subscribers": {
        type: Number,
        default: 0
    }
}, { versionKey: false })
groupSchema.pre(["remove", "deleteOne", "deleteMany"], async function(next) {
    try {
        await Notifications.deleteOne({
            "group": this._id
        });
        next();
    } catch(err) {
        next(err);
    }
})
const Group = mongoose.model("Group", groupSchema);

const notificationSchema = new Schema({
    "id": {
        type: Number,
        required: true
    },
    "type": {
        type: String,
        enum: ["", "SUCCESS", "WARNING", "FAIL"],
        default: ""
    },
    "title": {
        type: String,
        required: true
    },
    "content": {
        type: String,
        default: ""
    },
    "lastSentAt": {
        type: Number,
        default: (new Date()).getTime()
    }
}, { _id: false, versionKey: false })
const notificationsSchema = new Schema({
    "owner": {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    "group": {
        type: Schema.ObjectId,
        ref: "Group",
        required: true
    },
    "notificationsCount": {
        type: Number,
        default: 0
    },
    "notifications": [notificationSchema]
}, { versionKey: false })
const Notifications = mongoose.model("Notifications", notificationsSchema);


module.exports = { User, Group, Notifications };