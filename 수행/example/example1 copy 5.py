'''
정수 n이 주어진다.
n이 3의 배수이면서 5의 배수이면 "FizzBuzz"를 출력하시오.
3의 배수이면 "Fizz", 5의 배수이면 "Buzz"를 출력하시오.
'''

n = int(input())
print(n%3)
print(n%5)
if n%3==0 and n%5==0:
    print("FizzBuZZ")
elif n%3==0:
    print("Fizz")
elif n%5==0:
    print("Buzz")