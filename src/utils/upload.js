import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';
import fs from 'fs';
import { randomBytes } from 'crypto';

const storage = diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = randomBytes(16).toString('hex');
        const extname = _extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${extname}`;
        cb(null, filename.replaceAll(" ", "_"));
    },
});

export const upload = multer({ storage: storage });