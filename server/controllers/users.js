import User from "../models/User";

//Read

export const getUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id)


    }catch(err){
        res.status(404).json({ message: err.message})
    }

}
export const getUserFriends = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        //Get all user friends
        //Promise.all => makes multiple request

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        //The formatt is for the convinience of frontend developers
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location,picturePath})=>{
            return { _id, firstName, lastName, occupation, location,picturePath}
        }
        );
        res.status(200).json(formattedFriends)

        
    }catch(err){
        res.status(404).json({ message: err.message})
    }

}
export const addRemoveFriend = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id)


    }catch(err){
        res.status(404).json({ message: err.message})
    }

}

//Update

export const addRemoveFriend = async (req,res)=>{
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);//current user
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId) 
            friend.friends = friend.friends.filter((id)=> id !== friendId) 
        }else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        //The formatt is for the convinience of frontend developers
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location,picturePath})=>{
            return { _id, firstName, lastName, occupation, location,picturePath}
        }
        );
        res.status(200).json(formattedFriends)

    }catch(err){
        res.status(400).json({message: err.message})
    }
}