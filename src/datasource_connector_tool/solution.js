// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.  
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).  


class Prices{
	constructor(buy,sell,pair){
		this.buy=buy;
		this.sell=sell;
		this.pair=pair;
	}
	mid(){
		return (this.buy+this.sell)/200;
	}
	quote(){
	    return this.pair.slice(3);
	}
	
};

class Datasource extends Prices{
 getPrices() {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', ' https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/KCJm3Kzb');

    req.onload = function() {
     
      if (req.status == 200) {
		  
			var res = req.response;
			var o=JSON.parse(res);
		 
			var prices=new Array();
			for(var i=0;i<o.data.prices.length;i++){
			  
				prices.push(new Prices(o.data.prices[i].buy,o.data.prices[i].sell,o.data.prices[i].pair));
			 
			}
		 
        resolve(prices);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}
}

let ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.log(error);
    });
    