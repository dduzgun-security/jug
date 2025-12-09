// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var rating_poutine_v1_poutine_pb = require('../../../rating/poutine/v1/poutine_pb.js');

function serialize_rating_poutine_v1_CreateRatingRequest(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.CreateRatingRequest)) {
    throw new Error('Expected argument of type rating.poutine.v1.CreateRatingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_CreateRatingRequest(buffer_arg) {
  return rating_poutine_v1_poutine_pb.CreateRatingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_CreateRatingResponse(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.CreateRatingResponse)) {
    throw new Error('Expected argument of type rating.poutine.v1.CreateRatingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_CreateRatingResponse(buffer_arg) {
  return rating_poutine_v1_poutine_pb.CreateRatingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_GetRatingRequest(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.GetRatingRequest)) {
    throw new Error('Expected argument of type rating.poutine.v1.GetRatingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_GetRatingRequest(buffer_arg) {
  return rating_poutine_v1_poutine_pb.GetRatingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_GetRatingResponse(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.GetRatingResponse)) {
    throw new Error('Expected argument of type rating.poutine.v1.GetRatingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_GetRatingResponse(buffer_arg) {
  return rating_poutine_v1_poutine_pb.GetRatingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_ListRatingsByRestaurantRequest(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.ListRatingsByRestaurantRequest)) {
    throw new Error('Expected argument of type rating.poutine.v1.ListRatingsByRestaurantRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_ListRatingsByRestaurantRequest(buffer_arg) {
  return rating_poutine_v1_poutine_pb.ListRatingsByRestaurantRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_ListRatingsByRestaurantResponse(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.ListRatingsByRestaurantResponse)) {
    throw new Error('Expected argument of type rating.poutine.v1.ListRatingsByRestaurantResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_ListRatingsByRestaurantResponse(buffer_arg) {
  return rating_poutine_v1_poutine_pb.ListRatingsByRestaurantResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_ListRatingsRequest(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.ListRatingsRequest)) {
    throw new Error('Expected argument of type rating.poutine.v1.ListRatingsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_ListRatingsRequest(buffer_arg) {
  return rating_poutine_v1_poutine_pb.ListRatingsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_poutine_v1_ListRatingsResponse(arg) {
  if (!(arg instanceof rating_poutine_v1_poutine_pb.ListRatingsResponse)) {
    throw new Error('Expected argument of type rating.poutine.v1.ListRatingsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_poutine_v1_ListRatingsResponse(buffer_arg) {
  return rating_poutine_v1_poutine_pb.ListRatingsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PoutineServiceService = exports.PoutineServiceService = {
  createRating: {
    path: '/rating.poutine.v1.PoutineService/CreateRating',
    requestStream: false,
    responseStream: false,
    requestType: rating_poutine_v1_poutine_pb.CreateRatingRequest,
    responseType: rating_poutine_v1_poutine_pb.CreateRatingResponse,
    requestSerialize: serialize_rating_poutine_v1_CreateRatingRequest,
    requestDeserialize: deserialize_rating_poutine_v1_CreateRatingRequest,
    responseSerialize: serialize_rating_poutine_v1_CreateRatingResponse,
    responseDeserialize: deserialize_rating_poutine_v1_CreateRatingResponse,
  },
  getRating: {
    path: '/rating.poutine.v1.PoutineService/GetRating',
    requestStream: false,
    responseStream: false,
    requestType: rating_poutine_v1_poutine_pb.GetRatingRequest,
    responseType: rating_poutine_v1_poutine_pb.GetRatingResponse,
    requestSerialize: serialize_rating_poutine_v1_GetRatingRequest,
    requestDeserialize: deserialize_rating_poutine_v1_GetRatingRequest,
    responseSerialize: serialize_rating_poutine_v1_GetRatingResponse,
    responseDeserialize: deserialize_rating_poutine_v1_GetRatingResponse,
  },
  listRatings: {
    path: '/rating.poutine.v1.PoutineService/ListRatings',
    requestStream: false,
    responseStream: false,
    requestType: rating_poutine_v1_poutine_pb.ListRatingsRequest,
    responseType: rating_poutine_v1_poutine_pb.ListRatingsResponse,
    requestSerialize: serialize_rating_poutine_v1_ListRatingsRequest,
    requestDeserialize: deserialize_rating_poutine_v1_ListRatingsRequest,
    responseSerialize: serialize_rating_poutine_v1_ListRatingsResponse,
    responseDeserialize: deserialize_rating_poutine_v1_ListRatingsResponse,
  },
  listRatingsByRestaurant: {
    path: '/rating.poutine.v1.PoutineService/ListRatingsByRestaurant',
    requestStream: false,
    responseStream: false,
    requestType: rating_poutine_v1_poutine_pb.ListRatingsByRestaurantRequest,
    responseType: rating_poutine_v1_poutine_pb.ListRatingsByRestaurantResponse,
    requestSerialize: serialize_rating_poutine_v1_ListRatingsByRestaurantRequest,
    requestDeserialize: deserialize_rating_poutine_v1_ListRatingsByRestaurantRequest,
    responseSerialize: serialize_rating_poutine_v1_ListRatingsByRestaurantResponse,
    responseDeserialize: deserialize_rating_poutine_v1_ListRatingsByRestaurantResponse,
  },
};

exports.PoutineServiceClient = grpc.makeGenericClientConstructor(PoutineServiceService, 'PoutineService');
