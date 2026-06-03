'''

def란?

print(), input() 과 같은 함수를 만드는 것

사용방법

def 함수이름():
    내용

def 함수이름(매개변수):
    내용


매개변수란?
값을 저장하는 변수


'''

def test(a,b):
    print("Testing: case a:",a, "case b:",b)
    
a,b = map(int,input().split())

test(a,b)
