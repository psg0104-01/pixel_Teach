'''

list 란?

여러개의 값을 한 곳에 넣는 자료형

list 는

list의 이름 = list([값,값])
list의 이름 = [값,값]

형태로 쓸 수 있다

빈 리스트 list = []
이 값은 어떤수랑 비교해도 작음

'''

arr1 = list([1,2,3])

print(arr1)


arr2 = [1,2,3]

print(arr2)


'''

list 를 재선언 하지 않고 값을 바꾸는 방법

추가 : append(x) , insert(i, x) , extend([x,y])
     맨 뒤에 x추가 / i위치에 x추가 / 맨뒤에 x,y 추가 (여러개 가능)


삭제 : remove(x) , pop()    ,     pop(i)    ,    clear()
      x값을 삭제 / 맨 뒤 값 삭제 / i위치 값 삭제  / 모든값 삭제

그외 : index(x) , count(x) , sort()   ,   reverse() , max(a) , min(a) , sum(a)
     x값의 위치 / x값의 개수 / 오름차순 정렬 / 역순  / 최댓값 / 최솟값 / 합계

'''



