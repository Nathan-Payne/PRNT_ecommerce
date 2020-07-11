const layout = require('../layout');

module.exports = ({ products }) => {
	const renderedProducts = products
		.map((product) => {
			return `
                <div class="grid-image" data-category="${product.category}">
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
                    <a href="#" id="all">all</a> <span class="bold">|</span> 
                    <a href="#" id="nature">nature</a> <span class="bold">|</span> 
                    <a href="#" id="minimal">minimal</a> <span class="bold">|</span> 
                    <a href="#" id="portrait">portrait</a> <span class="bold">|</span> 
                    <a href="#" id="architecture">architecture</a>
                </h6>
            </section>

            <hr>
            
            <section class="grid">
                ${renderedProducts}
            </section>

            <script>
                const all = document.querySelector('#all');
                const nature = document.querySelector('#nature');
                const minimal = document.querySelector('#minimal');
                const portrait = document.querySelector('#portrait');
                const architecture = document.querySelector('#architecture');
                const gridImage = document.querySelectorAll('.grid-image');

                all.addEventListener('click', () => { [...gridImage].map( img => {img.style.display = 'inherit';}) });
                nature.addEventListener('click', () => { filterImageGrid('Nature') });
                minimal.addEventListener('click', () => { filterImageGrid('Minimal') });
                portrait.addEventListener('click', () => { filterImageGrid('Portrait') });
                architecture.addEventListener('click', () => { filterImageGrid('Architecture') });

                function filterImageGrid(cat) {
                    const filteredImages = [ ...gridImage ].filter((img) => img.dataset.category === cat);
                    [ ...gridImage ].map((img) => {
                        img.style.display = 'none';
                    });
                    filteredImages.map((img) => {
                        img.style.display = 'inherit';
                    });
                }

            </script>
    `
	});
};
