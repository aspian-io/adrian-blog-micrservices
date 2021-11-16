import { authorize, requireAuth, validateRequest } from "@aspianet/common";
import express from "express";
import create from "../controllers/create";
import createSchema from "../validation-schemas/create-schema";
import { TaxonomyPolicies } from "./taxonomy-policies";

const taxonomyRouter = express.Router();

taxonomyRouter.post( '/create', requireAuth, authorize( TaxonomyPolicies.TaxonomyClaims__CREATE ), createSchema, validateRequest, create );

export default taxonomyRouter;