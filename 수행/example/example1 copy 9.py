'''
배열에 5개의 정수가 주어진다.
최댓값을 출력하시오.
'''

arr = list(map(int,input().split(" ")))
max1 = arr[0]
for i in range(len(arr)):
    if arr[i] > max1:
        max1 = arr[i]
print(max1)