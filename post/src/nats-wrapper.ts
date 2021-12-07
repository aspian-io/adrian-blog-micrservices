import { connect, NatsConnection } from 'nats';

class NatsWrapper {
  private _natsConnection?: NatsConnection;

  get natsConnection () {
    if ( !this._natsConnection ) {
      throw new Error( "Cannot access NATS connection" );
    }

    return this._natsConnection;
  }

  async connect ( clusterName: string, serverUrls: string | string[] | undefined ): Promise<void> {
    try {
      this._natsConnection = await connect( { servers: serverUrls, name: clusterName } );
      console.log( `Connected to ${ this._natsConnection.getServer() }` );
    } catch ( error ) {
      console.error( `error connecting to NATS server: `, error );
    }
  }
}

export const natsWrapper = new NatsWrapper();