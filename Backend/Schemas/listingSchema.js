
const {Schema} = require('mongoose');
const Review = require('../Models/Review');

const listingSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required'],
    },
    description : {
        type : String,
        required : [true, 'Description is required'],
    },
    image : {
        url : String,
        filename : String,
    },
    price : {
        type : Number,
        required : [true, 'Price is required'],
    },
    country : {
        type: String,
       required : [true, 'Country is required'],
    },
    location : {
        type: String,
        required : [true, 'location is required'],
    },
    reviews : [
        {
            type : Schema.Types.ObjectId, ref : "Review"
        }
    ],

    owner : {
        type : Schema.Types.ObjectId, ref : 'User',
    }
});

//mongoose middleware for handling deletion -->
listingSchema.post('findOneAndDelete', async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
})

module.exports = listingSchema;