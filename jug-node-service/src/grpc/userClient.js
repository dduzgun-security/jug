import grpc from '@grpc/grpc-js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Import generated protobuf message types from the published package
const { user } = require('@dduzgun-security/jug-model');
const messages = user;

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'localhost:50051';

// Create client using @grpc/grpc-js with the service definition from generated code
const client = new grpc.Client(
  USER_SERVICE_URL,
  grpc.credentials.createInsecure()
);

// Wrap the client methods to use the generated service definition
const userClient = {
  listUsers: (request, callback) => {
    const req = new messages.ListUsersRequest();

    client.makeUnaryRequest(
      '/rating.user.v1.UserService/ListUsers',
      (arg) => arg.serializeBinary(),
      messages.ListUsersResponse.deserializeBinary,
      req,
      callback
    );
  },

  createUser: (userData, callback) => {
    const user = new messages.User();
    user.setFirstName(userData.first_name);
    user.setLastName(userData.last_name);
    user.setEmail(userData.email);
    user.setAge(userData.age || 0);
    user.setPhoneNumber(userData.phone_number || '');
    user.setStatus(userData.status || 'active');

    const request = new messages.CreateUserRequest();
    request.setUser(user);

    client.makeUnaryRequest(
      '/rating.user.v1.UserService/CreateUser',
      (arg) => arg.serializeBinary(),
      messages.CreateUserResponse.deserializeBinary,
      request,
      callback
    );
  },

  getUser: (requestData, callback) => {
    const request = new messages.GetUserRequest();
    request.setUserId(requestData.user_id);

    client.makeUnaryRequest(
      '/rating.user.v1.UserService/GetUser',
      (arg) => arg.serializeBinary(),
      messages.GetUserResponse.deserializeBinary,
      request,
      callback
    );
  }
};

export default userClient;
