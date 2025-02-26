src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── decorators/
│   │   └── roles.decorator.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   └── jwt.strategy.ts
├── cats/
│   ├── dto/
│   │   ├── create-cat.dto.ts
│   │   └── update-cat.dto.ts
│   ├── schemas/
│   │   └── cat.schema.ts
│   ├── cats.module.ts
│   ├── cats.service.ts
│   └── cats.controller.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── schemas/
│   │   └── user.schema.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.controller.ts
├── common/
│   └── enums/
│       └── role.enum.ts
├── app.module.ts
└── main.ts