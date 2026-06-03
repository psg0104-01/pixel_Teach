'''

class 란?

"틀" 을 구성하는 것

class를 사용하는 방법?

class (class 이름):
    def __init__(self,매개변수1,매개변수2...):
        self.매개변수1 = 매개변수1
        self.매개변수2 = 매개변수2
        ...
        
'''


class User_info:
    def __init__(self,name,lv):
        self.name = name
        self.lv = lv

user1 = User_info("psg",42)
print(user1.name)
print(user1.lv)