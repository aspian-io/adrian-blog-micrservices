import mongoose, { PopulatedDoc } from 'mongoose';
import { UserDoc } from './user';

interface ClaimAttrs {
  claim: string;
}

export interface ClaimModel extends mongoose.Model<ClaimDoc> {
  build ( attrs: ClaimAttrs ): ClaimDoc;
}

export interface ClaimDoc extends mongoose.Document {
  user: PopulatedDoc<ClaimDoc>;
  claim: string;
}

const claimSchema = new mongoose.Schema( {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  claim: { type: String, required: true },
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false,
    virtuals: true
  },
  timestamps: true
} );

claimSchema.statics.build = ( attrs: ClaimAttrs ) => {
  return new Claim( attrs );
};

const Claim = mongoose.model<ClaimDoc, ClaimModel>( 'Claim', claimSchema );

export { Claim };