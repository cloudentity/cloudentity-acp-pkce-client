export default () => {
  const size = 128;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
  const charsetIndexBuffer = new Uint8Array( size );

  for ( let i = 0; i < size; i += 1 ) {
    charsetIndexBuffer[i] = ( Math.random() * charset.length ) | 0;
  }

  let randomChars = [];
  for ( let i = 0; i < charsetIndexBuffer.byteLength; i += 1 ) {
    let index = charsetIndexBuffer[i] % charset.length;
    randomChars.push( charset[index] );
  }

  return randomChars.join( '' );
}
