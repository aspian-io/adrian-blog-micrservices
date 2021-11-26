import { authorize, CorePolicies, PostPolicies, requireAuth } from "@aspianet/common";
import express from "express";
import createController from "../create.controller";
import deleteController from "../delete.controller";
import detailsController from "../details.controller";
import editController from "../edit.controller";
import listController from "../list.controller";

const postAdminRouter = express.Router();

// GET: List of Posts
postAdminRouter.get(
  '/',
  requireAuth,
  authorize( [ PostPolicies.PostClaims__LIST, CorePolicies.CoreClaims__ADMIN ] ),
  listController
);

// GET: Get a Post by Id
postAdminRouter.get(
  '/:id',
  requireAuth,
  authorize( [ PostPolicies.PostClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  detailsController
);

// POST: Create a Post
postAdminRouter.post(
  '/create',
  requireAuth,
  authorize( [ PostPolicies.PostClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ),
  createController
);

// PUT: Edit a Post
postAdminRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ PostPolicies.PostClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ),
  editController
);

// DELETE: Delete a Post
postAdminRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ PostPolicies.PostClaims__DELETE, CorePolicies.CoreClaims__ADMIN ] ),
  deleteController
);


export default postAdminRouter;