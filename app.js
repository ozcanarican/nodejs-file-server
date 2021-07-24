const http = require('http');
var ip = require("ip");
var qrcode = require('qrcode-terminal');
const express = require('express')
const app = express()

const fileUpload = require('express-fileupload');
app.use(fileUpload());


//Sunucu Portu ve hedef klasör
const port = 3000
const hedef = "C:/Users/ozcan/Desktop/"

//public klasörünü statik dosyalar olarak sun
app.use(express.static('public'))

// Dosya taşıma fonksiyonu
const move = (dosya, res) => {
    dosya.mv(hedef + dosya.name, function (err) {
        if (err)
            console.log("Yükleme hatası")
    });
}

//Upload işlemini ayarlıyoruz
app.post('/upload', function (req, res) {
    let uploadFile = req.files.dosya;
    var dosyaSayisi = 1;

    //Eğer birden fazla dosya gönderiyorsa
    if (Array.isArray(uploadFile)) {
        dosyaSayisi = uploadFile.length;
        uploadFile.map((d) => {
            move(d)
        })

        //Eğer tek dosya gönderiyorsa
    } else {
        move(uploadFile)
    }
    //Cevap gönder
    console.log(`${dosyaSayisi} adet dosya alındı.`)
    res.redirect('/?adet=' + dosyaSayisi);


});


//Web serverını başlat
app.listen(port, () => {
    console.log(`Server adresi: http://${ip.address()}:${port}`)
})
//Console 'a sunucu bilgilerini ve QRCODE 'unu bas
qrcode.generate(`http://${ip.address()}:${port}`, { small: true });
console.log("Dosya transferi için QRCODE 'unu okutun")



