const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    dateOfJoin: {
        type: Date,
    },
    membershipId: {
        type: String,
    },
    displayId: {
        type: String
    },
    membershipType: {
        type: String,
    },
    memberSince: {
        type: Date
    },
    memberUpto: {
        type: Date
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isMember: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
    },
    publicId: {
        type: String
    },
    address: {
        type: String
    },
    bookBag: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Books',
            }
        }
    ],
    hasFinePaid : {
        type : Boolean,
        default : true
    },
    totalFineAmount : {
        type : Number,
        default : 0
    },
    reservedBooks : [
        {
            book : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Books'
            },
            reservedOn : {
                type : Date,
                default : new Date()
            }
        }
    ]

})

module.exports = mongoose.model("Members", memberSchema)