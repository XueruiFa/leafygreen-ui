# @leafygreen-ui/button

## 4.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 3.0.2

### Patch Changes

- f42801b: Fix bug such that on hover, color is explicitly set rather than inherited

## 3.0.1

### Patch Changes

- ff55bb5: Added fallback CSS for focus and hover states

## 3.0.0

### Major Changes

- 9c45cb4: Wrapping component with React.forwardRef to provide direct access to the underlying element.

### Patch Changes

- Updated dependencies [9c45cb4]
  - @leafygreen-ui/lib@3.1.0

## 2.3.7

### Patch Changes

- eb49b56: Fixes an issue where the children of Button had a z-index that was being applied in a global stacking context.
