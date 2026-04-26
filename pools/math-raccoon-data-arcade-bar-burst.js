/*
 * Pool: Bar Builder (Data · Arcade)
 * =================================
 * Click category buttons to stack up a bar to the correct height.
 * Practices scaled bar graphs (3.MD.3).
 *
 * FORMAT:
 *   {
 *     "kind": "barGraph",
 *     "prompt": "...",
 *     "categories": ["Dogs","Cats","Birds"],
 *     "scale":  { "max": 10, "step": 1, "unit": "" },
 *     "answer": { "Dogs": 5, "Cats": 3, "Birds": 7 },
 *     "hint":   "..."
 *   }
 */
MR.Pools.register({
  "id": "dat-arcade-bar-burst",
  "title": "Bar Builder",
  "askedPerRound": 5,
  "questions": [
    { "kind": "barGraph",
      "prompt": "Build the pet graph: 5 dogs, 3 cats, 7 birds.",
      "categories": ["Dogs", "Cats", "Birds"],
      "scale": { "max": 10, "step": 1, "unit": "pets" },
      "answer": { "Dogs": 5, "Cats": 3, "Birds": 7 },
      "hint":   "Tap a bar to add 1. Build each to the right height." },

    { "kind": "barGraph",
      "prompt": "Fruit sold today: 4 apples, 6 bananas, 2 pears.",
      "categories": ["Apples", "Bananas", "Pears"],
      "scale": { "max": 10, "step": 1, "unit": "sold" },
      "answer": { "Apples": 4, "Bananas": 6, "Pears": 2 },
      "hint":   "Click each label to grow the bar." },

    { "kind": "barGraph",
      "prompt": "Show the sports votes: 8 soccer, 5 basketball, 3 tennis.",
      "categories": ["Soccer", "Basketball", "Tennis"],
      "scale": { "max": 10, "step": 1, "unit": "votes" },
      "answer": { "Soccer": 8, "Basketball": 5, "Tennis": 3 },
      "hint":   "Eight clicks on soccer, five on basketball, three on tennis." },

    { "kind": "barGraph",
      "prompt": "Weather days last month: 10 sunny, 6 cloudy, 4 rainy.",
      "categories": ["Sunny", "Cloudy", "Rainy"],
      "scale": { "max": 12, "step": 1, "unit": "days" },
      "answer": { "Sunny": 10, "Cloudy": 6, "Rainy": 4 },
      "hint":   "Build sunny to 10 first." },

    { "kind": "barGraph",
      "prompt": "Ice-cream scoops: 7 choc, 9 vanilla, 2 mint, 4 strawberry.",
      "categories": ["Choc", "Vanilla", "Mint", "Strawberry"],
      "scale": { "max": 10, "step": 1, "unit": "scoops" },
      "answer": { "Choc": 7, "Vanilla": 9, "Mint": 2, "Strawberry": 4 },
      "hint":   "Vanilla is the tallest at 9." },

    { "kind": "barGraph",
      "prompt": "Book count by genre: 5 mystery, 8 fantasy, 3 biography.",
      "categories": ["Mystery", "Fantasy", "Biography"],
      "scale": { "max": 10, "step": 1, "unit": "books" },
      "answer": { "Mystery": 5, "Fantasy": 8, "Biography": 3 },
      "hint":   "Fantasy has the most: 8." },

    { "kind": "barGraph",
      "prompt": "Build this graph: 6 of A, 6 of B, 9 of C.",
      "categories": ["A", "B", "C"],
      "scale": { "max": 10, "step": 1, "unit": "" },
      "answer": { "A": 6, "B": 6, "C": 9 },
      "hint":   "A and B are equal. C is tallest." },

    { "kind": "barGraph",
      "prompt": "Pizza slices eaten: 12 cheese, 8 pepperoni, 4 veggie.",
      "categories": ["Cheese", "Pepperoni", "Veggie"],
      "scale": { "max": 15, "step": 1, "unit": "slices" },
      "answer": { "Cheese": 12, "Pepperoni": 8, "Veggie": 4 },
      "hint":   "Cheese at 12. Pepperoni 8. Veggie just 4." },

    { "kind": "barGraph",
      "prompt": "Show this class's pets: 3 dogs, 7 cats, 0 fish, 2 birds.",
      "categories": ["Dogs", "Cats", "Fish", "Birds"],
      "scale": { "max": 10, "step": 1, "unit": "pets" },
      "answer": { "Dogs": 3, "Cats": 7, "Fish": 0, "Birds": 2 },
      "hint":   "Fish stays at 0 — don't click it." },

    { "kind": "barGraph",
      "prompt": "Lunch orders: 11 pizza, 7 salad, 5 soup.",
      "categories": ["Pizza", "Salad", "Soup"],
      "scale": { "max": 15, "step": 1, "unit": "orders" },
      "answer": { "Pizza": 11, "Salad": 7, "Soup": 5 },
      "hint":   "Pizza the tallest — 11." },
  ],
});
