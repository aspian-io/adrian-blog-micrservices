import { Publisher, Streams, Subjects, TaxonomyUpdatedEvent } from "@aspianet/common";

export class TaxonomyUpdatedPublisher extends Publisher<TaxonomyUpdatedEvent> {
  stream: Streams.Taxonomy = Streams.Taxonomy;
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;
}