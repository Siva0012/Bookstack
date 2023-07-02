const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        listed: {
            type: Boolean,
            default: true
        },
        author: {
            type: String,
            required: true
        },
        edition: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required: false
        },
        isbn: {
            type: String,
            required: false
        },
        stock: {
            type: Number,
            required: true
        },
        publisher: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        coverPhoto: {
            type: String,
            requried: false
        },
        publicId: {
            type: String
        },
        dateAdded: {
            type: Date,
            default: Date.now()
        },
        availableStock: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value <= this.stock
                },
                message: "Available stock cannot be greater than total stock"
            },
            default: function () {
                return this.stock
            }
        },
        maxReservations: {
            type: Number,
            required: true,
            default: 10
        },
        reservationOrder: [
            {
                member: {
                    type: mongoose.Schema.Types.ObjectId
                },
                reservedOn: {
                    type: Date
                }
            }
        ],

    }
)

// bookSchema.pre('findOneAndUpdate' , function(next) {
//     const availableStock = this.getUpdate().$set.availableStock
//     if(availableStock <= 0) {
//         this.updateMany({} , {$set : {isAvailable : false}})
//     } else {
//         this.updateMany({} , {$set : {isAvailable : true}})
//     }
//     next()
// })

module.exports = mongoose.model("Books", bookSchema)