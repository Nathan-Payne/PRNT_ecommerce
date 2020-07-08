const layout = require('../layout');

module.exports = ({ products }) => {
	const renderedProducts = products
		.map((product) => {
			return `
                <div class="grid-image">
                    <form method="GET" action="/products/${product.id}">
                        <a href="/products/${product.id}">
                            <img src="data:image/png;base64, ${product.image}" alt="${product.title} image"/>
                        </a>
                    </form>
                </div>
      `;
		})
		.join('\n');

	return layout({
		content: `
        
            <section class="banner">
                <h6 class="text-small">
                    nature <span class="bold">|</span> 
                    minimal <span class="bold">|</span> 
                    portrait <span class="bold">|</span> 
                    architecture
                </h6>
            </section>

            <hr>
            
            <section class="grid">
                ${renderedProducts}
            </section>
    `
	});
};
