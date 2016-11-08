function CanvasScene(rect_width, rect_height)
{
  this.rect = new Vector2(rect_width, rect_height);
  this.stickers = [];
}

CanvasScene.prototype.add_sticker = function( sticker)
{
  this.stickers.push(sticker);
}
CanvasScene.prototype.draw = function(context, draw_controllers, downscale_factor)
{

  this.stickers.forEach( function(sticker){
    sticker.draw(context, draw_controllers, downscale_factor);
  });
}

CanvasScene.prototype.get_active_controller = function( mouse_pos, canvas)
{

  for( var i=0; i< this.stickers.length; i++)
  {

    if(this.stickers[i].contains_controller(mouse_pos, canvas))
    {

      return this.stickers[i].get_controller(mouse_pos, canvas);
    }
  }
  return null;
}
