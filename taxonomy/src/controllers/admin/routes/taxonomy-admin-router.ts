import { authorize, CorePolicies, requireAuth, TaxonomyPolicies, validateRequest } from "@aspianet/common";
import express from "express";
import createController from "../create.controller";
import detailsController from "../details.controller";
import editController from "../edit.controller";
import listController from "../list.controller";
import createSchema from "../../../validation-schemas/create-schema";
import editSchema from "../../../validation-schemas/edit-schema";
import deleteController from "../delete.controller";

const taxonomyAdminRouter = express.Router();

// GET: List of Taxonomies
taxonomyAdminRouter.get(
  '/',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  listController
);

// GET: Get a Taxonomy by Id
taxonomyAdminRouter.get(
  '/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  detailsController
);

// POST: Create a Taxonomy
taxonomyAdminRouter.post(
  '/create',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ),
  createSchema,
  validateRequest,
  createController
);

// PUT: Edit a Taxonomy
taxonomyAdminRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ),
  editSchema,
  validateRequest,
  editController
);

// DELETE: Delete a Taxonomy
taxonomyAdminRouter.delete(
  '/delete/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DELETE, CorePolicies.CoreClaims__ADMIN ] ),
  deleteController
);

export default taxonomyAdminRouter;