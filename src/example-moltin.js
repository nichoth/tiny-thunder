var curry = require('curry');
var wrap = require('../lib/wrap');
var waterfall = require('async-waterfall');

var moltin = new Moltin({
  publicId: process.env.PUBLIC_ID
});

moltin.Authenticate(app);


function app(auth) {
  console.log('auth', arguments);

  var findProducts = wrap(moltin.Product.Find.bind(moltin.Product));
  var addToCart = wrap(moltin.Cart.Insert.bind(moltin.Cart));
  var cartContents = wrap(moltin.Cart.Contents.bind(moltin.Cart));

  moltin.Product.Find({slug: 'knife-earring'}, function(prod) {
    console.log('prod', prod);

    moltin.Cart.Insert(prod[0].id, 1, null, function(item) {
      console.log('item', item);

      moltin.Cart.Contents(function(items) {
        console.log('cart contents', items);
      }, function(error) {
        console.log(error);
      });

      moltin.Cart.Complete({
        gateway: 'dummy',
        customer: {
          first_name: 'Jon',
          last_name:  'Doe',
          email:      'jon.doe@gmail.com'
        },
        bill_to: {
          first_name: 'Jon',
          last_name:  'Doe',
          address_1:  '123 Sunny Street',
          address_2:  'Sunnycreek',
          city:       'Sunnyvale',
          county:     'California',
          country:    'US',
          postcode:   'CA94040',
          phone:      '6507123124'
        },
        ship_to: 'bill_to',
        shipping: 'free-shipping'
      },
      function(order) {
        console.log('order', arguments);
        moltin.Checkout.Payment('purchase', order.id, {
          data: {
            number:       '4242424242424242',
            expiry_month: '02',
            expiry_year:  '2017',
            cvv:          '123'
          }
        }, success => console.log('success', success),
          err => console.log(err)
        );
      },
      function(err) { console.log(err); });

    }, function(error) {
      console.log('err', error);
    });

  }, function(err) { console.log('err', err); });

}








