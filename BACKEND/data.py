# data.py
# Curated device dataset for Configwise
# Small, static dataset for hackathon demonstration.

PHONES = [

    {
        "name": "Samsung Galaxy F70e",
        "brand": "Samsung",
        "price": 13999,
        "processor": "MediaTek Dimensity 6300",
        "display": "6.7-inch HD+ LCD, 120Hz",
        "camera": "50MP main + 2MP depth, 8MP front",
        "battery": 6000,
        "charging": 25,
        "scores": {
            "performance": 5,
            "gaming": 5,
            "camera": 5,
            "battery": 9,
            "display": 5
        }
    },

    {
        "name": "Samsung Galaxy M56 5G",
        "brand": "Samsung",
        "price": 23512,
        "processor": "Exynos 1480",
        "display": "6.7-inch FHD+ Super AMOLED+, 120Hz",
        "camera": "50MP OIS + 8MP ultrawide + 2MP macro, 12MP front",
        "battery": 5000,
        "charging": 45,
        "scores": {
            "performance": 7,
            "gaming": 7,
            "camera": 7,
            "battery": 7,
            "display": 9
        }
    },

    {
        "name": "Samsung Galaxy S25 Ultra",
        "brand": "Samsung",
        "price": 84999,
        "processor": "Snapdragon 8 Elite for Galaxy",
        "display": "6.9-inch QHD+ Dynamic AMOLED 2X, 1-120Hz",
        "camera": "200MP OIS + 50MP ultrawide + 10MP 3x telephoto + 50MP 5x periscope",
        "battery": 5000,
        "charging": 45,
        "scores": {
            "performance": 10,
            "gaming": 10,
            "camera": 10,
            "battery": 8,
            "display": 10
        }
    },

    {
        "name": "Infinix GT 30 5G",
        "brand": "Infinix",
        "price": 19499,
        "processor": "MediaTek Dimensity 7400",
        "display": "6.78-inch 1.5K AMOLED, 144Hz",
        "camera": "64MP main + 8MP ultrawide, 13MP front",
        "battery": 5500,
        "charging": 45,
        "scores": {
            "performance": 8,
            "gaming": 9,
            "camera": 6,
            "battery": 8,
            "display": 9
        }
    },

    {
        "name": "iPhone 17 5G",
        "brand": "Apple",
        "price": 82900,
        "processor": "Apple A19",
        "display": "6.3-inch Super Retina XDR OLED, ProMotion 1-120Hz",
        "camera": "48MP wide OIS + 48MP ultrawide, 18MP front",
        "battery": 3692,
        "charging": 40,
        "scores": {
            "performance": 10,
            "gaming": 9,
            "camera": 9,
            "battery": 6,
            "display": 10
        }
    },

    {
        "name": "iQOO 15R 5G",
        "brand": "iQOO",
        "price": 46999,
        "processor": "Snapdragon 8 Gen 5",
        "display": "6.59-inch 1.5K AMOLED, 144Hz",
        "camera": "50MP Sony LYT-700V OIS + 8MP ultrawide, 32MP front",
        "battery": 7600,
        "charging": 100,
        "scores": {
            "performance": 10,
            "gaming": 10,
            "camera": 7,
            "battery": 10,
            "display": 9
        }
    },

    {
        "name": "Motorola Edge 60 Pro",
        "brand": "Motorola",
        "price": 28999,
        "processor": "MediaTek Dimensity 8350 Extreme",
        "display": "6.7-inch 1.5K pOLED, 120Hz",
        "camera": "50MP Sony LYTIA 700C OIS + 50MP ultrawide + 10MP 3x telephoto",
        "battery": 6000,
        "charging": 90,
        "scores": {
            "performance": 8,
            "gaming": 8,
            "camera": 9,
            "battery": 9,
            "display": 9
        }
    },

    {
        "name": "Motorola Edge 70 Fusion",
        "brand": "Motorola",
        "price": 29999,
        "processor": "Snapdragon 7s Gen 4",
        "display": "6.78-inch 1.5K Quad-Curved OLED, 144Hz",
        "camera": "50MP Sony LYTIA 710 OIS + 13MP ultrawide/macro, 32MP front",
        "battery": 7000,
        "charging": 68,
        "scores": {
            "performance": 7,
            "gaming": 7,
            "camera": 8,
            "battery": 10,
            "display": 10
        }
    },

    {
        "name": "Nothing Phone (4a)",
        "brand": "Nothing",
        "price": 37999,
        "processor": "Snapdragon 7s Gen 4",
        "display": "6.78-inch 1.5K LTPS Flexible AMOLED, 120Hz",
        "camera": "50MP main OIS + 8MP ultrawide + 50MP 3.5x periscope",
        "battery": 5400,
        "charging": 50,
        "scores": {
            "performance": 7,
            "gaming": 7,
            "camera": 9,
            "battery": 8,
            "display": 9
        }
    },

    {
        "name": "OnePlus Nord 6 5G",
        "brand": "OnePlus",
        "price": 41999,
        "processor": "Snapdragon 8s Gen 4",
        "display": "6.7-inch 1.5K LTPS AMOLED, 120Hz",
        "camera": "50MP Sony LYTIA-600 OIS + 8MP ultrawide, 32MP front",
        "battery": 9000,
        "charging": 80,
        "scores": {
            "performance": 9,
            "gaming": 9,
            "camera": 8,
            "battery": 10,
            "display": 9
        }
    },

    {
        "name": "OnePlus 13R 5G",
        "brand": "OnePlus",
        "price": 42999,
        "processor": "Snapdragon 8 Gen 3",
        "display": "6.78-inch 1.5K LTPO AMOLED, 1-120Hz",
        "camera": "50MP Sony LYT-700 OIS + 8MP ultrawide + 50MP 2x telephoto",
        "battery": 6000,
        "charging": 80,
        "scores": {
            "performance": 9,
            "gaming": 9,
            "camera": 9,
            "battery": 9,
            "display": 10
        }
    },

    {
        "name": "OPPO K13 Turbo Pro",
        "brand": "OPPO",
        "price": 30999,
        "processor": "Snapdragon 8s Gen 4",
        "display": "6.8-inch 1.5K AMOLED, 120Hz",
        "camera": "50MP main + 2MP depth, 16MP front",
        "battery": 7000,
        "charging": 80,
        "scores": {
            "performance": 9,
            "gaming": 10,
            "camera": 6,
            "battery": 10,
            "display": 9
        }
    },

    {
        "name": "OPPO Reno 14 Pro",
        "brand": "OPPO",
        "price": 46999,
        "processor": "MediaTek Dimensity 8450",
        "display": "6.83-inch 1.5K OLED, 120Hz",
        "camera": "50MP main OIS + 50MP ultrawide + 50MP 3.5x periscope",
        "battery": 6200,
        "charging": 80,
        "scores": {
            "performance": 8,
            "gaming": 8,
            "camera": 10,
            "battery": 9,
            "display": 9
        }
    },

    {
        "name": "OPPO Reno 14 5G",
        "brand": "OPPO",
        "price": 36999,
        "processor": "MediaTek Dimensity 8350",
        "display": "6.59-inch 1.5K LTPS OLED, 120Hz",
        "camera": "50MP Sony IMX882 OIS + 8MP ultrawide + 50MP 3.5x periscope",
        "battery": 6000,
        "charging": 80,
        "scores": {
            "performance": 8,
            "gaming": 8,
            "camera": 9,
            "battery": 9,
            "display": 9
        }
    },

    {
        "name": "POCO X7 Pro 5G",
        "brand": "POCO",
        "price": 23999,
        "processor": "MediaTek Dimensity 8400-Ultra",
        "display": "6.67-inch 1.5K AMOLED, 120Hz",
        "camera": "50MP Sony LYT-600 OIS + 8MP ultrawide, 20MP selfie",
        "battery": 6550,
        "charging": 90,
        "scores": {
            "performance": 9,
            "gaming": 9,
            "camera": 7,
            "battery": 9,
            "display": 9
        }
    },

    {
        "name": "POCO X8 Pro 5G",
        "brand": "POCO",
        "price": 36999,
        "processor": "MediaTek Dimensity 8500-Ultra",
        "display": "6.59-inch 1.5K OLED, 120Hz",
        "camera": "50MP Sony IMX882 OIS + 8MP ultrawide, 20MP selfie",
        "battery": 6500,
        "charging": 100,
        "scores": {
            "performance": 9,
            "gaming": 9,
            "camera": 7,
            "battery": 10,
            "display": 9
        }
    },

    {
        "name": "realme GT 7 5G",
        "brand": "realme",
        "price": 37999,
        "processor": "MediaTek Dimensity 9400e",
        "display": "6.78-inch 1.5K LTPO AMOLED, 120Hz",
        "camera": "50MP Sony IMX906 OIS + 8MP ultrawide + 50MP 2x telephoto",
        "battery": 7000,
        "charging": 120,
        "scores": {
            "performance": 10,
            "gaming": 10,
            "camera": 8,
            "battery": 10,
            "display": 10
        }
    },

    {
        "name": "realme GT 7T 5G",
        "brand": "realme",
        "price": 39990,
        "processor": "MediaTek Dimensity 8400-Max",
        "display": "6.78-inch 1.5K OLED, 120Hz",
        "camera": "50MP Sony IMX896 OIS + 8MP ultrawide, 32MP front",
        "battery": 7000,
        "charging": 120,
        "scores": {
            "performance": 9,
            "gaming": 9,
            "camera": 8,
            "battery": 10,
            "display": 9
        }
    },

    {
        "name": "realme P4 Pro 5G",
        "brand": "realme",
        "price": 25999,
        "processor": "Snapdragon 7 Gen 4",
        "display": "6.8-inch 1.5K Quad-Curved AMOLED, 144Hz",
        "camera": "50MP Sony IMX896 OIS + 8MP ultrawide, 50MP front",
        "battery": 7000,
        "charging": 80,
        "scores": {
            "performance": 7,
            "gaming": 8,
            "camera": 8,
            "battery": 10,
            "display": 10
        }
    },

    {
        "name": "realme P4 Power",
        "brand": "realme",
        "price": 26999,
        "processor": "MediaTek Dimensity 7400 Ultra",
        "display": "6.8-inch 1.5K Quad-Curved AMOLED, 144Hz",
        "camera": "50MP Sony IMX882 OIS + 8MP ultrawide, 16MP front",
        "battery": 10001,
        "charging": 80,
        "scores": {
            "performance": 7,
            "gaming": 7,
            "camera": 7,
            "battery": 10,
            "display": 10
        }
    },

    {
        "name": "realme P4 5G",
        "brand": "realme",
        "price": 23999,
        "processor": "MediaTek Dimensity 7400 Ultra",
        "display": "6.77-inch FHD+ AMOLED, 144Hz",
        "camera": "50MP OV50D40 + 8MP ultrawide, 16MP front",
        "battery": 7000,
        "charging": 80,
        "scores": {
            "performance": 7,
            "gaming": 7,
            "camera": 7,
            "battery": 10,
            "display": 8
        }
    },

    {
        "name": "vivo T4 5G",
        "brand": "vivo",
        "price": 23749,
        "display": "6.77-inch FHD+ Micro Quad Curved AMOLED, 120Hz",
        "processor": "Snapdragon 7s Gen 3",
        "camera": "50MP Sony IMX882 + 2MP Depth, 32MP Front",
        "battery": 7300,
        "charging": 90,
        "scores": {
            "performance": 8,
            "gaming": 8,
            "camera": 8,
            "battery": 10,
            "display": 9
        }
    },

    {
        "name": "vivo X200T 5G",
        "brand": "vivo",
        "price": 51999,
        "display": "6.67-inch 1.5K Flat AMOLED, 120Hz",
        "processor": "MediaTek Dimensity 9400+",
        "camera": "50MP Sony IMX921 OIS + 50MP JN1 Ultra-Wide + 50MP 3X Periscope, 32MP Front",
        "battery": 6200,
        "charging": 90,
        "scores": {
            "performance": 10,
            "gaming": 10,
            "camera": 10,
            "battery": 9,
            "display": 9
        }
    }

]