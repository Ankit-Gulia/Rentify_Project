
const Listing = require("../Models/Listing");

module.exports.listings = async(req, res) => {
    let listings = await Listing.find({});
    return res.json(listings);
};

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path : "reviews", populate:{path : "author"}}).populate('owner');
    return res.json(listing);
};

module.exports.addListing = async (req, res, next) => {
    if (!req.body) {
        return next(new customError(406, 'Listing is not defined yet~'));
    }
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body); //creating new listing..
    newListing.image = {url,filename};
    newListing.owner = req.user._id;
    await newListing.save();
    return res.json({ message: 'New Listing Created ✅' });
};

module.exports.editListing = async(req, res) => {
    const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } //it return new updated listing
    );
    if(req.file){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = {url, filename};
    await updatedListing.save();
    }
    return res.json(updatedListing);
};


module.exports.deleteListing = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    return res.json({message : "Listing Deleted ✅"});
};