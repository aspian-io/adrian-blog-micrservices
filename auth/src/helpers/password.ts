import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify( scrypt );

export class Password {
  static async passwordToHash ( password: string ) {
    const salt = randomBytes( 8 ).toString( 'hex' );
    const buf = ( await scryptAsync( password, salt, 64 ) ) as Buffer;

    return `${ buf.toString( 'hex' ) }.${ salt }`;
  }

  static async passwordCompare ( storedPassword: string, suppliedPassword: string ) {
    const [ hashedPassword, salt ] = storedPassword.split( '.' );
    const buf = ( await scryptAsync( suppliedPassword, salt, 64 ) ) as Buffer;

    return buf.toString( 'hex' ) === hashedPassword;
  }
}

export default Password;