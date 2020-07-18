grecaptcha.ready(function() {
    grecaptcha.execute(recaptchaSitekey, {action: 'submit'}).then(function(token) {
        fetch("/api/search" + window.location.search + "&g-recaptcha-response=" + token)
            .then(response => response.json())
            .then(data => {
                displayProducts(data.products, "search-result", "Точное совпадение");
                displayProducts(data.similarProducts, "similar-search-result", "Похожие товары");
            })
            .catch((error) => {
                // TODO
                document.getElementById('search-result').textContent = "Error";
            });
    });
});

$('.input-search').autoComplete({
    resolverSettings: {
        url: '/api/autocomplete'
    }
}).on("autocomplete.select", function(e, item) {
    document.getElementById("search-form").submit();
});

let displayProducts = (products, containerId, title) => {
    let resultEl = document.getElementById(containerId);
    let templateEl = document.getElementById('product-row');

    // Delete spinner
    resultEl.textContent = "";

    if (products.length === 0) {
        resultEl.style.display = 'none';
        return;
    }

    if (title) {
        let titleEl = document.createElement("h2");
        titleEl.classList.add("col-12");
        titleEl.classList.add("mt-5");
        titleEl.textContent = title;
        resultEl.append(titleEl);
    }

    products.forEach(p => {
        let productEl = templateEl.content.cloneNode(true);

        productEl.querySelectorAll(".product-name").forEach(e => e.textContent = p.name);
        productEl.querySelectorAll(".product-url").forEach(e => e.setAttribute("href", p.url));
        productEl.querySelectorAll(".product-image").forEach(e => {
            e.setAttribute("src", p.image);
            e.setAttribute("alt", p.name);
        });
        productEl.querySelectorAll(".product-price").forEach(e => {
            if (p.price) {
                e.textContent = p.price + " " + p.currency.symbol;
            } else {
                e.style.display = "none"
            }
        });
        productEl.querySelectorAll(".product-price-old").forEach(e => {
            if (p.oldPrice) {
                e.textContent = p.oldPrice + " " + p.currency.symbol;
            } else {
                e.style.display = "none"
            }
        });
        productEl.querySelectorAll(".product-rating").forEach(e => {
            if (p.rating) {
                e.querySelector(".rate-percent").style.width = (p.rating * 100 / 5) + "%";
                e.querySelector(".product-reviews").textContent = "(" + p.commentsCount + ")";
            } else {
                e.style.display = "none"
            }
        });
        productEl.querySelectorAll(".product-details").forEach(e =>
            e.textContent = Messages.details.replace("{0}", p.market.name)
        );

        resultEl.append(productEl);
    })
};
