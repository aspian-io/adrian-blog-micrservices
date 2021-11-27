import Queue from 'bull';

interface Payload {
  postId: string;
}

const expirationQueue = new Queue<Payload>( 'post:expiration', {
  redis: {
    host: process.env.REDIS_HOST
  }
} );

expirationQueue.process( async ( job ) => {
  console.log( 'I want to publish and expiration:complete event for postId', job.data.postId );
} );

export { expirationQueue };