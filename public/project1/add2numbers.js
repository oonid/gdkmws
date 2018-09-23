// add2numbers.js
function kalkulator() {
    let angka = document.querySelectorAll('input');
    let i1= angka[0].value || 0; //angka pertama, jika tidak diisi, digantikan angka 0
    let i2= angka[1].value || 0; //angka kedua, jika tidak diisi, digantikan angka 0
    if(isNaN(i1) || isNaN(i2)) {
        alert('Anda harus memasukkan Angka (bulat atau pecahan).')
    }
    else {
        angka[2].value= parseFloat(i1) + parseFloat(i2)
    }
}
let tombol = document.querySelector('button');
tombol.addEventListener('click', kalkulator);