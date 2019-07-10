'use strict';

function printReceipt(inputs) {
  var allItems = loadAllItems();
  var orderItems = [], allTotalPrice = 0.0, resultString = '***<没钱赚商店>收据***\n';
  for (var i = 0; i < inputs.length; i++) {
    if (orderItems.findIndex(function (value) {return value.barcode === inputs[i];}) < 0) {
      orderItems.push({barcode: inputs[i], name: '', unit: '', count: 0, price: 0.0, totalPrice: 0.0})
    }
    for (var j = 0; j < allItems.length; j++) {
      if (inputs[i] === allItems[j].barcode) {
        for (var k = 0; k < orderItems.length; k++) {
          if (orderItems[k].barcode === allItems[j].barcode) {
            if (orderItems[k].count === 0) {
              orderItems[k].name = allItems[j].name;
              orderItems[k].unit = allItems[j].unit;
              orderItems[k].price = allItems[j].price;
            }
            orderItems[k].totalPrice += allItems[j].price;
            orderItems[k].count++;
          }
        }
      }
    }
  }
  for (var i = 0; i < orderItems.length; i++) {
    allTotalPrice += orderItems[i].totalPrice;
    resultString += '名称：' + orderItems[i].name + '，数量：' + orderItems[i].count + orderItems[i].unit + '，单价：' + orderItems[i].price.toFixed(2) + '(元)，小计：' + orderItems[i].totalPrice.toFixed(2) + '(元)\n';
  }
  resultString += '----------------------\n总计：' + allTotalPrice.toFixed(2) + '(元)\n**********************';
  console.log(resultString);
}
