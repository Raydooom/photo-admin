import crypto from 'crypto';

/**
 * 加密
 * @param {string} data 待加密字符串
 * @param {string} key 
 * @param {string} iv 
 * @returns {String} 加密后字符串
 */
export const aesEncrypt = (data, key, iv) => {
  let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

/**
 * 解密
 * @param {string} crypted 
 * @param {string} key 
 * @param {string} iv 
 * @returns {string} 
 */
export const aesDecrypt = (crypted, key, iv) => {
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  return decipher.update(crypted, 'hex', 'utf8') + decipher.final('utf8');
}
