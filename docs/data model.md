# COLLECTIONS

## branches collection

  {
    location: geojson point,
    
    chainName: string,
    branchName: string,
    priceList_id: uuid
  }

## geojson point 

{ "type": "Point", "coordinates": [long, lat] }

## products collection

  {
    barcode: string,
    
    name: string,
    imageSrc: string,
    prices: [
        {"priceList_id": uuid, "price": float}
    ]
  }
