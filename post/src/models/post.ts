import { PostStatusEnum, PostTypeEnum, PostVisibilityEnum } from '@aspianet/common';
import mongoose, { model, Model, ObjectId, Schema } from 'mongoose';

interface PostAttrs {
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  slug: string;
  visibility: PostVisibilityEnum;
  postStatus: PostStatusEnum;
  scheduledFor: Date;
  commentAllowed: boolean;
  viewCount: number;
  type: PostTypeEnum;
  isPinned: boolean;
  createdBy: string;
  createdByIp: string;
}

interface PostDoc extends mongoose.Document {
  title: string;
  subtitle?: string;
  excerpt?: string;
  content: string;
  slug: string;
  visibility: PostVisibilityEnum;
  postStatus: PostStatusEnum;
  scheduledFor: Date;
  commentAllowed: boolean;
  viewCount: number;
  type: PostTypeEnum;
  isPinned: boolean;
  createdBy: string;
  createdByIp: string;
  updatedBy?: string;
  updatedByIp?: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
  build ( attrs: PostAttrs ): PostDoc;
}

const postSchema = new Schema<PostDoc, Model<PostDoc>>( {
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  excerpt: { type: String, required: false },
  visibility: { type: String, required: true, enum: Object.values( PostVisibilityEnum ) },
  postStatus: { type: String, required: true, enum: Object.values( PostStatusEnum ) },
  scheduledFor: { type: Date, required: true },
  commentAllowed: { type: Boolean, required: false },
  viewCount: { type: Number, required: false },
  type: { type: String, required: true, enum: Object.values( PostTypeEnum ) },
  isPinned: { type: Boolean, required: false },
  createdBy: { type: String, required: false },
  createdByIp: { type: String, required: false },
  updatedBy: { type: String, required: false },
  updatedByIp: { type: String, required: false },
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

postSchema.statics.build = ( attrs: PostAttrs ) => {
  return new Post( attrs );
}

const Post = model<PostDoc, PostModel>( 'Post', postSchema );

export { Post };
