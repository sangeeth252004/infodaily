---
title: "How to Fix 'No qualifying bean of type [X] available' Error in Spring Boot"
date: "2026-06-05T12:36:07.186Z"
slug: "how-to-fix-no-qualifying-bean-of-type-x-available-error-in-spring-boot"
type: "how-to"
description: "Learn how to resolve the common 'No qualifying bean of type [X] available' error in Spring Boot with this comprehensive step-by-step guide."
keywords: "Spring Boot, Java, Error, Bean, Dependency Injection, Configuration, Troubleshooting, Software Development"
---

The Spring Framework, and by extension Spring Boot, is built around the concept of Dependency Injection (DI). DI allows components to be automatically wired together without explicit instantiation. When Spring Boot starts, it scans your project for classes annotated with specific stereotypes (like `@Component`, `@Service`, `@Repository`, `@Controller`) and other configuration classes to create and manage "beans" – the objects that Spring controls.

### Problem Explanation

You've likely encountered the dreaded `No qualifying bean of type [X] available` error when running your Spring Boot application. This error message, often seen in your application logs or console output, indicates that Spring's dependency injection container couldn't find a suitable bean to inject into a particular place. The `[X]` in the error message will be replaced by the specific Java type (class or interface) that Spring was trying to find. For example, you might see `No qualifying bean of type [com.example.MyService] available` or `No qualifying bean of type [org.springframework.data.jpa.repository.JpaRepository] available`. This stops your application from starting because a critical dependency is missing.

### Why It Happens

This error fundamentally means that Spring's ApplicationContext, the central hub for managing your application's beans, was asked to provide an instance of a specific type, but it couldn't find any registered bean that matches that type. There are several common reasons why this might occur. Perhaps the class that should be a bean is missing the appropriate Spring annotation (`@Component`, `@Service`, etc.). Alternatively, if you're using interfaces, Spring might not know which concrete implementation to use, especially if multiple implementations exist. Another frequent cause is that the Spring component scan is not configured correctly, or the class resides in a package that Spring isn't looking at. Finally, conditional configurations might be preventing the bean from being created under certain circumstances.

### Step-by-Step Solution

Let's walk through how to diagnose and fix this common Spring Boot error.

## Step 1: Verify Spring Component Scanning

The most common culprit is that Spring simply isn't aware of the class you're trying to use as a bean. Spring Boot, by default, scans for components in the package of your main application class and all its sub-packages.

**Action:**
1.  **Locate your main application class:** This is typically the class annotated with `@SpringBootApplication`. It often looks something like this:

    ```java
    package com.example.myapp;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;

    @SpringBootApplication
    public class MyappApplication {

        public static void main(String[] args) {
            SpringApplication.run(MyappApplication.class, args);
        }
    }
    ```

2.  **Check the package structure:** Ensure that the class you expect to be a bean (e.g., `MyService`) and the class that needs to inject it (e.g., a `MyController`) are within the same package as your `@SpringBootApplication` class, or within a sub-package.

    *   **Example:** If `MyappApplication` is in `com.example.myapp`, then `MyService` should be in `com.example.myapp` or a sub-package like `com.example.myapp.service`.

