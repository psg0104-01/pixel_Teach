kor, eng, math = map(int,input("국어 영어 수학 점수를 입력하세요 ").split())
sum = kor + eng + math
print("총점 : %d, 평균 %.2f" %(sum,sum/3))

if sum >= 240:
    print("우수")
elif sum >= 180:
    print("보통")
else:
    print("공부좀 해라")