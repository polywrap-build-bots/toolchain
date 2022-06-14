import {
  createMethodDefinition,
  createModuleDefinition,
  createScalarPropertyDefinition,
  createObjectDefinition,
  createTypeInfo,
  createEnvDefinition,
  AnyDefinition,
  TypeInfo,
  createObjectPropertyDefinition,
} from "@web3api/schema-parse";

export const typeInfo: TypeInfo = {
  ...createTypeInfo(),
  envType: createEnvDefinition({
      sanitized: {
        ...createObjectDefinition({
          type: "Env"
        }),
        properties: [
          {
            ...createScalarPropertyDefinition({ name: "after", type: "String", required: true }),
            first: true,
            last: true,
          } as AnyDefinition,
        ],
      },
      client: {
        ...createObjectDefinition({
          type: "ClientEnv"
        }),
        properties: [
          {
            ...createScalarPropertyDefinition({ name: "before", type: "UInt32", required: true }),
            first: true,
            last: true,
          } as AnyDefinition,
        ],
      }
    }),
  moduleType:
    {
      ...createModuleDefinition({}),
      methods: [
        {
          ...createMethodDefinition({
            name: "method",
            return: createScalarPropertyDefinition({
              name: "method",
              type: "String",
              required: true
            })
          }),
          arguments: [
            createScalarPropertyDefinition({
              name: "str",
              required: true,
              type: "String"
            }),
          ]
        },
        {
          ...createMethodDefinition({
            name: "sanitizeEnv",
            return: createObjectPropertyDefinition({
              name: "sanitizeEnv",
              type: "Env",
              required: true
            })
          }),
          arguments: [
            createObjectPropertyDefinition({
              name: "env",
              required: true,
              type: "ClientEnv"
            }),
          ]
        },
      ]
    }
}