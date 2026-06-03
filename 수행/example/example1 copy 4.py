'''
정수 n이 주어진다.
1부터 n까지의 합을 출력하시오.
'''

n = int(input())
S = 0
for i in range(n):
    S += i+1
print(S)