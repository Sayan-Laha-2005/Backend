import bcrypt from "bcrypt"


const plainPassword="Sara@2005"

const salt=await bcrypt.genSalt(10);
console.log(salt)
// hash +salt
const hashPassword=await bcrypt.hash(plainPassword,salt)

// const isMatch=await bcrypt.compare(plainPassword,"$2b$10$ijD9vbBl7Dt1tymN0xhFquB8Ldh42XecDaZ/Bm9L3BPBP1wpSPYy.")

// console.log(isMatch)

console.log(hashPassword)
//$2b$10$ijD9vbBl7Dt1tymN0xhFquB8Ldh42XecDaZ/Bm9L3BPBP1wpSPYy.