import { Publisher, Streams, Subjects, TaxonomyDeletedEvent } from "@aspianet/common";

export class TaxonomyDeletedPublisher extends Publisher<TaxonomyDeletedEvent> {
  stream: Streams.Taxonomy = Streams.Taxonomy;
  subject: Subjects.TaxonomyDeleted = Subjects.TaxonomyDeleted;
}