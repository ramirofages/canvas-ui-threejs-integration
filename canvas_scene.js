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
  //context.clearRect(0, 0, this.rect.x, this.rect.y);
  var show_ctrl = false;

  if(draw_controllers == null)
    show_ctrl = true;
  else
    show_ctrl = draw_controllers;

  this.stickers.forEach( function(element){
    element.draw(show_ctrl);
  });
}

CanvasScene.prototype.get_active_controller = function( mouse_pos)
{

  for( var i=0; i< this.stickers.length; i++)
  {
    if(this.stickers[i].contains_controller(mouse_pos))
    {
      return this.stickers[i].get_controller(mouse_pos);
    }
  }
  return null;
}
