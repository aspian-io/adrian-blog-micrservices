import { authorize, CorePolicies, requireAuth, TaxonomyPolicies, validateRequest } from "@aspianet/common";
import express from "express";
import createController from "../create.controller";
import detailsController from "../details.controller";
import editController from "../edit.controller";
import listController from "../list.controller";
import createSchema from "../../../validation-schemas/create-schema";
import editSchema from "../../../validation-schemas/edit-schema";
import deleteController from "../delete.controller";

const taxonomyRouter = express.Router();

// GET: List of Taxonomies
taxonomyRouter.get(
  '/',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  listController
);

// GET: Get a Taxonomy by Id
taxonomyRouter.get(
  '/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  detailsController
);

// POST: Create a Taxonomy
taxonomyRouter.post(
  '/create',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ),
  createSchema,
  validateRequest,
  createController
);

// PUT: Edit a Taxonomy
taxonomyRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ),
  editSchema,
  validateRequest,
  editController
);

// DELETE: Delete a Taxonomy
taxonomyRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DELETE, CorePolicies.CoreClaims__ADMIN ] ),
  deleteController
);

export default taxonomyRouter;