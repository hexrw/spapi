# Selling Partner API Models

Mirrors [amzn/selling-partner-api-models](https://github.com/amzn/selling-partner-api-models)

- Converted from OpenAPI v2 (Swagger) to OpenAPI v3 (latest OpenAPI Specification)
- Contains separate schemas for each API (JSON) as well as a single joined file containing all schemas (YAML)

## Description

This repository contains Swagger models for developers to use to create software to call Selling Partner APIs. Developers can use [swagger codegen](https://github.com/swagger-api/swagger-codegen) to generate client libraries from these models. Please refer to [selling-partner-api-docs](https://github.com/amzn/selling-partner-api-docs) for additional documentation and read the [Selling Partner API Developer Guide](https://github.com/amzn/selling-partner-api-docs/blob/main/guides/en-US/developer-guide/SellingPartnerApiDeveloperGuide.md) for instructions to get started.

The [models directory](https://github.com/amzn/selling-partner-api-models/tree/main/models) contains all of the currently available Selling Partner API models.

The [clients directory](https://github.com/amzn/selling-partner-api-models/tree/main/clients) contains a [Java library](https://github.com/amzn/selling-partner-api-models/tree/main/clients/sellingpartner-api-aa-java) and a [C# library](https://github.com/amzn/selling-partner-api-models/tree/main/clients/sellingpartner-api-aa-csharp) with mustache templates for use with [swagger-codegen](https://swagger.io/tools/swagger-codegen/) to generate client libraries with authentication and authorization functionality included. The templates are located in *resources/swagger-codegen*.

The [schemas directory](https://github.com/amzn/selling-partner-api-models/tree/main/schemas) contains all of the currently available Selling Partner Api schemas.

## License & Copyright

This project is licensed under the Apache-2.0 License.

**Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.**
