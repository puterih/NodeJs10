// Core Module
// File System
const fs = require("fs");

// // menuliskan string ke file (synchronous)
// fs.writeFileSync("test.txt", "Hello World secara synchronous!");
// // () yang 1 nama file, yang ke 2 tulisan/isi dari file nya

// // Menampung Error menggunakan blok try catch
// try {
//   fs.writeFileSync("data/test.txt", "Hello World secara Synchronous!");
// } catch (e) {
//   console.log(e);
// }
// //   ini error karena tidak ada folder data. jikapun ada, maka tidak error

// // Menuliskan string ke file (asynchronous) *gaya penulisan callback
// fs.writeFile("data/test.txt", "Hello World secara Asyncronous", (err) => {
//   console.log(err); // null karena fungsi ini tidak meng return apapun
// });

// // Membaca isi file (synchronous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// // console.log(data); //<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 20 73 65 63 61 72 61 20 41 73 79 6e 63 72 6f 6e 6f 75 73>
// // yang tampil adalah Buffernya, bukan data string. agar berubah menjadi string, pakai functiong toString

// // console.log(data.toString());
// // // jika menggunakan encoding "utf-8" maka tidak perlu menggunakan toString
// // // penggunaan encoding "utf-8" contohnya untuk mengubah yang tadinya Buffer menjadi huruf latin
// console.log(data);

// // Membaca isi file (Asynchronous) *gaya penulisan callback
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   //(err, data) merupakan 2 callback. Data itu yg dikembalikan dari isi filenya
//   if (err) throw err; //throw(melemparkan) sama seperti return karna langsung keluar dari function
//   console.log(data); // jika berhasil
// });

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

// untuk menghindari callback hell, gunakan promise ke async await
const pertanyaan1 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Masukkan nama anda : ", (nama) => {
      resolve(nama);
    });
  });
};

const pertanyaan2 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Massukan email anda :", (email) => {
      resolve(email);
    });
  });
};

// menggunakan async await
const main = async () => {
  const nama = await pertanyaan1();
  const email = await pertanyaan2();
  const contact = { nama, email };

  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file); // mengubah dari array string ke json
  // karena perilaku json seperti array, bisa di push

  contacts.push(contact);
  // contacts adalah array kosong yg kita push ke contact yg baru kita isi nama & noHP. jadi objek masuk ke array

  // Tulis kedalam contacts.json
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log("Terimakasih sudah memasukkan data.");
  rl.close();
};

main();
// // 1 pertanyaan
// rl.question("Masukkan nama anda : ", (nama) => {
//   // (nama) menampung ke dalam sebuah callback function
//   console.log(`Terimakasih ${nama}`);

//   rl.close();
// });

// 2 pertanyaan callback
// rl.question("Masukkan nama anda : ", (nama) => {
//   rl.question("Masukkan noHP anda : ", (noHP) => {
//     const contact = { nama, noHP };
//     const file = fs.readFileSync("data/contacts.json", "utf8");
//     const contacts = JSON.parse(file); // mengubah dari array string ke json
//     // karena perilaku json seperti array, bisa di push

//     contacts.push(contact);
//     // contacts adalah array kosong yg kita push ke contact yg baru kita isi nama & noHP. jadi objek masuk ke array

//     // Tulis kedalam contacts.json
//     fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//     console.log("Terimakasih sudah memasukkan data.");
//     rl.close();
//   });
// });
