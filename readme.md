## note

We're waiting for a [patch on hyperx](https://github.com/substack/hyperx/pull/24). Need to update deps after this is fixed.

## TODO

### build
* Optimize images before uploading to moltin -- compress, upload multiple sizes
* concat and inline css
* inline moltin client
* check out service worker for caching app code

### UX
* show 404 for categories that don't exist (not a blank page)
* handle errors -- disconnected status
* loading (spinner) icon -- cart icon in product page
* Good experience editing the cart -- update button if dirty state?
* scroll position on url change feels weird
* fade transition when filtering product categories -- fade out elmts that are removed
* crop images so they are all square

#### mobile
* hamburger

#### product detail
* multiple images
* smaller image size
* cart icon, add to cart button
* landscape view

#### main page
* home icon & cart icon
* something nice for hero

#### nav
* solid white bg on sub nav
* sub nav for 'more' category
* clicking the active category turns it off (unfilters)
* drop shadow

#### cart & checkout
* success page after order is processed
* cart is empty after an order is completed
* send emails after order is done

### fix
* back button in product detail page needs the right URL

### other
* unit tests

