const DeckHelpers = (function() {

  const fullDeck = ['club-ace', 'diamond-ace',  'heart-ace', 'spade-ace', 'club-eight', 'club-five', 'club-four', 'club-jack', 'club-king', 'club-nine', 'club-queen', 'club-seven', 'club-six', 'club-ten', 'club-three', 'club-two', 'diamond-eight', 'diamond-five', 'diamond-four', 'diamond-jack', 'diamond-king', 'diamond-nine', 'diamond-queen', 'diamond-seven', 'diamond-six', 'diamond-ten', 'diamond-three', 'diamond-two', 'heart-eight', 'heart-five', 'heart-four', 'heart-jack', 'heart-king', 'heart-nine', 'heart-queen', 'heart-seven', 'heart-six', 'heart-ten', 'heart-three', 'heart-two', 'spade-eight', 'spade-five', 'spade-four', 'spade-jack', 'spade-king', 'spade-nine', 'spade-queen', 'spade-seven', 'spade-six', 'spade-ten', 'spade-three', 'spade-two'];

  deckShuffler = deck => deck.sort(() => Math.random() - 0.5);
  
  const cardHash = {
    ace:    1,
    two:    2,
    three:  3,
    four:   4,
    five:   5,
    six:    6,
    seven:  7,
    eight:  8,
    nine:   9,
    ten:    10,
    jack:   11,
    queen:  12,
    king:   13
  };
  
  setIntervalDeck = () => {
    let stockDeck = deckShuffler(fullDeck).filter(card => {
      return !/spade-ace|diamond-two|club-three|heart-four/.test(card);
    });
    // return {
    //   deck1:  ['heart-king'],
    //   deck2:  ['club-king'],
    //   deck3:  ['diamond-king'],
    //   deck4:  ['spade-nine'],
    //   waste1: ['empty-card'],
    //   waste2: ['empty-card'],
    //   waste3: ['empty-card'],
    //   waste4: ['empty-card'],
    //   stock:  ['empty-card', 'spade-king'],
    // };
    return {
      deck1:  ['spade-ace'],
      deck2:  ['diamond-two'],
      deck3:  ['club-three'],
      deck4:  ['heart-four'],
      waste1: ['empty-card'],
      waste2: ['empty-card'],
      waste3: ['empty-card'],
      waste4: ['empty-card'],
      stock:  ['empty-card', ...stockDeck],
    };
  };

  setPaganiniDeck = () => {
    let sortedDeck = [...deckShuffler(fullDeck), ...deckShuffler(fullDeck)];
    sortedDeck = deckShuffler(sortedDeck);
    // return {
    //   deck1: ["club-ace", "club-two", "club-three", "club-four", "club-five", "club-six", "club-seven", "club-eight", "club-nine", "club-ten", "club-jack", "club-queen", "club-king", "empty-card"],
    //   deck2: ["spade-ace", "spade-two", "spade-three", "spade-four", "spade-five", "spade-six", "spade-seven", "spade-eight", "spade-nine", "spade-ten", "spade-jack", "spade-queen", "spade-king", "empty-card"],
    //   deck3: ["spade-ace", "spade-two", "spade-three", "spade-four", "spade-five", "spade-six", "spade-seven", "spade-eight", "spade-nine", "spade-ten", "spade-jack", "spade-queen",  "empty-card", "empty-card"],
    //   deck4: ["diamond-ace", "diamond-two", "diamond-three", "diamond-four", "diamond-five", "diamond-six", "diamond-seven", "diamond-eight", "diamond-nine", "diamond-ten", "diamond-jack", "diamond-queen", "diamond-king","spade-king"],
    //   deck5: ["heart-ace", "heart-two", "heart-three", "heart-four", "heart-five", "heart-six", "heart-seven", "heart-eight", "heart-nine", "heart-ten", "heart-jack", "heart-queen", "heart-king", "empty-card"],
    //   deck6: ["club-ace", "club-two", "club-three", "club-four", "club-five", "club-six", "club-seven", "club-eight", "club-nine", "club-ten", "club-jack", "club-queen", "club-king", "empty-card"],
    //   deck7: ["diamond-ace", "diamond-two", "diamond-three", "diamond-four", "diamond-five", "diamond-six", "diamond-seven", "diamond-eight", "diamond-nine", "diamond-ten", "diamond-jack", "diamond-queen", "diamond-king", "empty-card"],
    //   deck8: ["heart-ace", "heart-two", "heart-three", "heart-four", "heart-five", "heart-six", "heart-seven", "heart-eight", "heart-nine", "heart-ten", "heart-jack", "heart-queen", "heart-king", "empty-card"]
    // };
    return {
      deck1: ['empty-ace', ...sortedDeck.slice(0, 13)],
      deck2: ['empty-ace', ...sortedDeck.slice(13, 26)],
      deck3: ['empty-ace', ...sortedDeck.slice(26, 39)],
      deck4: ['empty-ace', ...sortedDeck.slice(39, 52)],
      deck5: ['empty-ace', ...sortedDeck.slice(52, 65)],
      deck6: ['empty-ace', ...sortedDeck.slice(65, 78)],
      deck7: ['empty-ace', ...sortedDeck.slice(78, 91)],
      deck8: ['empty-ace', ...sortedDeck.slice(91)]
    };
  };

  setCastleDeck = () => {
    let sortedAces = deckShuffler(fullDeck.filter(card => /ace/.test(card)));
    let sortedRest = deckShuffler(fullDeck.filter(card => !/ace/.test(card)));
    return {
      ace1Deck:   sortedAces.slice(0, 1),
      ace2Deck:   sortedAces.slice(1, 2),
      ace3Deck:   sortedAces.slice(2, 3),
      ace4Deck:   sortedAces.slice(3, 4),
      left1Deck:  sortedRest.slice(0, 6),
      right1Deck: sortedRest.slice(6, 12),
      left2Deck:  sortedRest.slice(12, 18),
      right2Deck: sortedRest.slice(18, 24),
      left3Deck:  sortedRest.slice(24, 30),
      right3Deck: sortedRest.slice(30, 36),
      left4Deck:  sortedRest.slice(36, 42),
      right4Deck: sortedRest.slice(42, 48)
    };
  };

  getShuffledDeck = (gamename) => {
    switch (gamename) {
      case 'Beleagured Castle':
        return setCastleDeck();
      case 'Paganini':
        return setPaganiniDeck();
      case 'Broken Intervals':
        return setIntervalDeck();
      default:
        return;
    }
  };

  return {
    cardHash: cardHash,
    getShuffledDeck: getShuffledDeck
  };

})();

module.exports = DeckHelpers;