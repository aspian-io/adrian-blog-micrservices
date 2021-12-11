import { Publisher, Streams, Subjects, TaxonomyCreatedEvent } from "@aspianet/common";

export class TaxonomyCreatedPublisher extends Publisher<TaxonomyCreatedEvent> {
  stream: Streams.Taxonomy = Streams.Taxonomy;
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
}