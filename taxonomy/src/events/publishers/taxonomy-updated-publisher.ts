import { Publisher, Subjects, TaxonomyUpdatedEvent } from "@aspianet/common";
import { streamName } from "../stream-name";

export class TaxonomyUpdatedPublisher extends Publisher<TaxonomyUpdatedEvent> {
  stream = streamName;
  subject: Subjects.TaxonomyUpdated = Subjects.TaxonomyUpdated;
}