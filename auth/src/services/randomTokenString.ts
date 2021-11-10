import crypto from 'crypto';

function randomTokenString () {
  return crypto.randomBytes( 40 ).toString( 'hex' );
}

export default randomTokenString;