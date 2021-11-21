import { authorize, CorePolicies, requireAuth, validateRequest } from "@aspianet/common";
import express from "express";
import create from "../create";
import details from "../details";
import edit from "../edit";
import list from "../list";
import createSchema from "../../../validation-schemas/create-schema";
import { TaxonomyPolicies } from "./taxonomy-policies";
import editSchema from "../../../validation-schemas/edit-schema";

const taxonomyRouter = express.Router();

// GET: List of Taxonomies
taxonomyRouter.get(
  '/',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  list
);

// GET: Get a Taxonomy by Id
taxonomyRouter.get(
  '/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ),
  details
);

// POST: Create a Taxonomy
taxonomyRouter.post(
  '/create',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ),
  createSchema,
  validateRequest,
  create
);

// PUT: Edit a Taxonomy
taxonomyRouter.put(
  '/edit/:id',
  requireAuth,
  authorize( [ TaxonomyPolicies.TaxonomyClaims__EDIT, CorePolicies.CoreClaims__ADMIN ] ),
  editSchema,
  validateRequest,
  edit
);

export default taxonomyRouter;