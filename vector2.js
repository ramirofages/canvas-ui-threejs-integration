function Vector2(x,y)
{
  this.x = x;
  this.y = y;
}
Vector2.prototype.add = function(vec)
{
  return new Vector2(this.x + vec.x,this.y + vec.y);
}
Vector2.prototype.sub = function(vec)
{
  return new Vector2(this.x - vec.x,this.y - vec.y);
}
Vector2.prototype.length = function()
{
   return  Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}
Vector2.prototype.distance = function(vec1)
{
   return this.sub(vec1).length();
}
Vector2.prototype.copy = function()
{
  return new Vector2(this.x, this.y);
}
