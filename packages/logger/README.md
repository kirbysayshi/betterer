[![Betterer](https://raw.githubusercontent.com/phenomnomnominal/betterer/master/docs/logo.png)](https://phenomnomnominal.github.io/betterer/)

# `@betterer/logger`

[![npm version](https://img.shields.io/npm/v/@betterer/logger.svg)](https://www.npmjs.com/package/@betterer/logger)

Logger used within [**`Betterer`**](https://github.com/phenomnomnominal/betterer).

## Usage

> ## 🚨🚨🚨 THIS PACKAGE SHOULD ONLY BE USED WITHIN THE BETTERER MONOREPO 🚨🚨🚨

### Code

```typescript
import { codeΔ } from '@betterer/logger';

codeΔ({
  filePath: './file.js',
  fileText: 'function add (a, b) {\n  return a + b;\n}',
  line: 1,
  column: 3,
  length: 13
}).log();
```

![Example output for code logger](/packages/logger/images/code.png?raw=true)

---

### Error

```typescript
import { errorΔ } from '@betterer/logger';

errorΔ('message').log();
```

![Example output for error logger](/packages/logger/images/error.png?raw=true)

---

### Info

```typescript
import { infoΔ } from '@betterer/logger';

infoΔ('message').log();
```

![Example output for info logger](/packages/logger/images/info.png?raw=true)

---

### Success

```typescript
import { successΔ } from '@betterer/logger';

successΔ('message').log();
```

![Example output for success logger](/packages/logger/images/success.png?raw=true)

---

### Warning

```typescript
import { warnΔ } from '@betterer/logger';

warnΔ('message').log();
```

![Example output for warn logger](/packages/logger/images/warn.png?raw=true)

---
