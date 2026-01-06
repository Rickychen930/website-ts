# 🧪 Testing Documentation

## Overview

Project ini menggunakan **Jest** dan **React Testing Library** untuk testing. Jest sudah termasuk dalam `react-scripts`, dan kita telah menambahkan React Testing Library untuk component testing.

## Test Structure

```
src/
├── __tests__/           # Test files
│   ├── utils/
│   │   ├── seo.test.ts
│   │   └── theme.test.ts
│   ├── services/
│   │   └── user-service.test.ts
│   └── controllers/
│       └── main-page-controller.test.ts
├── setupTests.ts        # Jest setup configuration
└── ...
```

## Running Tests

### Development Mode (Watch)
```bash
npm test
# atau
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI Mode (No Watch)
```bash
npm run test:ci
```

## Test Coverage Goals

Target coverage minimum:
- **Branches:** 70%
- **Functions:** 70%
- **Lines:** 70%
- **Statements:** 70%

## Test Categories

### 1. Unit Tests

#### Utilities (`src/utils/__tests__/`)
- ✅ `seo.test.ts` - SEO utilities (updateTitle, updateMetaTag, generateStructuredData, dll)
- ✅ `theme.test.ts` - Theme management (getTheme, setTheme, toggleTheme, dll)

#### Services (`src/services/__tests__/`)
- ✅ `user-service.test.ts` - UserService class (getUserProfile, validation)

#### Controllers (`src/controllers/__tests__/`)
- ✅ `main-page-controller.test.ts` - MainPageController

### 2. Component Tests (TODO)

Components yang perlu ditest:
- [ ] UI Components (ErrorBoundary, LoadingComponent, ErrorComponent)
- [ ] Section Components (AboutMeSection, AcademicSection, dll)
- [ ] Page Components (MainPage)

### 3. Integration Tests (TODO)

- [ ] API endpoint tests
- [ ] Frontend-Backend integration
- [ ] Database integration

## Writing Tests

### Example: Utility Test

```typescript
import { updateTitle } from '../seo';

describe('updateTitle', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('should update document title', () => {
    updateTitle('Test Title');
    expect(document.title).toBe('Test Title');
  });
});
```

### Example: Service Test

```typescript
import { UserService } from '../user-service';
import { apiClient } from '../api';

jest.mock('../api', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  it('should fetch user profile', async () => {
    // Test implementation
  });
});
```

### Example: Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { LoadingComponent } from '../components/ui';

describe('LoadingComponent', () => {
  it('should render loading message', () => {
    render(<LoadingComponent message="Loading..." />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
```

## Mocking

### API Calls
```typescript
jest.mock('../services/api', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));
```

### Browser APIs
- `window.matchMedia` - Mocked in `setupTests.ts`
- `IntersectionObserver` - Mocked in `setupTests.ts`
- `localStorage` - Mocked in `setupTests.ts`

## Best Practices

1. **Arrange-Act-Assert Pattern**
   ```typescript
   it('should do something', () => {
     // Arrange
     const input = 'test';
     
     // Act
     const result = functionToTest(input);
     
     // Assert
     expect(result).toBe('expected');
   });
   ```

2. **Clear Mocks Between Tests**
   ```typescript
   beforeEach(() => {
     jest.clearAllMocks();
   });
   ```

3. **Test One Thing at a Time**
   - Each test should verify one behavior
   - Use descriptive test names

4. **Use Descriptive Test Names**
   ```typescript
   // ❌ Bad
   it('works', () => {});
   
   // ✅ Good
   it('should return null when user profile is invalid', () => {});
   ```

5. **Test Edge Cases**
   - Empty inputs
   - Null/undefined values
   - Error conditions
   - Boundary values

## Current Test Status

### ✅ Completed
- SEO utilities tests
- Theme utilities tests
- UserService tests
- MainPageController tests

### 🚧 In Progress
- Component tests
- Integration tests

### 📋 TODO
- Add more controller tests
- Add component tests
- Add integration tests
- Add E2E tests (optional)

## Troubleshooting

### Tests Not Running
1. Check that `setupTests.ts` exists
2. Verify Jest configuration in `package.json`
3. Check for syntax errors in test files

### Mock Not Working
1. Ensure mock is defined before import
2. Check mock implementation matches actual API
3. Verify `jest.clearAllMocks()` in `beforeEach`

### Coverage Not Generating
1. Run `npm run test:coverage`
2. Check `coverage/` directory
3. Verify `collectCoverageFrom` in Jest config

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

