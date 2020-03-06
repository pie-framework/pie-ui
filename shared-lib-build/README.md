# shared lib build ...

## lib

This is hardcoded by hand at the moment, the goal is for this to be automated at some point.

## build a lib

how to host/deploy?
create a shared lib package?

```shell
@pie-ui/shared-lib-bundle@1.0.1/
  index.js
  package.json
  manifest.json
```

Then in the packages:

```javascript
import { _dll_foo } from '../../@pie-ui/shared-lib-bundle@112341234/index.js'; // where path goes to the unpkg cdn?
```

in the npm pkg we have:

```shell
package.json
lib/ # as before for backwards compatibility
module/ # new module bundle
  index.js
```
