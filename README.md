## rollback to the last commit

```bash
git reset --hard HEAD
```

```bash
git clean -fd
```

## todo:
each comment that are the reply of the parent comment has the <li> wraping all of that comment + their childen comment -> that li container is the length of that comment. so need to check if that comment is not the last comment in the depth, if it's not the last comment, make a line at the same position of that comment's parrent line going from the top to bottom of that <li>. so it gonna look like it's 1 line. but if it's the last comment in the depth level, no making line.

so I will break this down:
for each <li> comment container, draw the verical line from the top to the bottom with green color (green for debugging purpose) of the <li> if match all the conditions below:
- that comment is a reply of a comment
- that comment is not the last comment of that depth level
the position for the line should be the same position with the vertical line drawing from the parent. example, if the reply comment is from depth lv2, then the position of the line should match the vertical line of the parent comment from depth lv0

the result should be like:
example: we have 1 comment at lv0 and 3 comment from lv1, we should see gray vertical line start from the root comment's avatar down touching the top of the first comment from lv1's <li> container. and from that point, we should see the the vertical red line continuing to go down, that mean we draw the red vertical line from the 1st and 2nd comment from the 1st level, and stop, the 3rd comment won't have the vertical line because it's the last comment of the lv1 depth level