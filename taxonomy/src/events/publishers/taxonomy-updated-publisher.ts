import { Publisher, Subjects, TaxonomyUpdatedEvent } from "@aspianet/common";

export class TaxonomyUpdatedPublisher extends Publisher<TaxonomyUpdatedEvent> {
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;
}