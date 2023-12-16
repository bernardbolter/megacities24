const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
  url: "https://digitalcityseries.com/bolter",
  consumerKey: process.env.WOOCOMMERCE_KEY,
  consumerSecret: process.env.WOOCOMMERCE_SECRET,
  version: "wc/v3"
});

export const getPrintsData = async () => {
    return await api.get(
      'products'
    )
}