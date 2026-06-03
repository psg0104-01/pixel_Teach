import json
import random
import os

#위치저장
json_path = os.path.join(os.path.dirname(__file__), "user.json")


#json 읽기
with open(json_path, "r", encoding="utf-8") as file:
    data = json.load(file)

#============================들어갈 내용============================


# 1. 로그인 & 가입 함수
# ------------------------로그인 함수------------------------
def login(data):
    name = input("닉네임 : ")
    pw = input("비밀번호 : ")

    for user in data["users"]:
        if user["name"] == name and user["pw"] == pw:
            return user

    return None

# ------------------------가입 함수------------------------
def signup(data):
    name = str(input("닉네임 : "))
    pw = str(input("비밀번호 : "))

    new_user = {
        "name": name,
        "pw": pw,
        "lv": 1,
        "exp": 0,
        "gold": 0,
        "mining_try":0,
        "authority" : "user"
    }

    data["users"].append(new_user)

#------------------------로그인 & 가입 확인------------------------

def menu(data, json_path):
    log = int(input("로그인은 1 , 가입은 2를 눌러주십시오 : "))

    if log == 1:
        login_user = login(data)

        if login_user:
            print("로그인 성공!")
            print("%s님 환영합니다" % login_user["name"])
            return login_user

        else:
            print("로그인 실패!")
            return None

    elif log == 2:
        signup(data)

        print("회원가입 성공!")

        with open(json_path, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)

        return None

    else:
        print("잘못된 입력입니다.")
        return None

#------------------------------------------------------------------------


# 2. 기능 함수
# ------------------------내정보------------------------
def myinfo(login_user):
    print("닉네임 :", login_user["name"])
    print("레벨 :", login_user["lv"])
    print("돈 :", login_user["gold"])
    print("채굴횟수 :", login_user["mining_try"])


# ------------------------채굴------------------------

def mining(data, login_user):
    mineral_name = random.choice(list(data["mineral"].keys()))

    price = data["mineral"][mineral_name]

    login_user["gold"] += price
    login_user["mining_try"] += 1

    print(f"{mineral_name}을(를) 채굴했습니다!")
    print(f"{price} Gold 획득!")
    print(f"현재 Gold : {login_user['gold']}")


#------------------------명령어 입력------------------------

login_user = menu(data, json_path)

if login_user is None:
    exit()              #로그인 실패시 종료



while True:
    commend = str(input("명령어를 입력하세요> "))
    
    if commend == "정보":
        myinfo(login_user)
    
    if commend =="채굴":
        mining(data, login_user)
    
    if commend == "end":
        print("게임을 끝냅니다")
        break
#------------------------------------------------------------------------



#========================================================================
#변경 내용 저장
with open(json_path, "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)