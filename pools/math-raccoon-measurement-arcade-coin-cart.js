/*
 * Pool: Coin Cart (Math Raccoon · Measurement · Arcade)
 * =====================================================
 * Money — counting coins, adding prices, making change.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  42,                  // cents (number)
 *     "options": [40, 42, 44],        // optional
 *     "suffix":  "¢",                 // usually "¢"
 *     "hint":    "Quarter = 25¢, dime = 10¢, nickel = 5¢, penny = 1¢."
 *   }
 *
 * Teachers & parents: add more money stories freely.
 */
MR.Pools.register({
  "id": "mea-arcade-coin-cart",
  "title": "Coin Cart",
  "askedPerRound": 8,
  "questions": [
    { "prompt": "🪙 Mouse pays 15¢ for string and 20¢ for cheese. Total spent?",
      "answer": 35, "suffix": "¢", "hint": "15 + 20 = 35." },
    { "prompt": "🪙 Fox buys an apple for 30¢ and a nut for 25¢. Total?",
      "answer": 55, "suffix": "¢", "hint": "30 + 25." },
    { "prompt": "🪙 Raccoon has 2 quarters and 3 dimes. How many cents?",
      "answer": 80, "suffix": "¢", "hint": "2 × 25 + 3 × 10 = 80." },
    { "prompt": "🪙 Hedgehog has 4 dimes and 3 nickels. How many cents?",
      "answer": 55, "suffix": "¢", "hint": "40 + 15." },
    { "prompt": "🪙 Owl has 3 quarters and 1 dime. How many cents?",
      "answer": 85, "suffix": "¢", "hint": "75 + 10." },
    { "prompt": "🪙 Bunny pays 50¢ for a carrot. He gave 65¢. How much change?",
      "answer": 15, "suffix": "¢", "hint": "65 − 50 = 15." },
    { "prompt": "🪙 Fox gave 80¢ for a treat that cost 45¢. Change?",
      "answer": 35, "suffix": "¢", "hint": "80 − 45." },
    { "prompt": "🪙 Bear paid 75¢ for a cookie; cookie cost 55¢. Change?",
      "answer": 20, "suffix": "¢", "hint": "75 − 55." },
    { "prompt": "🪙 5 nickels equals how many cents?", "answer": 25, "suffix": "¢", "hint": "5 × 5." },
    { "prompt": "🪙 3 quarters equals how many cents?", "answer": 75, "suffix": "¢", "hint": "3 × 25." },
    { "prompt": "🪙 7 dimes equals how many cents?", "answer": 70, "suffix": "¢", "hint": "7 × 10." },
    { "prompt": "🪙 10 pennies + 2 dimes = how many cents?", "answer": 30, "suffix": "¢", "hint": "10 + 20." },
    { "prompt": "🪙 1 quarter + 2 dimes + 1 nickel = how many cents?", "answer": 50, "suffix": "¢", "hint": "25 + 20 + 5." },
    { "prompt": "🪙 Squirrel has 40¢ and earns 35¢ more. Total cents?", "answer": 75, "suffix": "¢", "hint": "40 + 35." },
    { "prompt": "🪙 Mouse has 1 dollar ($1.00) = how many cents?", "answer": 100, "suffix": "¢", "hint": "$1 = 100¢." },
    { "prompt": "🪙 Raccoon has 90¢ and spends 47¢. Cents left?", "answer": 43, "suffix": "¢", "hint": "90 − 47." },
    { "prompt": "🪙 Owl wants a book that costs 60¢. She has 3 dimes and 2 nickels. Does she have enough? How many cents short?",
      "answer": 20, "suffix": "¢", "hint": "3×10 + 2×5 = 40, then 60 − 40." },
    { "prompt": "🪙 Pie costs 55¢. Fox pays 3 quarters. Change?",
      "answer": 20, "suffix": "¢", "hint": "75 − 55." },
    { "prompt": "🪙 Bunny has 4 nickels and 2 dimes. Total cents?", "answer": 40, "suffix": "¢", "hint": "20 + 20." },
    { "prompt": "🪙 Squirrel buys 3 acorns at 12¢ each. Total cost?", "answer": 36, "suffix": "¢", "hint": "3 × 12 = 36." },
    { "prompt": "🪙 Hedgehog buys 2 mushrooms at 25¢ each. Total?", "answer": 50, "suffix": "¢", "hint": "2 × 25." },
    { "prompt": "🪙 Candy is 15¢. Bear buys 4. Total?", "answer": 60, "suffix": "¢", "hint": "4 × 15 = 60." },
    { "prompt": "🪙 Mouse has 100¢ and spends 65¢. Change left?", "answer": 35, "suffix": "¢", "hint": "100 − 65." },
    { "prompt": "🪙 Fox has 2 quarters, 1 dime, 1 nickel, 3 pennies. Total cents?",
      "answer": 68, "suffix": "¢", "hint": "50 + 10 + 5 + 3." }
  ]
});
