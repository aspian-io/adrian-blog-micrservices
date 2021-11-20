import { authorize, CorePolicies, requireAuth, validateRequest } from "@aspianet/common";
import express from "express";
import create from "../controllers/create";
import details from "../controllers/details";
import createSchema from "../validation-schemas/create-schema";
import { TaxonomyPolicies } from "./taxonomy-policies";

const taxonomyRouter = express.Router();

taxonomyRouter.post( '/create', requireAuth, authorize( [ TaxonomyPolicies.TaxonomyClaims__CREATE, CorePolicies.CoreClaims__ADMIN ] ), createSchema, validateRequest, create );
taxonomyRouter.get( '/:id', requireAuth, authorize( [ TaxonomyPolicies.TaxonomyClaims__DETAILS, CorePolicies.CoreClaims__ADMIN ] ), details );

export default taxonomyRouter;