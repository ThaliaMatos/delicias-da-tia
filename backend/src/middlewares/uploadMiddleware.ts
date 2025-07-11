import multer from 'multer';
import path from 'path';

// Configuração do multer para salvar arquivos na pasta uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Evita nome duplicado usando timestamp
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
