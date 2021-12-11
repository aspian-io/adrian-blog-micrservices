export const natsWrapper = {
  natsConnection: {
    jetstreamManager: jest.fn( () => Promise.resolve( {
      streams: {
        info: jest.fn( ( stream: string ) => Promise.resolve( {} ) )
      }
    } ) ),
    jetstream: jest.fn().mockReturnThis(),
    publish: jest.fn().mockImplementation( ( subject: string, data?: Uint8Array | undefined ) => {
      return Promise.resolve( {} );
    } ).mockReturnThis()
  }
};

