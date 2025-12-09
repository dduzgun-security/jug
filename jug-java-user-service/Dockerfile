FROM maven:3.9-eclipse-temurin-25 AS build

ARG GITHUB_TOKEN
ARG GITHUB_USERNAME=dduzgun-security
ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ENV GITHUB_USERNAME=${GITHUB_USERNAME}

# Build jug-model first
WORKDIR /jug-model
COPY jug-model/jug-model-java/pom.xml ./
COPY jug-model/jug-model-java/src ./src
RUN mvn clean install -DskipTests

# Build user service
WORKDIR /app
COPY jug-java-user-service/pom.xml jug-java-user-service/settings.xml ./
RUN mvn dependency:go-offline -s settings.xml

COPY jug-java-user-service/src ./src
RUN mvn clean package -DskipTests -s settings.xml

FROM gcr.io/distroless/java25-debian13:nonroot

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 50051

ENTRYPOINT ["java", "-jar", "app.jar"]
