'''
while 이란?
for 문의 다른 형태라고 볼 수 있다

while 은
while(조건문):   형태로 쓴다

'''
import random

a=0
while (True):  #while문이 참일때만 실행
    a += 1
#    print("hi")
    if a > 5:
        break

b=0
while(b>5):
#    print("hi")
    b +=1            #같은의미




'''

while 을 이용하여 숫자야구게임 만들기

규칙
1. 1~100사이의 숫자를 랜덤하게 하나 뽑는다
2. 숫자를 입력받는다
3. 만약 입력받은 숫자가 뽑은 숫자와 다를경우 UP 이나 DOWN을 출력한다
4. 입력받은 숫자와 뽑은 숫자가 같을경우 "맞췄습니다"를 출력한후 반복문을 끝낸다.

'''


import random

Ran_No = random.randint(1,100) #random.randint(시작숫자,끝숫자)

while(True):
    User_input = int(input("숫자를 입력해주세요 "))
    if User_input > 100:
        print("다시 입력해 주세요")
    elif(User_input == Ran_No):
        print("맞췄습니다")
        break
    elif(User_input > Ran_No):
        print("Down")
    
    else:
        print("UP")


'''

문제

기회를 5번으로 만들고 5번을 소진할시 "기회를 모두 소진하였습니다" 를 출력후 게임종료


'''
