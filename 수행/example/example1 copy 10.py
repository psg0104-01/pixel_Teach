'''
정수 n이 주어진다.
별(*)을 이용해 다음과 같은 삼각형을 출력하시오.
'''
n = int(input())
for i in range(n):
    for k in range(n-i-1):
        print(" ",end="")
    for j in range(i+1):
        print("*",end="")
    print("")