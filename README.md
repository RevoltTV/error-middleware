# error-middleware

Middleware to handle exceptions and return consistent error responses

## Usage

```
import errors from '@revolttv/errors-middleware';

let app = new express();

// Should be at the end of the route definitions
app.use(errors({
    env: 'production'
}));
```
