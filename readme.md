## note

We're waiting for a [patch on hyperx](https://github.com/substack/hyperx/pull/24). Need to update deps after this is fixed.

## TODO

### optimize
* Optimize images before uploading to moltin -- compress, upload multiple sizes
* concat and inline css
* inline moltin client
* check out service worker for caching app code
* don't make unnecessary requests for cart content. If cart is up to date, just return the cached data.

### UX
* show 404 for categories that don't exist (not a blank page)
* handle errors -- disconnected status
* loading (spinner) icon -- cart icon in product page
* Good experience editing the cart
* product detail -- 'add to cart' button should be `button`, not `a`

### pages
* checkout pages (forms)  
  **/cart/checkout** -- show form to collect information  
  **/cart/review** -- show summary of order info, button to place order  
* build out cart view

### fix
* back button in product detail page needs the right URL

### other
* unit tests


## unit tests
Emit events that correspond to all the actions a user can do
