

const PhoneBookModal = require("./../Model/Phonebook.modal");

const addphoneBook = async (req, res) => {
    try {
        const {_id} = await req.civilian
        const newPhonebook = new PhoneBookModal({...req.body ,userId : _id});
        await newPhonebook.save();
        res.json({ message: 'phonebook  saved successfully',status:200 }).status(201);
    } catch (error) {
        console.log('Error occurred in phonebook ', error);
        res.send(error.message).status(500);
    }
}

const getphoneBook = async (req, res) => {
    try {
        const {_id} = await req.civilian
        const phonebooks = await PhoneBookModal.find({userId : _id});
        res.json({ message: "phonebooks found", phonebooks }).status(200);
    } catch (error) {
        console.error('Error occurred in phonebooks get', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const deletephoneBook = async (req, res) => {
    try {
        const {id}  = await req.params
        const findbook = await PhoneBookModal.findById(id)
        if(findbook){
          await PhoneBookModal.findByIdAndDelete(id);
            res.json({ message: "Station deleted success", status:200 }).status(200);
        }else{
            res.status(500).json({ error: "Station id not found" });
        }
    } catch (error) {
        console.error('Error occurred in phonebooks get', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {addphoneBook,getphoneBook ,deletephoneBook}