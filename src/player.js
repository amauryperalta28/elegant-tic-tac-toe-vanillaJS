
function Player(id, symbol) {
  this.id = id;
  this.symbol = symbol;

  this.getId= function(){
    return this.id;
  }

  this.getSymbol = function(){
    return this.symbol;
  }
}
