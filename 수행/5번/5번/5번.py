arr = list(map(int,input("arr의 값을 입력하세요").split()))
max = -2100000000
min = 2100000000

for i in range(len(arr)):
    if arr[i] > max:
        max = arr[i]
    if arr[i] < min:
        min = arr[i]
print("최소값 : %d, 최대값 %d" %(min,max))