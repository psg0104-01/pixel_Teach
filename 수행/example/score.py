
s = 0
arr1 = list(map(int,input().split(" ")))
for i in range(len(arr1)):
    s += int(arr1[i])
if s == 1:
    print("도")
elif s == 2:
    print("개")
elif s == 3:
    print("걸")
elif s == 4:
    print("윷")
else:
    print("모")