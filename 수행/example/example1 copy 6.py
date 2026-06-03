'''
학생의 점수 score가 주어진다.
90 이상이면 A,
80 이상이면 B,
70 이상이면 C,
그 외는 D를 출력하시오.
'''

score = int(input())
if score >=90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")
