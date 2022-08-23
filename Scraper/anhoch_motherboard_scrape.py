from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import base64
from urllib.error import HTTPError

from product import Product

# example url https://anhoch.com/category/376/matichni-plochi' + '%23' + 'stock/2/page/1/

hashtag_character = '%23'
url = 'https://anhoch.com/category/376/matichni-plochi' + '%23' + 'stock/1/page/'

apiUrl = "https://localhost:7158/api/product/scrape"

products = []

i=1
while True:
    page = requests.get(f"{url}{i}/")

    soup = BeautifulSoup(page.content, 'html.parser')
    lists = soup.find_all('li', class_="product-fix")
    if(len(lists) == 0):
        break

    for product in lists:
        if(product.select_one('.pull-right a:first-child') is None):
            continue

        productNameTag = product.select_one('.product-name a:first-child')
        name = productNameTag.text
        productUrl = productNameTag['href']
        category = 'Motherboards'

        # Get product price
        priceString = product.select_one('.nm').text
        numeric_filter = filter(str.isdigit, priceString)
        numeric_string = "".join(numeric_filter)
        price = numeric_string

        # Id or core from the website
        realId = product['data-id']

        # Open details page
        pageRequest = requests.get(productUrl)
        detailsPage = BeautifulSoup(pageRequest.content, 'html.parser')

        # Get description for Product
        description = detailsPage.select('div.span8.clearfix > pre')[0].get_text(strip=True)
        
        # Get manufacturer for Product
        manufacturer = detailsPage.select('div.product-desc > a')[0].get_text(strip=True)

        # Get image and convert to base64 for later use as byte[]
        imagesBase64 = []
        images = detailsPage.select('img.zoomed-images')
        print(len(images))
        for image in images:
            imageUrl = image["src"]
            try:
                contents = urlopen(imageUrl).read()
                imageBase64 = base64.b64encode(contents)
                imagesBase64.append(imageBase64)
            except HTTPError as e:
                print("Error occured!")
                print(e)

        productEntity = Product(name=name, category=category, url=productUrl, price=price, realId=realId, imageBase64=imagesBase64, description=description, manufacturer=manufacturer)
        products.append(productEntity)

    i = i+1

for product in products:
    # from pprint import pprint
    # pprint(product.getData())

    headers = {
        'Content-Type': 'application/json',
    }

    r = requests.post(url=apiUrl, json=product.getData(), verify=False, headers=headers)

    


