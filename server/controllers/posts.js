import Post from "../models/Post.js";
import User from "../models/User.js";

//create

export const createPost = async (req, res)=>{
    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.userPicturePath,
            picturePath: user.picturePath,
            likes: {},
            comments:[]
        })
        await newPost.save();

        const post = await Post.find();//grabbibg all the posts
        res.status(201).json(post);

    } catch(err){
        res.status(409).json({message: err.message});

    }
}


//read
export const getFeedPosts = async (req,res)=>{
    try{

        const post = await Post.find();//grabbibg all the posts
        res.status(200).json(post)

    }catch(err){
        res.status(404).json({message: err.message})
    }
}

//read
export const getUserPosts = async (req,res)=>{
    try{
        const { userId} = req.params;
        const post = await Post.find({userId});//grabbibg only a user posts
        res.status(200).json(post)

    }catch(err){
        res.status(404).json({message: err.message})
    }
}

//Update
export const likePost= async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);//if the userId exist that post is liked by that user

        if(isLiked){
            post.likes.delete(userId);//remove likes
        }else {
            post.likes.set(userId,true);//add likes

        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )
        res.status(200).json(updatedPost)//This is gor the convienience of frontend dev
    }catch(err){
        res.status(404).json({message: err.message})
    }

}