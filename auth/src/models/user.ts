import Password from '../helpers/password';
import mongoose, { PopulatedDoc } from 'mongoose';
import { ClaimDoc } from './claim';

interface UserAttrs {
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  email: string;
  password: string;
  createdByIp: string;
  lastIp: string;
  claims?: ClaimDoc[]
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build ( attrs: UserAttrs ): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  email: string;
  password: string;
  createdByIp: string;
  lastIp: string;
  claims?: ClaimDoc[]
}

const userSchema = new mongoose.Schema( {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  displayName: { type: String, required: false },
  bio: { type: String, required: false },
  avatar: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdByIp: { type: String, required: true },
  lastIp: { type: String, required: true },
  claims: [ { type: mongoose.Schema.Types.ObjectId, ref: 'claim' } ]
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: true,
    virtuals: true
  },
  timestamps: true
} );

userSchema.pre( 'save', async function ( done ) {
  if ( this.isModified( 'password' ) ) {
    const hashed = await Password.passwordToHash( this.get( 'password' ) );
    this.set( 'password', hashed );
  }
  done();
} );

userSchema.statics.build = ( attrs: UserAttrs ) => {
  return new User( attrs );
};

const User = mongoose.model<UserDoc, UserModel>( 'User', userSchema );

export { User };