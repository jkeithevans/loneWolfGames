const dragAndDrop = (function() {
  
  dragstart_handler = (data, image, style) => event => {
    image.style.backgroundImage = style;
    let fromCard = JSON.stringify({id: data.id, card: data.card, deck: data.deck});
    event.dataTransfer.setData("dragContent", fromCard);
    event.dataTransfer.setDragImage(image, 30, 50);
  };

  dragover_handler = data => event => {
    event.preventDefault();
    return false;
  };

  drop_handler = (data, checkHandler) => event => {
    event.preventDefault();
    let fromCard = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toCard = {id: data.id, card: data.card, deck: data.deck};
    checkHandler(fromCard, toCard);
    return false;
  };

  return {
    dragstart_handler: dragstart_handler,
    dragover_handler: dragover_handler,
    drop_handler: drop_handler
  };

})();

module.exports = dragAndDrop;