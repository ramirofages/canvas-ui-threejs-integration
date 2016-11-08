function CanvasScene()
{
  this.stickers = [];
}

CanvasScene.prototype.add_sticker = function( sticker)
{
  this.stickers.push(sticker);
}
CanvasScene.prototype.draw = function(context, draw_controllers, downscale_factor, draw_border)
{

  this.stickers.forEach( function(sticker){
    sticker.draw(context, draw_controllers, downscale_factor,draw_border);
  });
}

CanvasScene.prototype.get_active_controller = function( mouse_pos, canvas, downscale_factor)
{

  for( var i=0; i< this.stickers.length; i++)
  {

    if(this.stickers[i].contains_controller(mouse_pos, canvas, downscale_factor))
    {

      return this.stickers[i].get_controller(mouse_pos, canvas, downscale_factor);
    }
  }
  return null;
}
