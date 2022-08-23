import json

class Product:
    def __init__(self, name, category, price, url, realId, imageBase64, manufacturer, description):
        self.name = name
        self.category = category
        self.price = price
        self.url = url
        self.realId = realId
        self.imageBase64 = imageBase64,
        self.manufacturer = manufacturer
        self.description = description

    def getData(self):
        # return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)
        to_return = {
            "name": self.name,
            "category": self.category,
            "price": self.price,
            "url": self.url,
            "realId": self.realId,
            "manufacturer": self.manufacturer,
            "description": self.description,
        }
        images = []
        print("type", type(self.imageBase64[0]))
        print("len", len(self.imageBase64[0]))
        for image in self.imageBase64[0]:
            print(type(image))
            images.append(image.decode("utf-8"))
        to_return['imageBase64'] = images 

        return to_return