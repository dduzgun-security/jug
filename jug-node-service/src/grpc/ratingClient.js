import grpc from '@grpc/grpc-js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Import generated protobuf message types from the published package
const { poutine } = require('@dduzgun-security/jug-model');
const messages = poutine;

const RATING_SERVICE_URL = process.env.RATING_SERVICE_URL || 'localhost:50052';

// Create client using @grpc/grpc-js with the service definition from generated code
const client = new grpc.Client(
  RATING_SERVICE_URL,
  grpc.credentials.createInsecure()
);

// Wrap the client methods to use the generated service definition
const ratingClient = {
  listRatings: (request, callback) => {
    const req = new messages.ListRatingsRequest();

    client.makeUnaryRequest(
      '/rating.poutine.v1.PoutineService/ListRatings',
      (arg) => arg.serializeBinary(),
      messages.ListRatingsResponse.deserializeBinary,
      req,
      callback
    );
  },

  createRating: (ratingData, callback) => {
    const poutine = new messages.Poutine();
    poutine.setRestaurant(ratingData.restaurant);
    poutine.setCheeseSqueakiness(ratingData.cheese_squeakiness);
    poutine.setGravyThickness(ratingData.gravy_thickness);
    poutine.setFriesCrispiness(ratingData.fries_crispiness);
    poutine.setSize(ratingData.size || '');
    poutine.setComments(ratingData.comments || '');

    const request = new messages.CreateRatingRequest();
    request.setUserId(ratingData.user_id);
    request.setRating(poutine);

    client.makeUnaryRequest(
      '/rating.poutine.v1.PoutineService/CreateRating',
      (arg) => arg.serializeBinary(),
      messages.CreateRatingResponse.deserializeBinary,
      request,
      callback
    );
  },

  getRating: (requestData, callback) => {
    const request = new messages.GetRatingRequest();
    request.setRatingId(requestData.rating_id);

    client.makeUnaryRequest(
      '/rating.poutine.v1.PoutineService/GetRating',
      (arg) => arg.serializeBinary(),
      messages.GetRatingResponse.deserializeBinary,
      request,
      callback
    );
  }
};

export default ratingClient;
