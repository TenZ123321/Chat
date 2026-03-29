const pusher = new Pusher('4ab0a5b2186b6c48de02', {
    cluster: 'ap1'
});
const channel = pusher.subscribe('my-channel');
const wadah = document.getElementById('kotak-chat');
channel.bind('my-event', function(data) {
    const namaSaya = document.getElementById('nama-user').value;
    const tipe = (data.nama === namaSaya) ? 'me' : 'others';

    wadah.innerHTML += `<div class="bubble ${tipe}"><b>${data.nama}</b>: ${data.pesan}</div>`;
    wadah.scrollTop = wadah.scrollHeight;
});
// 1. Fungsi dengerin pesan dari ORANG LAIN (Real-time)
channel.bind('my-event', function(data) {
    const namaSaya = document.getElementById('nama-user').value;
    
    // HANYA tampilkan kalau itu pesan dari orang lain (biar nggak double)
    if (data.nama !== namaSaya) {
        wadah.innerHTML += `<div class="bubble others"><b>${data.nama}</b>: ${data.pesan}</div>`;
        wadah.scrollTop = wadah.scrollHeight;
    }
});

// 2. Fungsi Kirim Pesan (Visual Instan + Kirim ke API)
document.getElementById('tombol-kirim').onclick = function() {
    const nama = document.getElementById('nama-user').value;
    const pesan = document.getElementById('isi-pesan').value;

    if (nama && pesan) {
        wadah.innerHTML += `<div class="bubble me"><b>${nama}</b>: ${pesan}</div>`;
        wadah.scrollTop = wadah.scrollHeight;
        document.getElementById('isi-pesan').value = "";
        fetch('/api/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama: nama, pesan: pesan })
        });
    } else {
        alert("Isi nama dan pesan dulu bos!");
    }
}; 
document.getElementById('isi-pesan').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('tombol-kirim').click();
    }
});