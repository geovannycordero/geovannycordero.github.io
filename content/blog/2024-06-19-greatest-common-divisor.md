---
title: 'Greatest Common Divisor: From Numbers to Strings in Go'
date: '2024-06-19'
excerpt: 'Explore the mathematical concept of Greatest Common Divisor (GCD) and learn how to implement efficient algorithms in Go for both numbers and strings. Includes practical examples and performance considerations.'
readTime: '8 min read'
tags: ['Go', 'Algorithms', 'Mathematics', 'Programming', 'Data Structures']
author: 'Geovanny Cordero Valverde'
---

The GCD (Greatest Common Divisor) or HCF (Highest Common Factor) is a concept in mathematics that describes the largest
number that can evenly divide two or more numbers. This means that if you divide both numbers by this particular number,
there will be no remainder.

Consider the numbers 18 and 24. The numbers that divide 18 are 1, 2, 3, 6, 9, and 18, while the numbers that divide 24
are 1, 2, 3, 4, 6, 8, 12, and 24. The largest number that is common to both lists is 6. Hence, 6 is the GCD of 18 and 24.

For another example, consider the numbers 101 and 103. Both numbers are prime, meaning they can only be divided by 1 and
themselves without leaving a remainder. Therefore, the GCD of 101 and 103 is 1, because that is the only number that can
divide both without a remainder.

In `Go`, we can calculate the GCD of two numbers with the following function:

```go
func gcd(a, b int) int {
	for b != 0 {
		var temp = b
		b = a % b
		a = temp
	}
	return a
}
```

There is also the GCD of two strings, that is:

> For two strings `s` and `t`, we say "`t` divides `s`" if and only if `s = t + t + t + ... + t + t` (i.e., `t` is
> concatenated with itself one or more times).

Again, we can calculate the GCD of two strings in `Go` (using the function `gcd` listed before):

```go
func gcdOfStrings(str1 string, str2 string) string {
    if str1 + str2 != str2 + str1 {
        return ""
    }

    gcdLen := gcd(len(str1), len(str2))

    return str1[:gcdLen]
}
```

This method first checks if `str1` and `str2` can be formed by repeating the same substring. If they can, it uses the
length of the GCD to find the largest common substring. By using these techniques, we can solve problems involving GCD
in both numbers and strings effectively.

Understanding the GCD (Greatest Common Divisor) or HCF (Highest Common Factor) is very useful in both mathematics and
programming.
