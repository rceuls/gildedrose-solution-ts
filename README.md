# GildedRose

My solution for the GildedRose refactoring problem.

## Thought/Work process

- First assume that the application is correctly working as is. Take a snapshot of the output as it is generated now.
- Save snapshot for later usage/verification.
- Write a new implementation that is more extensible/readable than the existing one (boyscout rule).
- Verify against snapshot of step two.
- Write smaller unit tests the requirements and the actual output. (also boyscout rule - normally we should have tests for the existing functionality).
- Add new functionality (TDD)
- Check that everything is covered.
- Commit and go to sleep

## Non-implemented stuff

- No validation. For example, one is free to add an item with quality -200 (or, worse, undefined). It will get corrected to zero the first loop (due to business rules) but this implies that the first loop is for fixing the input errors. I assumed that there is some kind of input validation, but as I could not adjust the interface/item class it would make code a bit too complex and it would violate the SRP principle (the update method should not be responsible for input validation).
- After I typed the previous point I _did_ add a prevalidation step for my own peace of mind. This step doesn't validatie against undefined/null/wrong datatype,but will reset any out of bounds items to the boundaries (quality 0 or 50).
- No "combined conjurations" are possible. For example, it was unclear for me how the specs work for summoned Brie, as the part of the conjuring spec only talks about "degrading quality".
- I would add types to the Item class' constructor for readability and extra safeguarding.

## Time needed

+- 2 hrs
