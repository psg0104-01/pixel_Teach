'''
정수 n이 주어진다.
n의 팩토리얼 값을 출력하시오.
'''

n = int(input())
s = 1
for i in range(n):
    s *= i+1
print(s)