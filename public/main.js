//Seçme tuşu, formu ve dosya inputunu tanımlıyoruz
const buttonSec = document.getElementById("sec")
const files = document.getElementById("dosya")
const form = document.getElementById("form")
//Seçme tuşuna basıldığında, dosya inputuna basılma komutu veriyoruz
buttonSec.addEventListener("click", (e) => {
    files.click()
})

//Dosya inputu değiştiği zaman, formu gönderiyoruz
files.addEventListener("change", (e) => {
    form.submit()
    const container = document.querySelector(".form-container")
    container.innerHTML = "<h1>Yükleniyor</h1>Lütfen Bekleyiniz..."
})

var params = new URLSearchParams(window.location.search);
for (let p of params) {
    console.log(p);
}
if (params.has("adet")) {
    const adet = params.get("adet")
    const bilgi = document.querySelector(".bilgi")
    bilgi.style.display = "block"
    bilgi.innerHTML = `${adet} adet dosya yüklendi`
}