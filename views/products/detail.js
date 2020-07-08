const layout = require('../layout');

module.exports = ({ product }) => {
	return layout({
		content: `
            <section class="banner">
                <a class="products-link" href="/products"> << products </a>
            </section>

            <hr>

            <section id="product-image">
                <div class="product-image">
                    <img src="data:image/png;base64, ${product.image}" alt="${product.title} image"/>
                </div>
            </section>

            <hr>
            <section class="blank"></section>
            <hr>

            <section id="order-product-section">
                <div class="product-info">
                    <span>${product.title}</span> 
                    <span>£${product.price}</span>
                </div>

                <div class="order-form">
                    <form action="/cart/products" method="POST">
                        <div class="info-align">
                            <label for="quantity">Quantity
                                    <input id="quantity" type="text" name="productQuantity" value="1">
                            </label>
                            <div class="sharing">Sharing 
                                <a href=""><i class="fas fa-share-alt"></i></a>
                                <a href=""><i class="fab fa-facebook"></i></a>
                                <a href=""><i class="fab fa-twitter"></i></a>
                                <a href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div class="button-align">
                            <button class="buy-button">ADD TO CART</button>
                            <button class="buy-button buy-button-invert">BUY IT NOW</button>
                        </div>
                    </form>
                </div>
            </section>

        `
	});
};
