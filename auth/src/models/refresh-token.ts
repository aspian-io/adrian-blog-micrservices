import mongoose, { PopulatedDoc } from 'mongoose';
import { UserDoc } from './user';

interface RefreshTokenAttrs {
  user: PopulatedDoc<UserDoc>;
  token: string;
  expires: number;
  created: Date;
  createdByIp: string;
  revoked: number;
  revokedByIp: string;
  replacedByToken: string;
  isExpired: boolean;
  isActive: boolean;
}

interface RefreshTokenModel extends mongoose.Model<RefreshTokenDoc> {
  build ( attrs: RefreshTokenAttrs ): RefreshTokenDoc;
}

interface RefreshTokenDoc extends mongoose.Document {
  user: PopulatedDoc<UserDoc>;
  token: string;
  expires: number;
  created: Date;
  createdByIp: string;
  revoked: number;
  revokedByIp: string;
  replacedByToken: string;
  isExpired: boolean;
  isActive: boolean;
}

const refreshTokenSchema = new mongoose.Schema( {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.user;
    },
    versionKey: false,
    virtuals: true
  }
} );

refreshTokenSchema.statics.build = ( attrs: RefreshTokenAttrs ) => {
  return new RefreshToken( attrs );
};

refreshTokenSchema.virtual( 'isExpired' ).get( function ( this: RefreshTokenAttrs ) {
  return Date.now() >= this.expires;
} );

refreshTokenSchema.virtual( 'isActive' ).get( function ( this: RefreshTokenAttrs ) {
  return !this.revoked && !this.isExpired;
} );

const RefreshToken = mongoose.model<RefreshTokenDoc, RefreshTokenModel>( 'RefreshToken', refreshTokenSchema );

export { RefreshToken };