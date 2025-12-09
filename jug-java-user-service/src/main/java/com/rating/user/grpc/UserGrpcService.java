package com.rating.user.grpc;

import com.rating.user.entity.UserEntity;
import com.rating.user.service.UserService;
import com.rating.user.v1.User;
import com.rating.user.v1.UserServiceGrpc;
import com.rating.user.v1.CreateUserRequest;
import com.rating.user.v1.CreateUserResponse;
import com.rating.user.v1.GetUserRequest;
import com.rating.user.v1.GetUserResponse;
import com.rating.user.v1.ListUsersRequest;
import com.rating.user.v1.ListUsersResponse;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@GrpcService
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {

    private static final Logger log = LoggerFactory.getLogger(UserGrpcService.class);
    private final UserService userService;

    public UserGrpcService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<CreateUserResponse> responseObserver) {
        try {
            log.info("gRPC: Creating user {}", request.getUser().getEmail());

            UserEntity entity = UserEntity.builder()
                .firstName(request.getUser().getFirstName())
                .lastName(request.getUser().getLastName())
                .email(request.getUser().getEmail())
                .age(request.getUser().getAge())
                .phoneNumber(request.getUser().getPhoneNumber())
                .status(request.getUser().getStatus())
                .build();

            UserEntity saved = userService.createUser(entity);

            CreateUserResponse response = CreateUserResponse.newBuilder()
                .setUser(toProto(saved))
                .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            log.error("Error creating user", e);
            responseObserver.onError(Status.INTERNAL
                .withDescription(e.getMessage())
                .asRuntimeException());
        }
    }

    @Override
    public void getUser(GetUserRequest request, StreamObserver<GetUserResponse> responseObserver) {
        try {
            log.info("gRPC: Getting user {}", request.getUserId());

            UserEntity user = userService.getUserById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

            GetUserResponse response = GetUserResponse.newBuilder()
                .setUser(toProto(user))
                .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            log.error("Error getting user", e);
            responseObserver.onError(Status.NOT_FOUND
                .withDescription(e.getMessage())
                .asRuntimeException());
        }
    }

    @Override
    public void listUsers(ListUsersRequest request, StreamObserver<ListUsersResponse> responseObserver) {
        try {
            log.info("gRPC: Listing all users");

            List<User> users = userService.getAllUsers().stream()
                .map(this::toProto)
                .collect(Collectors.toList());

            ListUsersResponse response = ListUsersResponse.newBuilder()
                .addAllUsers(users)
                .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } catch (Exception e) {
            log.error("Error listing users", e);
            responseObserver.onError(Status.INTERNAL
                .withDescription(e.getMessage())
                .asRuntimeException());
        }
    }

    private User toProto(UserEntity entity) {
        return User.newBuilder()
            .setFirstName(entity.getFirstName())
            .setLastName(entity.getLastName())
            .setEmail(entity.getEmail())
            .setAge(entity.getAge() != null ? entity.getAge() : 0)
            .setPhoneNumber(entity.getPhoneNumber() != null ? entity.getPhoneNumber() : "")
            .setStatus(entity.getStatus())
            .build();
    }
}
