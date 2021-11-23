import { Publisher, Subjects, TaxonomyCreatedEvent } from "@aspianet/common";

export class TaxonomyCreatedPublisher extends Publisher<TaxonomyCreatedEvent> {
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
}