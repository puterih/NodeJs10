const contacts = require("./contacts");

// menggunakan async await
const main = async () => {
  const nama = await contacts.tulisPertanyaan("Masukkan nama anda :");
  const email = await contacts.tulisPertanyaan("Masukkan email anda :");
  const noHP = await contacts.tulisPertanyaan("masukkan noHP anda :");

  contacts.simpanContact(nama, email, noHP);
};

main();
