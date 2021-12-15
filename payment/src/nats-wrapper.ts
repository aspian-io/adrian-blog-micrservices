import { connect, NatsConnection } from 'nats';

class NatsWrapper {
  private _client?: NatsConnection;

  get client () {
    if ( !this._client ) {
      throw new Error( "Cannot access NATS client" );
    }

    return this._client;
  }

  async connect ( clusterName: string, serverUrls: string | string[] | undefined ): Promise<void> {
    try {
      this._client = await connect( { servers: serverUrls, name: clusterName } );
      console.log( `Connected to ${ this._client.getServer() }` );
    } catch ( error ) {
      console.error( `error connecting to NATS server: `, error );
    }
  }
}

export const natsWrapper = new NatsWrapper();