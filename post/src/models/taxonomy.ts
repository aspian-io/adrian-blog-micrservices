import { TaxonomyTypeEnum } from '@aspianet/common';
import mongoose, { model, Model, Schema } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TaxonomyAttrs {
  id: string;
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
}

export interface TaxonomyDoc extends mongoose.Document {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  version: number;
}

interface TaxonomyModel extends mongoose.Model<TaxonomyDoc> {
  build ( attrs: TaxonomyAttrs ): TaxonomyDoc;
  findByEvent ( event: { id: string, version: number } ): Promise<TaxonomyDoc | null>;
}

const taxonomySchema = new Schema<TaxonomyDoc, Model<TaxonomyDoc>>( {
  type: { type: String, required: true, enum: Object.values( TaxonomyTypeEnum ) },
  description: { type: String, required: false },
  term: { type: String, required: true },
  slug: { type: String, required: true },
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
  return new Taxonomy( {
    _id: attrs.id,
    type: attrs.type,
    description: attrs.description,
    term: attrs.term,
    slug: attrs.slug
  } );
}
taxonomySchema.statics.findByEvent = ( event: { id: string, version: number } ) => {
  return Taxonomy.findOne( {
    _id: event.id,
    version: event.version - 1
  } );
}

const Taxonomy = model<TaxonomyDoc, TaxonomyModel>( 'Taxonomy', taxonomySchema );

export { Taxonomy };
