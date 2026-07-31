# Templates

Full-page templates built from Sakani Design System components. These are complete, opinionated compositions ready for use or customization.

## Contents

### `chat-interface/`
A complete chat application interface featuring:
- Sidebar with navigation groups and search
- Conversation list with unread states
- Message thread with timestamps
- Chat composer with emoji picker and file upload
- Full message persistence via localStorage
- Responsive collapsed sidebar state

**Usage:**
```tsx
import { ChatInterfaceBlock } from './chat-interface';

<ChatInterfaceBlock state="default" />
```

**States:**
- `default` - Expanded sidebar with conversation open
- `collapsed` - Compact icon rail, main area expanded
- `empty` - No conversation selected

---

## Adding New Templates

1. Create a new folder: `src/templates/your-template-name/`
2. Add component files: `YourTemplateBlock.tsx`, `.module.css`, `.stories.tsx`
3. Export from `index.ts`
4. Update Storybook story title as `'Templates/Your Template Name'`
5. Add documentation to this README

Templates should be:
- ✅ **Complete** - Ready to use, not fragments
- ✅ **Opinionated** - Demonstrate patterns and best practices
- ✅ **Customizable** - Controlled props for key variations
- ✅ **Accessible** - WCAG compliant
- ✅ **Responsive** - Work on all screen sizes
