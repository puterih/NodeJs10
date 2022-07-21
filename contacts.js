// File System
const fs = require("fs");
/**
 * Readline
 sebuah module untuk membaca apa yg dituliskan nanti ke command prompt/ di terminalnya
 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin, // proses ini apa yg dilakukan di terminal
  output: process.stdout, // proses ini apa yg kita kirimkan nanti
});

// membuat folder dara jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Refactoring agar menjadi lebih rapi & tidak perlu buat pertanyaan yg banyak yaitu buat 1 pertanyaan yg bisa digunakan berulang ulang
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, noHP) => {
  // cara kita menulis/ menyimpan contact nya
  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(fileBuffer); // mengubah dari array string ke json
  // karena perilaku json seperti array, bisa di push

  contacts.push(contact);
  // contacts adalah array kosong yg kita push ke contact yg baru kita isi nama & noHP. jadi objek masuk ke array

  // Tulis kedalam contacts.json
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terimakasih sudah memasukkan data.");
  rl.close();
};

// butuh panggil property nama, email, noHP di file app.js
module.exports = { tulisPertanyaan, simpanContact };
