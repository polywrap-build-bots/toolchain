/// NOTE: This is an auto-generated file.
///       All modifications will be overwritten.

export const schema: string = `### Web3API Header START ###
scalar UInt
scalar UInt8
scalar UInt16
scalar UInt32
scalar Int
scalar Int8
scalar Int16
scalar Int32
scalar Bytes
scalar BigInt
scalar BigNumber
scalar Map

directive @imported(
  uri: String!
  namespace: String!
  nativeType: String!
) on OBJECT | ENUM

directive @imports(
  types: [String!]!
) on OBJECT

directive @capability(
  type: String!
  uri: String!
  namespace: String!
) repeatable on OBJECT

directive @enabled_interface on OBJECT

directive @annotate(type: String!) on FIELD

### Web3API Header END ###

type Query {
  sanitizeEnv(
    env: QueryClientEnv!
  ): QueryEnv!

  method(
    str: String!
  ): String!
}

type Mutation {
  sanitizeEnv(
    env: MutationClientEnv!
  ): MutationEnv!

  method(
    arg: UInt32!
  ): String!
}

type QueryClientEnv {
  bar: UInt32!
}

type QueryEnv {
  queryArg: String!
}

type MutationClientEnv {
  foo: UInt32!
}

type MutationEnv {
  mutationArg: String!
}

### Imported Queries START ###

### Imported Queries END ###

### Imported Objects START ###

### Imported Objects END ###
`;
