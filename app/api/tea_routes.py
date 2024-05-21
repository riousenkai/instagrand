from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

tea_routes = Blueprint('teas', __name__)

@tea_routes.route('/', methods=['GET'])
@cross_origin(origins=[])  # Disable CORS for this route
def teas():
    return { 'teas': [
        {
            "name": "Jasmine Green Milk Tea",
            "ingredients": "Jasmine green tea, milk",
            "toppings": "Tapioca pearls",
            "notes": "Jasmine tea is flowery"
        },
        {
            "name": "Genmaicha Milk Tea",
            "ingredients": "Genmaicha, milk",
            "toppings": "Tapioca pearls",
            "notes": "Genmaicha is roasted brown rice green tea"
        },
        {
            "name": "Taro Milk Tea",
            "ingredients": "Taro powder, milk, green tea",
            "toppings": "Tapioca pearls",
            "notes": "Taro is a root vegetable"
        },
        {
            "name": "Red Wow Milk",
            "ingredients": "Milk",
            "toppings": "Tapioca pearls, azuki beans",
            "notes": "Azuki beans are red beans"
        },
        {
            "name": "Green Wow Milk",
            "ingredients": "Milk",
            "toppings": "Tapioca pearls, mung beans",
            "notes": "Mung beans are also called green beans in Chinese"
        },
        {
            "name": "Hokkaido Milk Tea",
            "ingredients": "Black tea, milk",
            "toppings": "Tapioca pearls",
            "notes": "Milk tea from Hokkaido, Japan.  Tastes like french vanilla."
        },
        {
            "name": "Passionfruit Green Tea",
            "ingredients": "Black tea, passionfruit syrup",
            "toppings": "Tapioca pearls",
            "notes": "Also tastes good with aloe or jelly as toppings"
        },
        {
            "name": "Matcha Tea Latte",
            "ingredients": "Matcha powder, milk",
            "toppings": "Tapioca pearls",
            "notes": "Matcha is fancy Japanese green tea"
        },
        {
            "name": "Fire Dragon",
            "ingredients": "Milk",
            "toppings": "Azuki beans, grass jelly, tapioca pearls",
            "notes": "Similar to Kung Fu Tea's Red Wow Milk"
        },
        {
            "name": "Green Wizard",
            "ingredients": "Milk",
            "toppings": "Mung beans, grass jelly, tapioca",
            "notes": "Similar to Kung Fu Tea's Green Wow Milk"
        },
        {
            "name": "O Jazz",
            "ingredients": "Jasmine green tea, orange syrup, honey",
            "toppings": "",
            "notes": ""
        },
        {
            "name": "Zen's Awakening",
            "ingredients": "Coffee",
            "toppings": "Chocolate, condensed milk",
            "notes": "Really strong coffee and sweer"
        },
        {
            "name": "Wintermelon Milk Tea",
            "ingredients": "Wintermelon syrup, green tea",
            "toppings": "Tapioca pearls",
            "notes": "Wintermelon is a squash"
        },
        {
            "name": "Lemon QQ",
            "ingredients": "Lemon syrup, green tea",
            "toppings": "Jelly",
            "notes": "Sour"
        },
        {
            "name": "Chrysanthemum Pu-Erh Tea",
            "ingredients": "Black tea, chrysanthemum tea",
            "toppings": "Tapioca pearls",
            "notes": "Chrysanthemum tea is made using flower petals, very light"
        },
        {
            "name": "Honey Pomelo Juice",
            "ingredients": "Pomelo juice, honey",
            "toppings": "Tapioca pearls",
            "notes": "Pomelo is like a giant grapefruit"
        },
        {
            "name": "Yogurt Grapefruit Juice",
            "ingredients": "Yakult, grapefruit juice",
            "toppings": "Tapioca pearls",
            "notes": "Yakult is a tart yogurt drink"
        },
        {
            "name": "Yogurt Green Tea",
            "ingredients": "Yakult, green tea",
            "toppings": "Tapioca pearls",
            "notes": "Yakult is a tart yogurt drink"
        },
        {
            "name": "Herbal Jelly Wow Milk",
            "ingredients": "Milk",
            "toppings": "Tapioca pearls, herbal jelly",
            "notes": "Herbal jelly is jelly made of herbs"
        },
        {
            "name": "Longan Red Date Tea",
            "ingredients": "Jujube tea, red date syrup",
            "toppings": "Tapioca pearls",
            "notes": "Longan is jujube, great for sore throats"
        },
        {
            "name": "Red Guava",
            "ingredients": "Red guava syrup, green tea",
            "toppings": "Jelly or aloe",
            "notes": "Sweet and a little tart"
        },
        {
            "name": "The Hulk",
            "ingredients": "Kiwi syrup, green apple syrup, lychee syrup",
            "toppings": "Aloe",
            "notes": "Green like Hulk, but sweeter"
        },
        {
            "name": "Thai Milk Tea",
            "ingredients": "Thai tea, milk",
            "toppings": "Tapioca pearls",
            "notes": "Orange in color"
        },
        {
            "name": "Kumquat Juice",
            "ingredients": "Kumquat juice",
            "toppings": "Any",
            "notes": "Kumquats are like tiny oranges"
        },
        {
            "name": "Bambu",
            "ingredients": "Kiwi syrup, green tea",
            "toppings": "Yogurt pop",
            "notes": "Yogurt pop are tapioca pearls that pop and ooze yogurt drink"
        },
        {
            "name": "Teemo",
            "ingredients": "Orange syrup, green tea",
            "toppings": "Aloe",
            "notes": "Teemo is a super adorable LoL champ"
        },
        {
            "name": "Yasuo",
            "ingredients": "Grapefruit syrup, green tea",
            "toppings": "Yogurt pop",
            "notes": "Yasuo is a pretty cool LoL champ but idk why they decided on grapefruit"
        },
        {
            "name": "Pikachu",
            "ingredients": "Lemon syrup, green tea",
            "toppings": "Aloe",
            "notes": "Lemon gives a nice shock"
        },
        {
            "name": "Oriental Beauty",
            "ingredients": "Oolong tea",
            "toppings": "Yogurt pop",
            "notes": "Oriental Beauty is a type of oolong tea"
        },
        {
            "name": "Matcha Red Bean Smoothie",
            "ingredients": "Matcha green tea",
            "toppings": "Azuki beans",
            "notes": "Blended together in a smoothie"
        },
        {
            "name": "Taro Pudding Milk Tea",
            "ingredients": "Taro powder, milk, black tea",
            "toppings": "Pudding",
            "notes": "Pudding is more like flan consistency"
        },
        {
            "name": "Chatime Milk Tea",
            "ingredients": "Black tea, milk",
            "toppings": "Tapioca pearls",
            "notes": "Special Chatime black milk tea"
        }
        ]
    }
