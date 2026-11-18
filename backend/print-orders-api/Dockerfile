FROM eclipse-temurin:17-jre-alpine AS java
COPY target/print-orders-api-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]