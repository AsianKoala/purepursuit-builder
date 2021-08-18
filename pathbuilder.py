import requests
from bs4 import BeautifulSoup

url = input("enter desmos url")
r = requests.get(url)
soup = BeautifulSoup(r.content, 'html5lib')
print(soup.prettify())