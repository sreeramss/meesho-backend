const mongoose = require("mongoose");
const bcrypt =require("bcryptjs")
// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type: String,required:true}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// for hasing the password 
userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }
    try {
        const salt=await bcrypt.genSaltSync(10);
        this.password =await bcrypt.hash(this.password,salt);
    } catch (error) {
        next(error);
    }
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compareSync(enteredPassword,this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
