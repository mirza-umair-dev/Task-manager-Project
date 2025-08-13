import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    role:{type:String,enum:['user','admin'],default:'user'},
     password:{type:String,required:true},
     adminInviteToken:{type:String},
    profileImgUrl: {type: String, default: ''},
}
,{timestamps:true}
);

const User = mongoose.model('User',UserSchema);
export default User;