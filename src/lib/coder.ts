/**
 * Very simple encoder using Basic AES128 algorithm with fixed Initial vector and secret key
 * Borrow from personal projects
 */
import crypto from 'crypto';

export const BasicAES128Encoder = (() => {
    // const algorithm = "aes-256-cbc"; 
    const algorithm = "aes-128-cbc"; 
    
    // Initial vector
    // For realy encryption - 16 bytes of random data
    // const initVector = crypto.randomBytes(16);
    // for encoding purpose - 16 '0's
    const initVector = Buffer.from((new Array(16)).fill('0').join(''));
    
    // secret key
    // For realy encryption  - 16 bytes of random data
    // const SecurityKey = crypto.randomBytes(32);
    // for encoding purpose  - 16 '0's
    const SecurityKey = Buffer.from((new Array(16)).fill('0').join(''));
    
    return {
        encode: (raw = '') => {
            if (typeof raw !== 'string') throw 'Cannot encode non-string content';

            // the cipher function
            const cipher = crypto.createCipheriv(algorithm, SecurityKey, initVector);

            let encryptedData = cipher.update(raw, "utf-8", "hex");
            encryptedData += cipher.final("hex");
            // log("Encrypted message: " + encryptedData);
            return encryptedData;
        },
        decode: (encodedData = '') => {
            const invalidDecodeMsg = 'Cannot decode content, please check your whether iv & secretKey pair is matched. Or perheps it is invalid/corrupted.';
            try {
                // the decipher function
                const decipher = crypto.createDecipheriv(algorithm, SecurityKey, initVector);

                let decryptedData = decipher.update(encodedData, "hex", "utf-8");
                decryptedData += decipher.final("utf8");
                // log("Decrypted message: " + decryptedData);
                return decryptedData;
            } catch (err) {
                console.warn(err);
                throw invalidDecodeMsg;
            }
        },
    }
})();
