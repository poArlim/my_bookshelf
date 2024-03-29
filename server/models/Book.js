const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookTitle: {
        type: String
    },
    bookAuthor: {
        type: String
    },
    bookLink: {
        type: String
    },
    bookReview: {
        type: String
    },
    thumbnailPath: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book }