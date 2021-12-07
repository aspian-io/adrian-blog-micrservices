import { Publisher, Subjects, TaxonomyCreatedEvent } from "@aspianet/common";
import { streamName } from "../stream-name";

export class TaxonomyCreatedPublisher extends Publisher<TaxonomyCreatedEvent> {
  stream = streamName;
  subject: Subjects.TaxonomyCreated = Subjects.TaxonomyCreated;
}