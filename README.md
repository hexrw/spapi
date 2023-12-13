# Selling Partner API toolkit

## API

Full documentation generated from the OpenAPI schemas available [here](https://spapi.surge.sh/)

### Quick links for other use cases

- [Full SP-API (all APIs) TypeScript definition](https://gist.github.com/hexrw/8f6b84082553905502552c925f00d943)

- [Full SP-API OpenAPI specification](https://gist.github.com/hexrw/c43092acf4b12ed2d808bbe1ef319f2f)

## Client

**[hexrw/spapi](./client/package/) - a fully JavaScript client for the Amazon Selling Partner API**

## Development

### Scripts

#### Client

[`client/package.json`](./client/package.json)

#### Docs

```sh
# Build docs
./scripts/build-docs.sh
```

#### OpenAPI specifications

```sh
# Fetch latest OpenAPI specifications from Amazon
./scripts/fetch-specs.sh

# Lint & validate
./scripts/validate-specs.sh

# Join specs into one
./scripts/join-specs.sh
```

