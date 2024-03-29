import requests


url = 'http://localhost:5000/api/parser'
files = {'file': open('test.pdf', 'rb')}
#file = {'file': open('test_files/a.txt','rb')} # for sending a single file
form_data ={"name": "foo", "point": 0.13, "is_accepted": False}
resp = requests.post(url=url, data=form_data, files=files) 
print(resp.json())
print(resp.request.headers['content-type'])

# multipart_form_data = {
#     'upload': ('test.pdf', open('test.pdf', 'rb')),
#     'action': (None, 'store'),
#     'path': (None, '/path1')
# }

# response = requests.post('http://localhost:5000/api/parser', files=multipart_form_data)

# with open('test.pdf', 'rb') as f:
#     resp = requests.post("http://localhost:5000/api/parser/",
#                      data={'file': f}) 

                    #  "The president of the United States (POTUS)[A] is thehead of state and head of government of the United States of America. The president directs the executive branch of the federal government and is the commander-in-chief of the United States Armed Forces.The power of the presidency has grown substantially[11] since the offices establishment in 1789.[6] While presidential power has ebbed and flowed over time, the presidency has played an increasingly strong role in American political life since the beginning of the 20th century, with a notable expansion during the presidency of Franklin D. Roosevelt. In contemporary times, the president is also looked upon as one of the world's most powerful political figures as the leader of the only remaining global superpower.[12][13][14][15] As the leader of the nation with the largest economy by nominal GDP, the president possesses significant domestic and international hard and soft power.Article II of the Constitution establishes the executive branch of the federal government and vests the executive power in the president. The power includes the execution and enforcement of federal law and the responsibility to appoint federal executive, diplomatic, regulatory, and judicial officers. Based on constitutional provisions empowering the president to appoint and receive ambassadors and conclude treaties with foreign powers, and on subsequent laws enacted by Congress, the modern presidency has primary responsibility for conducting U.S. foreign policy. The role includes responsibility for directing the world's most expensive military, which has the second largest nuclear arsenal.The president also plays a leading role in federal legislation and domestic policymaking. As part of the system of checks and balances, Article I, Section 7 of the Constitution gives the president the power to sign or veto federal legislation. Since modern presidents are also typically viewed as the leaders of their political parties, major policymaking is significantly shaped by the outcome of presidential elections, with presidents taking an active role in promoting their policy priorities to members of Congress who are often electorally dependent on the president.[16] In recent decades, presidents have also made increasing use of executive orders, agency regulations, and judicial appointments to shape domestic policy.The president is elected indirectly through the Electoral College to a four-year term, along with the vice president. Under the Twenty-second Amendment, ratified in 1951, no person who has been elected to two presidential terms may be elected to a third. In addition, nine vice presidents have become president by virtue of a president's intra-term death or resignation.[B] In all, 45 individuals have served 46 presidencies spanning 58 full four-year terms.[C]int(resp.text)"})
# print(response.content)

