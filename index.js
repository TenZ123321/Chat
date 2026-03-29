const pusher = new Pusher('4ab0a5b2186b6c48de02', {
    cluster: 'ap1'
});
const channel = pusher.subscribe('my-channel');
const wadah = document.getElementById('kotak-chat');
let pesanDiterima = []; // Buku tamu buat nyatet ID pesan

channel.bind('my-event', function(data) {
    // 1. Cek KTP pesan (ID) biar gak double
    if (data.id && pesanDiterima.includes(data.id)) return;
    if (data.id) pesanDiterima.push(data.id);

    // 2. Ambil nama buat nentuin warna bubble
    const namaSaya = document.getElementById('nama-user').value.trim();
    const kelasBubble = (data.nama === namaSaya) ? "bubble me" : "bubble others";

    // 3. Pajang pesannya
    wadah.innerHTML += `<div class="${kelasBubble}"><b>${data.nama}</b>: ${data.pesan}</div>`;
    wadah.scrollTop = wadah.scrollHeight;
});

// 2. Fungsi Kirim Pesan (Visual Instan + Kirim ke API)
document.getElementById('tombol-kirim').onclick = function() {
    const nama = document.getElementById('nama-user').value;
    const pesan = document.getElementById('isi-pesan').value;

    if (nama && pesan) {
        document.getElementById('isi-pesan').value = "";
        fetch('/.netlify/functions/send-message', {
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