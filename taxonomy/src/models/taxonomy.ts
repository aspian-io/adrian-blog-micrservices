import { TaxonomyTypeEnum } from '@aspianet/common';
import mongoose, { model, Model, ObjectId, Schema } from 'mongoose';

interface TaxonomyAttrs {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  createdBy: string;
  createdByIp: string;
  updatedBy?: string;
  updatedByIp?: string;
}

interface TaxonomyDoc extends mongoose.Document {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  createdBy: string;
  createdByIp: string;
  updatedBy?: string;
  updatedByIp?: string;
}

interface TaxonomyModel extends mongoose.Model<TaxonomyDoc> {
  build ( attrs: TaxonomyAttrs ): TaxonomyDoc;
}

const taxonomySchema = new Schema<TaxonomyAttrs, Model<TaxonomyAttrs>, TaxonomyAttrs>( {
  type: { type: String, required: true, enum: Object.values( TaxonomyTypeEnum ) },
  description: { type: String, required: false },
  term: { type: String, required: true },
  slug: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdByIp: { type: String, required: true },
  updatedBy: { type: String, required: false },
  updatedByIp: { type: String, required: false }
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  },
  timestamps: true
} );

taxonomySchema.statics.build = ( attrs: TaxonomyAttrs ) => {
  return new Taxonomy( attrs );
}

const Taxonomy = model<TaxonomyDoc, TaxonomyModel>( 'Taxonomy', taxonomySchema );

export { Taxonomy };
