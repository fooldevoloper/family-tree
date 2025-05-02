# Family Tree

A modern family tree visualization application built with React and TypeScript.

## Features

- Interactive family tree visualization
- Add, edit, and remove family members
- Connect family members with relationships
- Export and import family tree data
- Modern UI with Ant Design components

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format
```

## Author

asmend

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── DownloadButton.tsx
│   ├── ImportButton.tsx
│   ├── Layout.tsx
│   ├── NodeContent.tsx
│   └── sharedStyles.ts
├── nodes/             # Custom node components
│   ├── ChildNode.tsx
│   ├── ParentNode.tsx
│   └── SpouseNode.tsx
├── store/             # State management
│   └── familyStore.ts
├── types/             # TypeScript type definitions
│   └── family.ts
├── styles/            # Global styles
│   └── sharedStyles.ts
└── App.tsx            # Main application component
```

## Design Patterns

### 1. State Management
- **Zustand Store**: Centralized state management using Zustand
- **Immutability**: All state updates are handled immutably
- **Type Safety**: Full TypeScript support for state management

### 2. Component Architecture
- **Container/Presenter Pattern**: Separation of logic and presentation
- **Compound Components**: Reusable component patterns
- **Custom Hooks**: Encapsulated business logic

### 3. Data Flow
- **Unidirectional Data Flow**: Predictable state updates
- **Event-Driven Architecture**: User interactions trigger state changes
- **Type-Safe Props**: Strict typing for component props

## Key Components

### 1. Node Types
- **ParentNode**: Root nodes of the family tree
- **SpouseNode**: Spouse connections
- **ChildNode**: Child nodes with parent relationships

### 2. Store Actions
```typescript
interface FamilyStore {
  // CRUD Operations
  addNode: (node: FamilyNode) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  deleteNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (edgeId: string) => void;
  
  // Import/Export
  importJson: (jsonData: string | { nodes: FamilyNode[]; edges: Edge[] }) => void;
}
```

### 3. Node Data Structure
```typescript
interface NodeData {
  id: string;
  name: string;
  position: { x: number; y: number };
  label: string;
  parentId?: string;
  imageUrl?: string;
  canAddChildren?: boolean;
  canAddSpouse?: boolean;
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
```

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Document complex logic with comments

### Testing
- Write unit tests for business logic
- Test component interactions
- Ensure type safety

### Performance
- Optimize re-renders with React.memo
- Use proper dependency arrays in hooks
- Implement lazy loading where appropriate

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Flow](https://reactflow.dev/) for the visualization library
- [Ant Design](https://ant.design/) for UI components
- [Zustand](https://github.com/pmndrs/zustand) for state management