3.  **If your beans are in a different base package:** You can explicitly tell Spring where to scan using the `scanBasePackages` attribute of the `@SpringBootApplication` annotation (or `@ComponentScan` if you're not using `@SpringBootApplication` for everything):

    ```java
    package com.example.myapp;

    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;

    @SpringBootApplication(scanBasePackages = {"com.example.myapp", "com.example.anotherpackage"})
    public class MyappApplication {
        // ... main method
    }
    ```
    Or, if you have a more complex setup:
    ```java
    package com.example.myapp;

    import org.springframework.boot.SpringApplication;
    import org.springframework.context.annotation.ComponentScan;

    @SpringBootApplication
    @ComponentScan(basePackages = {"com.example.myapp", "com.example.anotherpackage"})
    public class MyappApplication {
        // ... main method
    }
    ```

## Step 2: Ensure Correct Bean Annotations

For Spring to manage a class as a bean, it needs to be explicitly told. The most common annotations are:

*   `@Component`: Generic stereotype for any managed component.
*   `@Service`: Stereoype for service layer components.
*   `@Repository`: Stereoype for data access layer components.
*   `@Controller` (or `@RestController`): Stereoype for MVC controllers.
*   `@Configuration`: Indicates that a class is a source of bean definitions.

**Action:**
1.  **Examine the class causing the error:** Find the definition of the type `[X]` mentioned in the error message.
2.  **Add a stereotype annotation:** If this class should be a Spring bean, ensure it has one of the above annotations.

    **Example:** If `MyService` is the missing bean:

    ```java
    package com.example.myapp.service;

    // Add @Service annotation
    @Service
    public class MyService {
        // ... service logic
    }
    ```
    If `MyService` is an interface, you'll need to annotate its concrete implementation.

## Step 3: Resolve Interface and Multiple Implementations

When you inject an interface, Spring needs to know which concrete implementation to use if there's more than one available. The error message will still be `No qualifying bean of type [X] available` where `[X]` is the interface type.

**Action:**
1.  **Identify the interface and its implementations:** Determine which interface you're trying to inject and how many classes implement it.
2.  **Use `@Qualifier`:** If you have multiple implementations and want to specify which one to inject, use the `@Qualifier` annotation alongside the `@Autowired` (or constructor injection). The qualifier value typically matches the bean name, which by default is the lowercase, camel-cased name of the class.

    **Example:**
    Suppose you have `MyRepository` interface and two implementations: `JpaMyRepository` and `MongoMyRepository`.

    ```java
    // Interface
    public interface MyRepository {
        // ...
    }

    // Implementation 1
    @Repository("jpaRepository") // Explicitly naming the bean
    public class JpaMyRepository implements MyRepository {
        // ...
    }

    // Implementation 2
    @Repository("mongoRepository") // Explicitly naming the bean
    public class MongoMyRepository implements MyRepository {
        // ...
    }
    ```

    Now, in the class that needs the repository:

    ```java
    @Service
    public class MyService {

        private final MyRepository myRepository;

        // Constructor injection with @Qualifier
        public MyService(@Qualifier("jpaRepository") MyRepository myRepository) {
            this.myRepository = myRepository;
        }
        // ...
    }
    ```
    If you only have one implementation, and it's annotated correctly, Spring should automatically pick it. If the error persists, ensure the single implementation is in a scannable package and has a stereotype annotation.

## Step 4: Check `@Configuration` Classes and `@Bean` Methods

Custom beans that aren't managed by Spring's auto-detection (e.g., third-party library beans or complex object graphs) are often defined in `@Configuration` classes using `@Bean` methods.

**Action:**
1.  **Locate your `@Configuration` classes:** These are classes annotated with `@Configuration`.
2.  **Verify `@Bean` methods:** Inside these classes, check that the methods intended to create beans are annotated with `@Bean`.
3.  **Ensure return types match injection needs:** The return type of the `@Bean` method should match the type you are trying to inject.

    **Example:**

    ```java
    package com.example.myapp.config;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import com.example.myapp.service.AnotherService; // Assume this exists

    @Configuration
    public class AppConfig {

        // This method creates and returns an instance of MyService
        @Bean
        public MyService myService(AnotherService anotherService) {
            // You can perform complex setup here
            return new MyService(anotherService);
        }
    }
    ```
    Make sure `AppConfig` itself is in a scannable package. If `MyService` is expected, but the `@Bean` method returns `null` or a different type, you'll get the error.

## Step 5: Investigate Conditional Beans (`@ConditionalOn...`)

Spring Boot offers powerful conditional annotations (like `@ConditionalOnProperty`, `@ConditionalOnClass`, `@ConditionalOnBean`, `@ConditionalOnMissingBean`) to control whether a bean is created. If a condition isn't met, the bean simply won't be registered.

**Action:**
1.  **Look for conditional annotations:** Search your configuration classes and bean definitions for any `@ConditionalOn...` annotations.
2.  **Check the conditions:** Verify that the conditions specified in these annotations are actually met by your application's environment.
    *   **`@ConditionalOnProperty`:** Ensure the specified property is set correctly in your `application.properties` or `application.yml`, or via environment variables.
    *   **`@ConditionalOnClass`:** Confirm that the required class is present on the classpath.
    *   **`@ConditionalOnBean` / `@ConditionalOnMissingBean`:** Check for the presence or absence of other beans that influence this condition.

    **Example:**

    ```java
    @Configuration
    public class DatabaseConfig {

        @Bean
        @ConditionalOnProperty(name = "spring.datasource.url")
        public DataSource dataSource() {
            // ... create and configure DataSource
            return new HikariDataSource();
        }

        @Bean
        @ConditionalOnMissingBean(DataSource.class)
        public EmbeddedDatabase embeddedDatabase() {
            return new org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder()
                .setType(org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType.H2)
                .addScript("classpath:schema.sql")
                .build();
        }
    }
    ```
    If `spring.datasource.url` is not set, the `dataSource` bean won't be created. If you then try to inject `DataSource` and `embeddedDatabase` is also conditionally unavailable, you'll get the "No qualifying bean" error.

## Step 6: Inspect Auto-Configuration Classes

Spring Boot's auto-configuration aims to set up common beans automatically (e.g., for databases, web servers, messaging). The error could arise if an auto-configuration is not being applied or if it's being overridden incorrectly.

**Action:**
1.  **Check `spring.autoconfigure.exclude`:** In your `application.properties` or `application.yml`, look for `spring.autoconfigure.exclude`. Ensure you haven't accidentally excluded a necessary auto-configuration class.
2.  **Review `@EnableAutoConfiguration`:** If you're not using `@SpringBootApplication` (which includes `@EnableAutoConfiguration`), make sure `@EnableAutoConfiguration` is present on your main application class.
3.  **Examine configuration properties:** Many auto-configurations are driven by properties. For example, if you expect a `DataSource` to be configured automatically, ensure that relevant properties like `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` are set.

## Step 7: Use Spring Boot Actuator for Bean Inspection

When you're unsure about which beans are available, Spring Boot Actuator provides a handy endpoint to list them.

**Action:**
1.  **Add Spring Boot Actuator dependency:**
    If you're using Maven, add this to your `pom.xml`:

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    ```
    If you're using Gradle, add this to your `build.gradle`:

    ```gradle
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    ```

2.  **Enable the beans endpoint:** By default, the `/actuator/beans` endpoint might be disabled. You can enable it by adding this to your `application.properties`:

    ```properties
    management.endpoints.web.exposure.include=beans,health
    ```
    Or in `application.yml`:
    ```yaml
    management:
      endpoints:
        web:
          exposure:
            include: beans, health
    ```

3.  **Run your application and access the endpoint:** Start your Spring Boot application. Then, navigate to `http://localhost:8080/actuator/beans` (or your application's port) in a web browser or using a tool like `curl`. You'll see a JSON output listing all the beans Spring has created, categorized by their type. This is invaluable for seeing if your expected bean is present, what its name is, and what class it belongs to.

### Common Mistakes

A frequent mistake is forgetting that Spring only scans packages *within or below* the package of your main application class, unless otherwise configured. Placing a service class in a completely separate, un-scanned root package will cause this error. Another pitfall is assuming Spring will magically know which implementation to use for an interface when multiple exist; explicit configuration with `@Qualifier` or by naming beans is crucial. Developers sometimes forget to add the necessary stereotype annotations (`@Component`, `@Service`, etc.) to their custom classes, or they might annotate the wrong class if they're working with interfaces and implementations. Finally, developers can overlook how conditional configurations might be silently preventing a bean from being registered.

### Prevention Tips

To prevent the `No qualifying bean of type [X] available` error, maintain a clear and consistent package structure for your Spring components. Keep your main application class at the root of your project's package hierarchy and place all your components in sub-packages. Always annotate your classes with the appropriate stereotype annotations (`@Component`, `@Service`, `@Repository`, etc.) as soon as you define them. When working with interfaces, be mindful of how you intend to inject implementations, and use `@Qualifier` or explicit bean definitions in `@Configuration` classes if ambiguity exists. Regularly review your `@Configuration` classes and `application.properties`/`application.yml` for any conditional logic that might affect bean availability. Leveraging Spring Boot Actuator's `/beans` endpoint during development can also help you quickly identify missing beans before they cause runtime failures.