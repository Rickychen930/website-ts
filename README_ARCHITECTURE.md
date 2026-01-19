# Portfolio Website - Architecture Documentation

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp config/env.example .env
# Edit .env with your configuration

# Seed database (optional)
npm run seed

# Start development servers
npm run dev
```

### Development

```bash
# Frontend only (http://localhost:3000)
npm start

# Backend only (http://localhost:4000)
npm run server:watch

# Both (recommended)
npm run dev
```

## Architecture Overview

This portfolio website follows **Clean Architecture** principles with **MVC pattern**, built with **TypeScript** throughout.

### Key Architectural Decisions

1. **MVC Separation**: Clear separation between Models, Views, and Controllers
2. **Clean Architecture**: Domain layer independent of frameworks
3. **Type Safety**: 100% TypeScript with strict mode
4. **Component-Based**: Atomic design principles
5. **State Management**: React Context for global state
6. **Performance**: Code splitting, lazy loading, caching

## Project Structure

```
website-ts/
├── src/                    # Frontend source
│   ├── components/         # Shared components
│   ├── config/             # Configuration
│   ├── contexts/           # React contexts
│   ├── controllers/        # MVC controllers
│   ├── models/             # Domain models
│   ├── services/           # Business logic
│   ├── types/              # TypeScript types
│   ├── utils/              # Utilities
│   └── views/              # React components
│       ├── components/     # UI components
│       └── pages/           # Page components
├── backend/                # Backend source
│   └── src/
│       ├── config/         # Backend config
│       ├── controllers/    # API controllers
│       ├── models/         # Database models
│       ├── routes/          # API routes
│       └── seed/            # Seed scripts
└── docs/                   # Documentation
```

## Architecture Versions

### Version 1: Foundation

- MVC pattern implementation
- Domain models with immutability
- Design system with tokens
- Atomic component architecture

**See**: [docs/ARCHITECTURE_V1.md](./docs/ARCHITECTURE_V1.md)

### Version 2: State Management

- React Context for global state
- Error boundaries
- Loading components
- Eliminated prop drilling

**See**: [docs/ARCHITECTURE_V2.md](./docs/ARCHITECTURE_V2.md)

### Version 3: Performance

- Code splitting with React.lazy
- Caching strategy
- Retry mechanism
- Suspense integration

**See**: [docs/ARCHITECTURE_V3.md](./docs/ARCHITECTURE_V3.md)

## Key Components

### Domain Models

- `ProfileModel`: Immutable profile data with business logic methods
- Located in `src/models/ProfileModel.ts`

### Services

- `ProfileService`: Handles API calls, caching, retry logic
- Located in `src/services/ProfileService.ts`

### Controllers

- `ProfileController`: Orchestrates views and services
- Located in `src/controllers/ProfileController.ts`

### Context

- `ProfileContext`: Global state management
- Located in `src/contexts/ProfileContext.tsx`

## Design System

### Design Tokens

- Colors: Primary, neutral, semantic colors
- Spacing: Consistent spacing scale
- Typography: Font families, sizes, weights
- Shadows: Elevation system
- Breakpoints: Responsive breakpoints

**See**: `src/config/design-tokens.ts`

### UI Components

- `Button`: Variants (primary, secondary, outline, ghost)
- `Card`: Container with elevation variants
- `Typography`: Consistent text styling
- `Loading`: Loading indicators

### Domain Components

- `ProjectCard`: Project display
- `SkillBadge`: Technical skill with proficiency
- `ExperienceItem`: Work experience timeline
- `TestimonialCard`: Client testimonials

## API Structure

### Backend Endpoints

```
GET /api/profile          # Get profile data
GET /health               # Health check
```

### Backend Architecture

- Express 5 with TypeScript
- MongoDB with Mongoose
- MVC pattern
- Error handling middleware

## Data Model

The profile data structure includes:

- Personal information (name, title, location, bio)
- Academics (education history)
- Certifications
- Contacts (email, social links)
- Experiences (work history)
- Projects (portfolio projects)
- Skills (technical and soft skills)
- Testimonials
- Stats (achievement metrics)

**See**: `src/types/domain.ts` for complete type definitions

## Customization

### Updating Profile Data

1. **Backend**: Update `backend/src/seed/seedData.ts` with your data
2. **Seed Database**: Run `npm run seed`
3. **Or**: Update directly in MongoDB

### Styling

1. **Design Tokens**: Modify `src/config/design-tokens.ts`
2. **Component Styles**: Edit component CSS modules
3. **Global Styles**: Update `src/App.css`

### Adding Pages

1. Create page component in `src/views/pages/YourPage/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/views/components/layout/Header/Header.tsx`

## Best Practices

### Code Organization

- One component per file
- Co-located styles (CSS modules)
- Index files for clean imports
- Clear folder boundaries

### Type Safety

- No `any` types
- Proper interfaces for all data
- Generic types where appropriate
- Strict TypeScript configuration

### Performance

- Code splitting for routes
- Lazy loading components
- Caching API responses
- Memoization where needed

### Error Handling

- Error boundaries for React errors
- Try-catch for async operations
- User-friendly error messages
- Proper logging

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## Building for Production

```bash
# Build frontend and backend
npm run build:all

# Build frontend only
npm run build

# Build backend only
npm run backend:build
```

## Deployment

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## Documentation

- [Architecture Summary](./docs/ARCHITECTURE_SUMMARY.md) - Complete architecture overview
- [Version 1](./docs/ARCHITECTURE_V1.md) - Foundation
- [Version 2](./docs/ARCHITECTURE_V2.md) - State Management
- [Version 3](./docs/ARCHITECTURE_V3.md) - Performance

## Contributing

This is a personal portfolio project. For questions or suggestions, please open an issue.

## License

Private project - All rights reserved

---

**Built with**: React, TypeScript, Express, MongoDB
**Architecture**: Clean Architecture, MVC Pattern
**Design**: Atomic Design, Design System
