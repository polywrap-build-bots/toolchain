export const abi = {
  objectTypes: [],
  enumTypes: [],
  interfaceTypes: [],
  importedObjectTypes: [
    {
      type: "UriResolver_MaybeUriOrManifest",
      name: null,
      required: null,
      kind: 1025,
      properties: [
        {
          type: "String",
          name: "uri",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "String", name: "uri", required: null, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
        },
        {
          type: "Bytes",
          name: "manifest",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "Bytes", name: "manifest", required: null, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
        },
      ],
      interfaces: [],
      uri: "ens/uri-resolver.core.polywrap.eth",
      namespace: "UriResolver",
      nativeType: "MaybeUriOrManifest",
    },
    {
      type: "Ipfs_Options",
      name: null,
      required: null,
      kind: 1025,
      properties: [
        {
          type: "UInt32",
          name: "timeout",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "UInt32", name: "timeout", required: null, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
          comment:
            "    Timeout (in ms) for the operation.\nFallback providers are used if timeout is reached.",
        },
        {
          type: "String",
          name: "provider",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "String", name: "provider", required: null, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
          comment: "The IPFS provider to be used",
        },
        {
          type: "Boolean",
          name: "disableParallelRequests",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: {
            type: "Boolean",
            name: "disableParallelRequests",
            required: null,
            kind: 4,
          },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
          comment: "Disable querying providers in parallel when resolving URIs",
        },
      ],
      interfaces: [],
      uri: "ens/ipfs.polywrap.eth",
      namespace: "Ipfs",
      nativeType: "Options",
    },
    {
      type: "Ipfs_ResolveResult",
      name: null,
      required: null,
      kind: 1025,
      properties: [
        {
          type: "String",
          name: "cid",
          required: true,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "String", name: "cid", required: true, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
        },
        {
          type: "String",
          name: "provider",
          required: true,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "String", name: "provider", required: true, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
        },
      ],
      interfaces: [],
      uri: "ens/ipfs.polywrap.eth",
      namespace: "Ipfs",
      nativeType: "ResolveResult",
    },
  ],
  importedModuleTypes: [
    {
      type: "UriResolver_Module",
      name: null,
      required: null,
      kind: 256,
      methods: [
        {
          type: "Method",
          name: "tryResolveUri",
          required: true,
          kind: 64,
          arguments: [
            {
              type: "String",
              name: "authority",
              required: true,
              kind: 34,
              array: null,
              map: null,
              scalar: {
                type: "String",
                name: "authority",
                required: true,
                kind: 4,
              },
              object: null,
              enum: null,
              unresolvedObjectOrEnum: null,
            },
            {
              type: "String",
              name: "path",
              required: true,
              kind: 34,
              array: null,
              map: null,
              scalar: { type: "String", name: "path", required: true, kind: 4 },
              object: null,
              enum: null,
              unresolvedObjectOrEnum: null,
            },
          ],
          return: {
            type: "UriResolver_MaybeUriOrManifest",
            name: "tryResolveUri",
            required: null,
            kind: 34,
            array: null,
            map: null,
            scalar: null,
            object: {
              type: "UriResolver_MaybeUriOrManifest",
              name: "tryResolveUri",
              required: null,
              kind: 8192,
            },
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        },
        {
          type: "Method",
          name: "getFile",
          required: true,
          kind: 64,
          arguments: [
            {
              type: "String",
              name: "path",
              required: true,
              kind: 34,
              array: null,
              map: null,
              scalar: { type: "String", name: "path", required: true, kind: 4 },
              object: null,
              enum: null,
              unresolvedObjectOrEnum: null,
            },
          ],
          return: {
            type: "Bytes",
            name: "getFile",
            required: null,
            kind: 34,
            array: null,
            map: null,
            scalar: { type: "Bytes", name: "getFile", required: null, kind: 4 },
            object: null,
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        },
      ],
      uri: "ens/uri-resolver.core.polywrap.eth",
      namespace: "UriResolver",
      nativeType: "Module",
      isInterface: false,
    },
    {
      type: "Ipfs_Module",
      name: null,
      required: null,
      kind: 256,
      methods: [
        {
          type: "Method",
          name: "cat",
          required: true,
          kind: 64,
          arguments: [
            {
              type: "String",
              name: "cid",
              required: true,
              kind: 34,
              array: null,
              map: null,
              scalar: { type: "String", name: "cid", required: true, kind: 4 },
              object: null,
              enum: null,
              unresolvedObjectOrEnum: null,
            },
            {
              type: "Ipfs_Options",
              name: "options",
              required: null,
              kind: 34,
              array: null,
              map: null,
              scalar: null,
              object: {
                type: "Ipfs_Options",
                name: "options",
                required: null,
                kind: 8192,
              },
              enum: null,
              unresolvedObjectOrEnum: null,
            },
          ],
          return: {
            type: "Bytes",
            name: "cat",
            required: true,
            kind: 34,
            array: null,
            map: null,
            scalar: { type: "Bytes", name: "cat", required: true, kind: 4 },
            object: null,
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        },
        {
          type: "Method",
          name: "resolve",
          required: true,
          kind: 64,
          arguments: [
            {
              type: "String",
              name: "cid",
              required: true,
              kind: 34,
              array: null,
              map: null,
              scalar: { type: "String", name: "cid", required: true, kind: 4 },
              object: null,
              enum: null,
              unresolvedObjectOrEnum: null,
            },
            {
              type: "Ipfs_Options",
              name: "options",
              required: null,
              kind: 34,
              array: null,
              map: null,
              scalar: null,
              object: {
                type: "Ipfs_Options",
                name: "options",
                required: null,
                kind: 8192,
              },
              enum: null,
              unresolvedObjectOrEnum: null,
            },
          ],
          return: {
            type: "Ipfs_ResolveResult",
            name: "resolve",
            required: null,
            kind: 34,
            array: null,
            map: null,
            scalar: null,
            object: {
              type: "Ipfs_ResolveResult",
              name: "resolve",
              required: null,
              kind: 8192,
            },
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        },
        {
          type: "Method",
          name: "addFile",
          required: true,
          kind: 64,
          arguments: [
            {
              type: "Bytes",
              name: "data",
              required: true,
              kind: 34,
              array: null,
              map: null,
              scalar: { type: "Bytes", name: "data", required: true, kind: 4 },
              object: null,
              enum: null,
              unresolvedObjectOrEnum: null,
            },
          ],
          return: {
            type: "String",
            name: "addFile",
            required: true,
            kind: 34,
            array: null,
            map: null,
            scalar: {
              type: "String",
              name: "addFile",
              required: true,
              kind: 4,
            },
            object: null,
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        },
      ],
      uri: "ens/ipfs.polywrap.eth",
      namespace: "Ipfs",
      nativeType: "Module",
      isInterface: false,
    },
  ],
  importedEnumTypes: [],
  importedEnvTypes: [],
  moduleType: {
    type: "Module",
    name: null,
    required: null,
    kind: 128,
    methods: [
      {
        type: "Method",
        name: "tryResolveUri",
        required: true,
        kind: 64,
        arguments: [
          {
            type: "String",
            name: "authority",
            required: true,
            kind: 34,
            array: null,
            map: null,
            scalar: {
              type: "String",
              name: "authority",
              required: true,
              kind: 4,
            },
            object: null,
            enum: null,
            unresolvedObjectOrEnum: null,
          },
          {
            type: "String",
            name: "path",
            required: true,
            kind: 34,
            array: null,
            map: null,
            scalar: { type: "String", name: "path", required: true, kind: 4 },
            object: null,
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        ],
        return: {
          type: "UriResolver_MaybeUriOrManifest",
          name: "tryResolveUri",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: null,
          object: {
            type: "UriResolver_MaybeUriOrManifest",
            name: "tryResolveUri",
            required: null,
            kind: 8192,
          },
          enum: null,
          unresolvedObjectOrEnum: null,
        },
      },
      {
        type: "Method",
        name: "getFile",
        required: true,
        kind: 64,
        arguments: [
          {
            type: "String",
            name: "path",
            required: true,
            kind: 34,
            array: null,
            map: null,
            scalar: { type: "String", name: "path", required: true, kind: 4 },
            object: null,
            enum: null,
            unresolvedObjectOrEnum: null,
          },
        ],
        return: {
          type: "Bytes",
          name: "getFile",
          required: null,
          kind: 34,
          array: null,
          map: null,
          scalar: { type: "Bytes", name: "getFile", required: null, kind: 4 },
          object: null,
          enum: null,
          unresolvedObjectOrEnum: null,
        },
      },
    ],
    imports: [
      { type: "UriResolver_Module" },
      { type: "UriResolver_MaybeUriOrManifest" },
      { type: "Ipfs_Module" },
      { type: "Ipfs_Options" },
      { type: "Ipfs_ResolveResult" },
    ],
    interfaces: [
      {
        type: "UriResolver_Module",
        name: null,
        required: null,
        kind: 2048,
        array: null,
        map: null,
        scalar: null,
        object: null,
        enum: null,
        unresolvedObjectOrEnum: null,
      },
    ],
  },
};
