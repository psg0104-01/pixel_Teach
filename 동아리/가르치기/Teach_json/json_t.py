import json
import os

# 현재 파이썬 파일과 같은 폴더에 있는 user1.json 경로 찾기
json_path = os.path.join(os.path.dirname(__file__), "user1.json")


# JSON 파일 불러오기
with open(json_path, "r", encoding="utf-8") as file:
    data = json.load(file)


# 특정 정보 출력하기
# 형식: data["가장큰틀"][번째]["정보"]
print(data["users"][0]["name"])


# 만약 ["정보"]를 생략하면 해당 사람의 모든 정보가 출력됨
print(data["users"][0])


# 모든 유저에게 gold 정보 추가하기
for user in data["users"]:
    user["gold"] = 0



# 수정된 내용 저장하기
with open(json_path, "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)