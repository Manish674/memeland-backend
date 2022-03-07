(()=>{var s={136:(s,e,t)=>{const r=t(185),o=new(0,r.Schema)({title:{type:String,length:150},mediaUrl:{type:String,required:!0},postedBy:{type:r.Schema.Types.ObjectId,ref:"User"},desc:{type:String},like:Number,dislike:Number}),a=r.model("Post",o);s.exports=a},13:(s,e,t)=>{const r=t(185),o=t(96),a=new(0,r.Schema)({username:{unique:!0,type:String,required:!0},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0,minlength:8},isVerified:{type:Boolean,default:!1},posts:[{type:r.Schema.Types.ObjectId,ref:"Post"}],dateOfBirth:Date,bio:{type:String},pfp:String});a.pre("save",(async function(s){this.isModified("password")||s();const e=await o.genSalt(10),t=await o.hash(this.password,e);this.password=t,s()}));const i=r.model("User",a);s.exports=i},389:(s,e,t)=>{const r=t(860),o=t(582),a=t(228),i=t(969),n=t(422),c=r();c.use(r.json()),c.use(o({origin:"http://localhost:3000",credentials:!0})),c.use("/api/v1/auth",a),c.use("/api/v1/posts",i),c.use("/api/v1/user",n),s.exports=c},575:(s,e,t)=>{const r=t(96),o=t(344),a=t(13),i=t(788);s.exports={login:async(s,e)=>{try{const{email:t,password:i}=s.body,n=await a.findOne({email:t});if(!n)return e.status(200).json({success:!1,message:"User not found"});if(!n.isVerified)return e.status(200).json({success:!1,message:"Email is not verified"});if(!0!==await r.compare(i,n.password))return e.status(200).json({success:!1,message:"invalid credentials"});const c=o.sign({username:n.username,email:n.email},process.env.JWT_SECRET,{expiresIn:"1d"});e.status(200).json({success:!0,isVerified:n.isVerified,user:{email:n.email,username:n.username,pfp:n.pfp},token:c})}catch(s){e.status(500).json({success:!1,error:{e:s,message:s.message}})}},register:async(s,e)=>{const{username:t,password:r,email:o,dateOfBirth:n}=s.body;if((await a.findOne({email:o}))?.email===o)return e.status(200).json({success:!1,message:"User already exists"});const c=await a.create({username:t,password:r,email:o,dateOfBirth:n});i(c.email,c._id),e.status(200).json({success:!0,message:"User created successfully"})},verification:async(s,e)=>{const{token:t}=s.params;try{const s=o.verify(t,process.env.EMAIL_SECRET);let r=await a.findById(s.user_id);r||e.status(200).json({success:!1,error:"Verification failed"}),r.isVerified=!0,await r.save(),e.status(200).json({success:!0})}catch(s){e.status(401).json({success:!1,error:"verificaton failed"})}},validate:async(s,e)=>{if(!e.locals.user)return e.status(200).json({success:!1,error:"authentication failed"});e.status(200).json({success:!0,user:e.locals.user})}}},285:(s,e,t)=>{const r=t(136),o=t(13),a=t(548);s.exports={getAllPost:async(s,e)=>{try{const s=await r.find().populate("postedBy");console.log("something happened"),e.status(200).json({success:!0,posts:s})}catch(s){console.log(s),e.status(500).json({success:!1,error:"Something went wrong"})}},getOnePost:async(s,e)=>{e.status(200).json({success:!0,post:"single post"})},updatePost:async(s,e)=>{try{const{id:t}=s.params,o=s.body,a=await r.findByIdAndUpdate({_id:t},o);console.log(a),e.status(200).json({success:!0,updatedPost:"update"})}catch(s){console.log(s),e.status(400).json({sucess:!1,message:s.message})}},deletePost:async(s,e)=>{try{const{id:t}=s.params;await r.findByIdAndDelete(t),e.status(200).json({success:!0})}catch(s){console.log(s),e.status(400).json({sucess:!1,message:s.message})}},createPost:async(s,e)=>{try{const{user:t}=e.locals,{title:i}=s.body,n=`${s.file.path}`,c=(await a.uploader.upload(n)).secure_url,u=await o.findOne({username:t.username});if(!u)return e.status(200).json({success:!1,error:"Check user"});const p=await r.create({title:i,mediaUrl:c,postedBy:u._id});await o.findOneAndUpdate({username:t.username},{$push:{posts:[p._id]}}),e.status(200).json({success:!0,message:"Post created"})}catch(s){console.log(s),e.status(400).json({sucess:!1,message:s.message})}}}},216:(s,e,t)=>{const r=t(13);s.exports={profile:async(s,e)=>{try{const{user:s}=e.locals,t=await r.find({email:s.email}).select("-password").populate("posts");e.status(200).json({success:!0,result:t})}catch(s){e.status(400).json({success:!1,error:s.message})}},profileById:async(s,e)=>{try{const{id:t}=s.params,o=await r.findById(t).select("-password").populate("posts");if(!o)return e.status(200).json({success:!1,error:"user not found"});e.status(200).json({success:!0,result:o})}catch(s){e.status(400).json({success:!1,error:s.message})}}}},567:(s,e,t)=>{const r=t(344);s.exports=async(s,e,t)=>{try{let o=s.headers?.authentication;if(o=o.split(" ")[1],!o)return e.status(200).json({error:{message:"token not found"}});const a=await r.verify(o,process.env.JWT_SECRET);e.locals.user=a,t()}catch(s){e.status(200).json({success:!1,error:s})}}},856:(s,e,t)=>{const r=t(738),o=r.diskStorage({destination(s,e,t){t(null,"images/")},filename(s,e,t){t(null,`${e.originalname.split(".")[0]}.jpg`)}}),a=r({storage:o,limits:{fileSize:1e6},fileFilter(s,e,t){if(!e.originalname.match(/\.(jpg|jpeg|png)$/i))return t(new Error("Please upload an image of type jpg jpeg png only"));t(void 0,!0)}});e.uploadImage=a.single("file")},228:(s,e,t)=>{const r=t(567),{Router:o}=t(860),{login:a,register:i,verification:n,validate:c}=t(575),u=o();u.route("/login").post(a),u.route("/register").post(i),u.route("/verification/:token").get(n),u.route("/validate").get(r,c),s.exports=u},969:(s,e,t)=>{const{Router:r}=t(860),o=t(567),{uploadImage:a}=t(856),{getAllPost:i,getOnePost:n,updatePost:c,deletePost:u,createPost:p}=t(285),l=r();l.route("/").get(o,i).post([o,a],p),l.route("/:id").get(n).put(c).delete(u),s.exports=l},422:(s,e,t)=>{const r=t(567),{Router:o}=t(860),{profile:a,profileById:i}=t(216),n=o();n.route("/profile").get(r,a),n.route("/profile/:id").get(i),s.exports=n},548:(s,e,t)=>{const r=t(518).v2;r.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET}),s.exports=r},434:(s,e,t)=>{const r=t(185);s.exports=async()=>await r.connect("mongodb://127.0.0.1:27017/memeland")},788:(s,e,t)=>{const r=t(344),o=t(184);s.exports=(s,e)=>{const t=o.createTransport({service:"Gmail",auth:{user:process.env.EMAIL,pass:process.env.EMAIL_PWD}});r.sign({user_id:e},process.env.EMAIL_SECRET,{expiresIn:"1d"},(function(e,r){if(e)throw new Error("something went wrong with assinging jwt to email");const o={from:"manish",to:s,subject:"Email Verification",html:`Press <a href="http://localhost:4000/api/v1/auth/verification/${r}">here</a>`};t.sendMail(o,(function(s,e){s||next(),next(s)}))}))}},96:s=>{"use strict";s.exports=require("bcrypt")},518:s=>{"use strict";s.exports=require("cloudinary")},582:s=>{"use strict";s.exports=require("cors")},142:s=>{"use strict";s.exports=require("dotenv")},860:s=>{"use strict";s.exports=require("express")},344:s=>{"use strict";s.exports=require("jsonwebtoken")},185:s=>{"use strict";s.exports=require("mongoose")},738:s=>{"use strict";s.exports=require("multer")},184:s=>{"use strict";s.exports=require("nodemailer")}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return s[r](a,a.exports,t),a.exports}(()=>{t(142).config();const s=t(389);t(434)(),s.listen(4e3,(()=>{console.log("running")}))})()})();
//# sourceMappingURL=index.js.map