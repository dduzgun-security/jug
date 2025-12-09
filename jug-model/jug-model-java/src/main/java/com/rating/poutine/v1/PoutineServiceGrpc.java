package com.rating.poutine.v1;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@io.grpc.stub.annotations.GrpcGenerated
public final class PoutineServiceGrpc {

  private PoutineServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "rating.poutine.v1.PoutineService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.rating.poutine.v1.CreateRatingRequest,
      com.rating.poutine.v1.CreateRatingResponse> getCreateRatingMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateRating",
      requestType = com.rating.poutine.v1.CreateRatingRequest.class,
      responseType = com.rating.poutine.v1.CreateRatingResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.rating.poutine.v1.CreateRatingRequest,
      com.rating.poutine.v1.CreateRatingResponse> getCreateRatingMethod() {
    io.grpc.MethodDescriptor<com.rating.poutine.v1.CreateRatingRequest, com.rating.poutine.v1.CreateRatingResponse> getCreateRatingMethod;
    if ((getCreateRatingMethod = PoutineServiceGrpc.getCreateRatingMethod) == null) {
      synchronized (PoutineServiceGrpc.class) {
        if ((getCreateRatingMethod = PoutineServiceGrpc.getCreateRatingMethod) == null) {
          PoutineServiceGrpc.getCreateRatingMethod = getCreateRatingMethod =
              io.grpc.MethodDescriptor.<com.rating.poutine.v1.CreateRatingRequest, com.rating.poutine.v1.CreateRatingResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateRating"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.CreateRatingRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.CreateRatingResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PoutineServiceMethodDescriptorSupplier("CreateRating"))
              .build();
        }
      }
    }
    return getCreateRatingMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.rating.poutine.v1.GetRatingRequest,
      com.rating.poutine.v1.GetRatingResponse> getGetRatingMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetRating",
      requestType = com.rating.poutine.v1.GetRatingRequest.class,
      responseType = com.rating.poutine.v1.GetRatingResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.rating.poutine.v1.GetRatingRequest,
      com.rating.poutine.v1.GetRatingResponse> getGetRatingMethod() {
    io.grpc.MethodDescriptor<com.rating.poutine.v1.GetRatingRequest, com.rating.poutine.v1.GetRatingResponse> getGetRatingMethod;
    if ((getGetRatingMethod = PoutineServiceGrpc.getGetRatingMethod) == null) {
      synchronized (PoutineServiceGrpc.class) {
        if ((getGetRatingMethod = PoutineServiceGrpc.getGetRatingMethod) == null) {
          PoutineServiceGrpc.getGetRatingMethod = getGetRatingMethod =
              io.grpc.MethodDescriptor.<com.rating.poutine.v1.GetRatingRequest, com.rating.poutine.v1.GetRatingResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetRating"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.GetRatingRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.GetRatingResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PoutineServiceMethodDescriptorSupplier("GetRating"))
              .build();
        }
      }
    }
    return getGetRatingMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.rating.poutine.v1.ListRatingsRequest,
      com.rating.poutine.v1.ListRatingsResponse> getListRatingsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListRatings",
      requestType = com.rating.poutine.v1.ListRatingsRequest.class,
      responseType = com.rating.poutine.v1.ListRatingsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.rating.poutine.v1.ListRatingsRequest,
      com.rating.poutine.v1.ListRatingsResponse> getListRatingsMethod() {
    io.grpc.MethodDescriptor<com.rating.poutine.v1.ListRatingsRequest, com.rating.poutine.v1.ListRatingsResponse> getListRatingsMethod;
    if ((getListRatingsMethod = PoutineServiceGrpc.getListRatingsMethod) == null) {
      synchronized (PoutineServiceGrpc.class) {
        if ((getListRatingsMethod = PoutineServiceGrpc.getListRatingsMethod) == null) {
          PoutineServiceGrpc.getListRatingsMethod = getListRatingsMethod =
              io.grpc.MethodDescriptor.<com.rating.poutine.v1.ListRatingsRequest, com.rating.poutine.v1.ListRatingsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListRatings"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.ListRatingsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.ListRatingsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PoutineServiceMethodDescriptorSupplier("ListRatings"))
              .build();
        }
      }
    }
    return getListRatingsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.rating.poutine.v1.ListRatingsByRestaurantRequest,
      com.rating.poutine.v1.ListRatingsByRestaurantResponse> getListRatingsByRestaurantMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ListRatingsByRestaurant",
      requestType = com.rating.poutine.v1.ListRatingsByRestaurantRequest.class,
      responseType = com.rating.poutine.v1.ListRatingsByRestaurantResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.rating.poutine.v1.ListRatingsByRestaurantRequest,
      com.rating.poutine.v1.ListRatingsByRestaurantResponse> getListRatingsByRestaurantMethod() {
    io.grpc.MethodDescriptor<com.rating.poutine.v1.ListRatingsByRestaurantRequest, com.rating.poutine.v1.ListRatingsByRestaurantResponse> getListRatingsByRestaurantMethod;
    if ((getListRatingsByRestaurantMethod = PoutineServiceGrpc.getListRatingsByRestaurantMethod) == null) {
      synchronized (PoutineServiceGrpc.class) {
        if ((getListRatingsByRestaurantMethod = PoutineServiceGrpc.getListRatingsByRestaurantMethod) == null) {
          PoutineServiceGrpc.getListRatingsByRestaurantMethod = getListRatingsByRestaurantMethod =
              io.grpc.MethodDescriptor.<com.rating.poutine.v1.ListRatingsByRestaurantRequest, com.rating.poutine.v1.ListRatingsByRestaurantResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ListRatingsByRestaurant"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.ListRatingsByRestaurantRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.rating.poutine.v1.ListRatingsByRestaurantResponse.getDefaultInstance()))
              .setSchemaDescriptor(new PoutineServiceMethodDescriptorSupplier("ListRatingsByRestaurant"))
              .build();
        }
      }
    }
    return getListRatingsByRestaurantMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static PoutineServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PoutineServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PoutineServiceStub>() {
        @java.lang.Override
        public PoutineServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PoutineServiceStub(channel, callOptions);
        }
      };
    return PoutineServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports all types of calls on the service
   */
  public static PoutineServiceBlockingV2Stub newBlockingV2Stub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PoutineServiceBlockingV2Stub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PoutineServiceBlockingV2Stub>() {
        @java.lang.Override
        public PoutineServiceBlockingV2Stub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PoutineServiceBlockingV2Stub(channel, callOptions);
        }
      };
    return PoutineServiceBlockingV2Stub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static PoutineServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PoutineServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PoutineServiceBlockingStub>() {
        @java.lang.Override
        public PoutineServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PoutineServiceBlockingStub(channel, callOptions);
        }
      };
    return PoutineServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static PoutineServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<PoutineServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<PoutineServiceFutureStub>() {
        @java.lang.Override
        public PoutineServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new PoutineServiceFutureStub(channel, callOptions);
        }
      };
    return PoutineServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void createRating(com.rating.poutine.v1.CreateRatingRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.CreateRatingResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateRatingMethod(), responseObserver);
    }

    /**
     */
    default void getRating(com.rating.poutine.v1.GetRatingRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.GetRatingResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetRatingMethod(), responseObserver);
    }

    /**
     */
    default void listRatings(com.rating.poutine.v1.ListRatingsRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.ListRatingsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListRatingsMethod(), responseObserver);
    }

    /**
     */
    default void listRatingsByRestaurant(com.rating.poutine.v1.ListRatingsByRestaurantRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.ListRatingsByRestaurantResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getListRatingsByRestaurantMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service PoutineService.
   */
  public static abstract class PoutineServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return PoutineServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service PoutineService.
   */
  public static final class PoutineServiceStub
      extends io.grpc.stub.AbstractAsyncStub<PoutineServiceStub> {
    private PoutineServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PoutineServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PoutineServiceStub(channel, callOptions);
    }

    /**
     */
    public void createRating(com.rating.poutine.v1.CreateRatingRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.CreateRatingResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateRatingMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void getRating(com.rating.poutine.v1.GetRatingRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.GetRatingResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetRatingMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listRatings(com.rating.poutine.v1.ListRatingsRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.ListRatingsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListRatingsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void listRatingsByRestaurant(com.rating.poutine.v1.ListRatingsByRestaurantRequest request,
        io.grpc.stub.StreamObserver<com.rating.poutine.v1.ListRatingsByRestaurantResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getListRatingsByRestaurantMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service PoutineService.
   */
  public static final class PoutineServiceBlockingV2Stub
      extends io.grpc.stub.AbstractBlockingStub<PoutineServiceBlockingV2Stub> {
    private PoutineServiceBlockingV2Stub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PoutineServiceBlockingV2Stub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PoutineServiceBlockingV2Stub(channel, callOptions);
    }

    /**
     */
    public com.rating.poutine.v1.CreateRatingResponse createRating(com.rating.poutine.v1.CreateRatingRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getCreateRatingMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.rating.poutine.v1.GetRatingResponse getRating(com.rating.poutine.v1.GetRatingRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getGetRatingMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.rating.poutine.v1.ListRatingsResponse listRatings(com.rating.poutine.v1.ListRatingsRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getListRatingsMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.rating.poutine.v1.ListRatingsByRestaurantResponse listRatingsByRestaurant(com.rating.poutine.v1.ListRatingsByRestaurantRequest request) throws io.grpc.StatusException {
      return io.grpc.stub.ClientCalls.blockingV2UnaryCall(
          getChannel(), getListRatingsByRestaurantMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do limited synchronous rpc calls to service PoutineService.
   */
  public static final class PoutineServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<PoutineServiceBlockingStub> {
    private PoutineServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PoutineServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PoutineServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.rating.poutine.v1.CreateRatingResponse createRating(com.rating.poutine.v1.CreateRatingRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateRatingMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.rating.poutine.v1.GetRatingResponse getRating(com.rating.poutine.v1.GetRatingRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetRatingMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.rating.poutine.v1.ListRatingsResponse listRatings(com.rating.poutine.v1.ListRatingsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListRatingsMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.rating.poutine.v1.ListRatingsByRestaurantResponse listRatingsByRestaurant(com.rating.poutine.v1.ListRatingsByRestaurantRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getListRatingsByRestaurantMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service PoutineService.
   */
  public static final class PoutineServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<PoutineServiceFutureStub> {
    private PoutineServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected PoutineServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new PoutineServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.rating.poutine.v1.CreateRatingResponse> createRating(
        com.rating.poutine.v1.CreateRatingRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateRatingMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.rating.poutine.v1.GetRatingResponse> getRating(
        com.rating.poutine.v1.GetRatingRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetRatingMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.rating.poutine.v1.ListRatingsResponse> listRatings(
        com.rating.poutine.v1.ListRatingsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListRatingsMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.rating.poutine.v1.ListRatingsByRestaurantResponse> listRatingsByRestaurant(
        com.rating.poutine.v1.ListRatingsByRestaurantRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getListRatingsByRestaurantMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_RATING = 0;
  private static final int METHODID_GET_RATING = 1;
  private static final int METHODID_LIST_RATINGS = 2;
  private static final int METHODID_LIST_RATINGS_BY_RESTAURANT = 3;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_CREATE_RATING:
          serviceImpl.createRating((com.rating.poutine.v1.CreateRatingRequest) request,
              (io.grpc.stub.StreamObserver<com.rating.poutine.v1.CreateRatingResponse>) responseObserver);
          break;
        case METHODID_GET_RATING:
          serviceImpl.getRating((com.rating.poutine.v1.GetRatingRequest) request,
              (io.grpc.stub.StreamObserver<com.rating.poutine.v1.GetRatingResponse>) responseObserver);
          break;
        case METHODID_LIST_RATINGS:
          serviceImpl.listRatings((com.rating.poutine.v1.ListRatingsRequest) request,
              (io.grpc.stub.StreamObserver<com.rating.poutine.v1.ListRatingsResponse>) responseObserver);
          break;
        case METHODID_LIST_RATINGS_BY_RESTAURANT:
          serviceImpl.listRatingsByRestaurant((com.rating.poutine.v1.ListRatingsByRestaurantRequest) request,
              (io.grpc.stub.StreamObserver<com.rating.poutine.v1.ListRatingsByRestaurantResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getCreateRatingMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.rating.poutine.v1.CreateRatingRequest,
              com.rating.poutine.v1.CreateRatingResponse>(
                service, METHODID_CREATE_RATING)))
        .addMethod(
          getGetRatingMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.rating.poutine.v1.GetRatingRequest,
              com.rating.poutine.v1.GetRatingResponse>(
                service, METHODID_GET_RATING)))
        .addMethod(
          getListRatingsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.rating.poutine.v1.ListRatingsRequest,
              com.rating.poutine.v1.ListRatingsResponse>(
                service, METHODID_LIST_RATINGS)))
        .addMethod(
          getListRatingsByRestaurantMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.rating.poutine.v1.ListRatingsByRestaurantRequest,
              com.rating.poutine.v1.ListRatingsByRestaurantResponse>(
                service, METHODID_LIST_RATINGS_BY_RESTAURANT)))
        .build();
  }

  private static abstract class PoutineServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    PoutineServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.rating.poutine.v1.PoutineProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("PoutineService");
    }
  }

  private static final class PoutineServiceFileDescriptorSupplier
      extends PoutineServiceBaseDescriptorSupplier {
    PoutineServiceFileDescriptorSupplier() {}
  }

  private static final class PoutineServiceMethodDescriptorSupplier
      extends PoutineServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    PoutineServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (PoutineServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new PoutineServiceFileDescriptorSupplier())
              .addMethod(getCreateRatingMethod())
              .addMethod(getGetRatingMethod())
              .addMethod(getListRatingsMethod())
              .addMethod(getListRatingsByRestaurantMethod())
              .build();
        }
      }
    }
    return result;
  }
}
