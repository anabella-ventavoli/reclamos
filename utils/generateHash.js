const bcrypt = require('bcryptjs');

async function generateHash() {
    const nuevaContraseña = 'jeor222'; 
    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    
    console.log(hashedPassword); 
}

//generateHash().catch(console.error);
