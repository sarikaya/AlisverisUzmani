# vim: set fileencoding=utf-8 :
from __future__ import print_function, unicode_literals, division

import pymongo, bson

db = pymongo.MongoClient("mongodb://localhost:27017/").assistantDb

db.branches.insert([
  {
    "location": {"type": "Point", "coordinates": [29.011896, 41.024065]},
    "chainName": "BİM",
    "branchName": "UNCULAR/ÜSKÜDAR",
    "priceList_id": "1"
  },
  {
    "location": {"type": "Point", "coordinates": [29.016949, 41.025344]},
    "chainName": "BİM",
    "branchName": "ÇARŞI/ÜSKÜDAR",
    "priceList_id": "1"
  },
  {
    "location": {"type": "Point", "coordinates": [29.014056, 41.020141]},
    "chainName": "Şok",
    "branchName": "Şok-Doğancılar",
    "priceList_id": "2"
  },
  {
    "location": {"type": "Point", "coordinates": [29.010941, 41.022537]},
    "chainName": "Şok",
    "branchName": "ŞOK-ŞEMSİPAŞA",
    "priceList_id": "3"
  },
  {
    "location": {"type": "Point", "coordinates": [29.02265642, 41.02036627]},
    "chainName": "A101",
    "branchName": "Çavuşdere Üsküdar İstanbul",
    "priceList_id": "4"
  },
  {
    "location": {"type": "Point", "coordinates": [29.07688379, 41.01901575]},
    "chainName": "A101",
    "branchName": "Bulgurlu Üsküdar İstanbul",
    "priceList_id": "4"
  },
  {
    "location": {"type": "Point", "coordinates": [29.025385, 41.023184]},
    "chainName": "Çağrı",
    "branchName": "Selam-i Ali",
    "priceList_id": "5"
  },
  {
    "location": {"type": "Point", "coordinates": [29.081132, 41.019218]},
    "chainName": "Çağrı",
    "branchName": "Bulgurlu",
    "priceList_id": "6"
  }
])

db.products.insert([
  {
    "barcode": "1",
    "name": "ÜLKER ÇİKOLATALI GOFRET 38 GR",
    "imageSrc": "images/1.jpg",
    "prices": [
        {"priceList_id": "1", "price": 1.3 },
        {"priceList_id": "2", "price": 0.43},
        {"priceList_id": "3", "price": 0.63},
        {"priceList_id": "4", "price": 2.33},
        {"priceList_id": "5", "price": 4.55},
        {"priceList_id": "6", "price": 0.22}
    ]
  },
  {
    "barcode": "2",
    "name": "Ülker Biskrem Kakaolu Krema Dolgulu Poşet",
    "imageSrc": "images/2.jpg",
    "prices": [
        {"priceList_id": "1", "price": 23},
        {"priceList_id": "2", "price": 44.3},
        {"priceList_id": "3", "price": 16.3},
        {"priceList_id": "4", "price": 13.3},
        {"priceList_id": "6", "price": 22.2}
    ]
  },
  {
    "barcode": "3",
    "name": "Ülker Bistik Fındıklı",
    "imageSrc": "images/3.jpg",
    "prices": [
        {"priceList_id": "1", "price": 0.13},
        {"priceList_id": "2", "price": 0.43},
        {"priceList_id": "3", "price": 0.63},
        {"priceList_id": "4", "price": 1.33},
        {"priceList_id": "5", "price": 2.55}
    ]
  },
  {
    "barcode": "4",
    "name": "Ülker Çubuk Kraker",
    "imageSrc": "images/4.jpg",
    "prices": [
        {"priceList_id": "3", "price": 0.53},
        {"priceList_id": "5", "price": 0.75},
        {"priceList_id": "6", "price": 0.62}
    ]
  }
])

db.branches.ensure_index([("location", pymongo.GEOSPHERE)])
db.products.ensure_index([("barcode", pymongo.ASCENDING),
                          ("prices.price", pymongo.ASCENDING)])

# TODO: bson.ObjectId() for uuid

# in the future:
# * read priceList_id from branches collection for each branch or chain only once: 
#       # TODO: create new collection for just checking priceList_ids easily
# * insert new product if there is a new barcode in the products
# * push priceList_id - price pair OR update price in the prices array of each product for given barcode.
# * create indexes
