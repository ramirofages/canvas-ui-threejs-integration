function CanvasScene(rect_width, rect_height)
{
  this.rect = new Vector2(rect_width, rect_height);
  this.stickers = [];
}

CanvasScene.prototype.add_sticker = function( sticker)
{
  this.stickers.push(sticker);
}
CanvasScene.prototype.draw = function(draw_controllers)
{
  context.clearRect(0, 0, this.rect.x, this.rect.y);

  this.stickers.forEach( function(element){
    element.draw(draw_controllers);
  });
}
