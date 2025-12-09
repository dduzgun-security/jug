// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var rating_user_v1_user_pb = require('../../../rating/user/v1/user_pb.js');

function serialize_rating_user_v1_CreateUserRequest(arg) {
  if (!(arg instanceof rating_user_v1_user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type rating.user.v1.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_user_v1_CreateUserRequest(buffer_arg) {
  return rating_user_v1_user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_user_v1_CreateUserResponse(arg) {
  if (!(arg instanceof rating_user_v1_user_pb.CreateUserResponse)) {
    throw new Error('Expected argument of type rating.user.v1.CreateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_user_v1_CreateUserResponse(buffer_arg) {
  return rating_user_v1_user_pb.CreateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_user_v1_GetUserRequest(arg) {
  if (!(arg instanceof rating_user_v1_user_pb.GetUserRequest)) {
    throw new Error('Expected argument of type rating.user.v1.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_user_v1_GetUserRequest(buffer_arg) {
  return rating_user_v1_user_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_user_v1_GetUserResponse(arg) {
  if (!(arg instanceof rating_user_v1_user_pb.GetUserResponse)) {
    throw new Error('Expected argument of type rating.user.v1.GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_user_v1_GetUserResponse(buffer_arg) {
  return rating_user_v1_user_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_user_v1_ListUsersRequest(arg) {
  if (!(arg instanceof rating_user_v1_user_pb.ListUsersRequest)) {
    throw new Error('Expected argument of type rating.user.v1.ListUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_user_v1_ListUsersRequest(buffer_arg) {
  return rating_user_v1_user_pb.ListUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_rating_user_v1_ListUsersResponse(arg) {
  if (!(arg instanceof rating_user_v1_user_pb.ListUsersResponse)) {
    throw new Error('Expected argument of type rating.user.v1.ListUsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_rating_user_v1_ListUsersResponse(buffer_arg) {
  return rating_user_v1_user_pb.ListUsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  createUser: {
    path: '/rating.user.v1.UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: rating_user_v1_user_pb.CreateUserRequest,
    responseType: rating_user_v1_user_pb.CreateUserResponse,
    requestSerialize: serialize_rating_user_v1_CreateUserRequest,
    requestDeserialize: deserialize_rating_user_v1_CreateUserRequest,
    responseSerialize: serialize_rating_user_v1_CreateUserResponse,
    responseDeserialize: deserialize_rating_user_v1_CreateUserResponse,
  },
  getUser: {
    path: '/rating.user.v1.UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: rating_user_v1_user_pb.GetUserRequest,
    responseType: rating_user_v1_user_pb.GetUserResponse,
    requestSerialize: serialize_rating_user_v1_GetUserRequest,
    requestDeserialize: deserialize_rating_user_v1_GetUserRequest,
    responseSerialize: serialize_rating_user_v1_GetUserResponse,
    responseDeserialize: deserialize_rating_user_v1_GetUserResponse,
  },
  listUsers: {
    path: '/rating.user.v1.UserService/ListUsers',
    requestStream: false,
    responseStream: false,
    requestType: rating_user_v1_user_pb.ListUsersRequest,
    responseType: rating_user_v1_user_pb.ListUsersResponse,
    requestSerialize: serialize_rating_user_v1_ListUsersRequest,
    requestDeserialize: deserialize_rating_user_v1_ListUsersRequest,
    responseSerialize: serialize_rating_user_v1_ListUsersResponse,
    responseDeserialize: deserialize_rating_user_v1_ListUsersResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService, 'UserService');
