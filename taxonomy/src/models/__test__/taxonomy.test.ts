import { TaxonomyTypeEnum } from "@aspianet/common"
import { Taxonomy } from "../taxonomy"
import mongoose from 'mongoose';

it( 'implements optimistic concurrency control', async () => {
  // Create an instance of a taxonomy
  const taxonomy = Taxonomy.build( {
    type: TaxonomyTypeEnum.CATEGORY,
    description: "",
    term: "category 1 for test",
    slug: "category-1-for-test",
    createdBy: new mongoose.Types.ObjectId().toHexString(),
    createdByIp: "127.0.0.1"
  } );

  // Save the taxonomy to the database
  await taxonomy.save();

  // Fetch the taxonomy twice
  const firstInstance = await Taxonomy.findById( taxonomy.id );
  const secondInstance = await Taxonomy.findById( taxonomy.id );

  // Make two separate changes to the taxonomies we fetched
  firstInstance!.set( { term: "cat 1 updated", slug: "cat-1-updated" } );
  firstInstance!.set( { term: "cat 2 updated", slug: "cat-2-updated" } );

  // Save the first fetched taxonomy
  await firstInstance!.save();

  // Save the second fetched taxonomy and expect an error
  try {
    await secondInstance!.save();
  } catch ( err ) {
    return;
  };

  throw new Error( "Should not reach this point" );
} );

it( 'increments the version number on multiple saves', async () => {
  const taxonomy = Taxonomy.build( {
    type: TaxonomyTypeEnum.CATEGORY,
    description: "",
    term: "category 1 for test",
    slug: "category-1-for-test",
    createdBy: new mongoose.Types.ObjectId().toHexString(),
    createdByIp: "127.0.0.1"
  } );

  await taxonomy.save();
  expect( taxonomy.version ).toEqual( 0 );

  await taxonomy.save();
  expect( taxonomy.version ).toEqual( 1 );

  await taxonomy.save();
  expect( taxonomy.version ).toEqual( 2 );
} );