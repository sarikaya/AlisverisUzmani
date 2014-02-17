# COLLECTIONS

## branches collection
```javascript
{
    location: geojson point,

    chainName: string,
    branchName: string,
    priceList_id: uuid
}
```
## geojson point 
```javascript
{ "type": "Point", "coordinates": [long, lat] }
```
## products collection
```javascript
{
    barcode: string,

    name: string,
    imageSrc: string,
    prices: [{"priceList_id": uuid, "price": float}]
}
```
