num1,num2 = map(int,input("두 수를 입력하세요 ").split())

a = int(input("덧셈 1,곱셈 2 를 입력하세요 "))

if a == 1:
    print("%d와 %d의 덧셈 결과는 %d이다"%(num1,num2,num1+num2))
else:
    print("%d와 %d의 곱셈 결과는 %d이다"%(num1,num2,num1*num2))