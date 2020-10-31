const layout = require('../layout');

module.exports = ({ items }) => {
	const totalPrice = items.reduce((acc, item) => {
		return acc + item.quantity * item.product.price;
	}, 0);

	const renderedItems = items
		.map((item) => {
			return `
            <tr>
                <td>${item.product.title}</td>
                <td>${item.quantity}</td>
                <td>£${item.product.price}</td>
                <td>
                    <form method="POST" action="/cart/products/delete">
                        <input hidden value="${item.id}" name="itemId" />
                        <button class="btn-remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </form>
                </td>
            </tr>
      `;
		})
		.join('');

	return layout({
    content: `
      <section id="feature-section-small">
          <div class="feature-image-small"></div>
          <div class="feature-title">
              <h5 class="hero-text hero-small">FREE CATALOG 2020</h5>
          </div>
          <a href="/products">
              <button class="btn-outline-tr feature-button-small">CLICK HERE</button>
          </a>
      </section>

      <section id="cart-container">
          <table>
              <thead>
                  <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                ${renderedItems}
                <tr class="cart-total">
                  <td></td>
                  <td></td>
                  <td>Total: </td>
                  <td>£${totalPrice}</td>
                </tr>
              </tbody>
          </table>

          <div class="checkout">
            <div class="btn-outline-tr">Checkout</div>
            <div><a href="/products"><< Continue shopping</a></div>
          </div>
      </section>
    `
	});
};
