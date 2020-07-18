from django.shortcuts import render
from .models import Product

def main_list(request):
    products = Product.objects.all()
    return render(request, 'blog/main_page.html', {"products": products})


def search_result_list(request):
    products = Product.objects.all()
    print("000000000000000")
    if request.GET:
        # handle search GET request
        print("AAAAAAAAAAAAAa")
        # search/?query=<search_text>&priceFrom=100&priceTo=3000&sort=RELEVANCE
        json_data = crawl_shops(request.GET["query"])

    return render(request, 'blog/search_result.html', {"products": products})


def crawl_shops(query):
    """
    :param query: search text string
    :return: json object
    {
        "data" : [{
            "title":"value1",
            "price":"value2",
            "shop": "value3"
        }, {
            "title":"value1",
            "price":"value2",
            "shop": "value3"
        }]
    }
    """
    pass