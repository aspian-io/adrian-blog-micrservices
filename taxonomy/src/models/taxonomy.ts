import { TaxonomyTypeEnum } from '@aspianet/common';
import mongoose, { model, Model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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
  version: number;
}

interface TaxonomyModel extends mongoose.Model<TaxonomyDoc> {
  build ( attrs: TaxonomyAttrs ): TaxonomyDoc;
}

const taxonomySchema = new Schema<TaxonomyDoc, Model<TaxonomyDoc>>( {
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
    versionKey: true
  },
  timestamps: true
} );

taxonomySchema.set( 'versionKey', 'version' );
taxonomySchema.plugin( updateIfCurrentPlugin );

taxonomySchema.statics.build = ( attrs: TaxonomyAttrs ) => {
  return new Taxonomy( attrs );
}

const Taxonomy = model<TaxonomyDoc, TaxonomyModel>( 'Taxonomy', taxonomySchema );

export { Taxonomy };
