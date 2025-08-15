# Frontend

`npm create vite@latest .`  

``npm i react-router-dom react-hot-toast axios zustand lucide-react``  

npm install react-player -> on frontend directory, not src

npm install react-youtube

# Backend

`` npm init -y ``  
`` npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io ``  
`` npm i nodemon -D ``  
``npm i express-fileupload`` 

# TODO
-admin yorum kaldırması
-başarılı girişte ana sayfaya yönlendir ✅
-hotmovies ve hottvshows kısmında, en yüksek puanlı 6şar filmi göster ✅
-liste sayfaları ✅
-arama barı ✅
-profile sayfasını ✅
-yorum yapmak, rating atmak
-liste sayfalarında 10 eşyadan sonra, 2. sayfaya geçiş olsun
-ana sayfadaki filmler ve diziler kısmında 3x2 dizaynında 6şar kart gösterilsin ✅
-top-rated movies ve tvshows backend routeı oluşturup, homepagei onunla yap ✅
-kullanıcı profil sayfasındayken çıkış yaparsa, ana sayfaya atılsın ✅
-sayfa yenilenince hesaptan çıkma bugını düzelt ✅
-profile page satır 122 "unkown" yazıp duruyor, çöz
-kullanıcı adını hatırla ... butonu ekle girişte
-gereksiz miktarde mount oluyor sitede
-update kısmında foto güncellenmiyor
-consoldaki splitli uyarıyı düzelt
-bcrypt ekle

user with bcrypt

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    }
}, { timestamps: true });


// 📍 KAYDETME ÖNCESİ: Şifreyi hashle
userSchema.pre("save", async function (next) {
    // Şifre değişmemişse tekrar hashleme
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10); // 10 tur tuz
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 🔑 Şifre karşılaştırma metodu
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;